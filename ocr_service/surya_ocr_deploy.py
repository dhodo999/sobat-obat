import os
import io
import modal

# 1. Definisi Environment Image (BAKING THE MODEL)
image = (
    modal.Image.debian_slim(python_version="3.11")
    .pip_install(
        "requests",
        "urllib3",
        "transformers>=4.56.1,<5.0.0",
        "surya-ocr==0.17.1",
        "fastapi[standard]",
        "python-multipart",
        "pillow",
        # pypdfium2 removed for image-only processing
    )
    .run_commands(
        "python -c 'from surya.foundation import FoundationPredictor; FoundationPredictor()'",
        "python -c 'from surya.detection import DetectionPredictor; DetectionPredictor()'",
        "python -c 'from surya.foundation import FoundationPredictor; from surya.recognition import RecognitionPredictor; RecognitionPredictor(FoundationPredictor())'",
    )
)

app = modal.App("sobat-obat-ocr")


# 2. Setup GPU
@app.cls(
    image=image,
    gpu="T4",
    memory="4GiB",
    timeout=600,
    scaledown_window=300,
)
class SuryaOCRModel:
    @modal.enter()
    def enter(self):
        print("Memuat model Surya OCR...")

        from surya.foundation import FoundationPredictor
        from surya.recognition import RecognitionPredictor
        from surya.detection import DetectionPredictor

        self.foundation_predictor = FoundationPredictor()
        self.detection_predictor = DetectionPredictor()
        self.recognition_predictor = RecognitionPredictor(self.foundation_predictor)

        print("Semua Model Surya berhasil dimuat seketika!")

    @modal.method()
    def inference(self, images: list) -> list:
        print(f"Memulai inferensi OCR untuk gambar...")

        predictions = self.recognition_predictor(
            images, det_predictor=self.detection_predictor
        )

        output = []
        for i, pred in enumerate(predictions):
            lines = pred.text_lines
            lines_sorted = sorted(
                lines,
                key=lambda x: (round((x.bbox[1] + x.bbox[3]) / 2 / 15), x.bbox[0]),
            )
            page_text = " | ".join([line.text for line in lines_sorted])
            output.append(
                {
                    "image_index": i + 1,
                    "text": page_text.replace("<math>", "").replace("</math>", ""),
                }
            )

        return output


# 3. FastAPI Endpoint
@app.function(
    image=image, timeout=600, secrets=[modal.Secret.from_name("sobatobat-secrets")]
)
@modal.asgi_app()
def fastapi_app():
    from fastapi import FastAPI, UploadFile, File, HTTPException, Security, status
    from fastapi.responses import JSONResponse
    from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
    from PIL import Image

    web_app = FastAPI(title="SobatObat Surya OCR API")
    auth_scheme = HTTPBearer()

    EXPECTED_TOKEN = os.environ.get("API_TOKEN")

    @web_app.post("/extract")
    async def extract_text(
        file: UploadFile = File(...),
        token: HTTPAuthorizationCredentials = Security(auth_scheme),
    ):
        if token.credentials != EXPECTED_TOKEN:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Akses ditolak. Bearer Token tidak valid.",
            )

        try:
            content = await file.read()
            images = []

            # Focus ONLY on images
            valid_image_types = ["image/jpeg", "image/png", "image/jpg", "image/webp"]

            if file.content_type in valid_image_types:
                images.append(Image.open(io.BytesIO(content)).convert("RGB"))
            else:
                raise HTTPException(
                    status_code=400,
                    detail=f"Format {file.content_type} tidak didukung. Harap unggah gambar (JPG/PNG/WEBP).",
                )

            if not images:
                raise HTTPException(
                    status_code=400, detail="Gagal mengekstrak gambar dari file."
                )

            model = SuryaOCRModel()
            results = model.inference.remote(images)

            full_text = "\n".join([page["text"] for page in results])

            return JSONResponse(
                content={
                    "status": "success",
                    "filename": file.filename,
                    "extracted_text": full_text,
                },
                status_code=200,
            )

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    return web_app
