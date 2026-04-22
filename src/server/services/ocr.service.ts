import axios from "axios";
import FormData from "form-data";

export async function extractText(
  fileBuffer: Buffer,
  filename: string,
  mimetype: string,
): Promise<string> {
  // 1. Menyiapkan data
  const formData = new FormData();
  formData.append("file", fileBuffer, {
    filename: filename,
    contentType: mimetype,
  });

  try {
    // 2. Tembak endpoint API Modal.com
    const response = await axios.post(process.env.MODAL_OCR_URL!, formData, {
      headers: {
        ...formData.getHeaders(),
        // Pastikan nama variabel ENV ini sama dengan yang ada di file .env Anda
        Authorization: `Bearer ${process.env.MODAL_API_TOKEN}`, 
      },
    });

    // 3. Menangkap teks yang sudah digabungkan langsung dari Python
    const fullText = response.data.extracted_text;

    // Validasi pencegahan jika response kosong
    if (!fullText) {
      throw new Error("Tidak ada teks yang berhasil diekstrak dari gambar.");
    }

    return fullText;
  } catch (error: any) {
    console.error("Surya OCR error:", error.response?.data || error.message);
    throw new Error("Gagal mengekstrak dokumen gambar");
  }
}