import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

interface ScanObatProps {
  onImageCapture: (imageSrc: string) => void;
}

const ScanObat: React.FC<ScanObatProps> = ({ onImageCapture }) => {
  const [mode, setMode] = useState<"camera" | "upload">("camera");
  const webcamRef = useRef<Webcam>(null);

  // Handle capturing an image from the webcam
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) onImageCapture(imageSrc);
    }
  }, [webcamRef, onImageCapture]);

  // Handle uploading an image from the file picker
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-[300px]">
      {/* Toggle Buttons */}
      <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
        <button
          onClick={() => setMode("camera")}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            mode === "camera" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Kamera Langsung
        </button>
        <button
          onClick={() => setMode("upload")}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            mode === "upload" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          Unggah dari Galeri
        </button>
      </div>

      {/* Active Mode View */}
      <div className="flex-1 bg-slate-50 border-2 border-slate-200 border-dashed rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-4">
        
        {mode === "camera" ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "environment" }} // Prefer back camera on mobile
              className="w-full max-h-64 object-cover rounded-xl mb-4"
            />
            <button
              onClick={capture}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 transform transition hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
              Jepret Foto
            </button>
          </div>
        ) : (
          <div className="text-center w-full py-12">
            <svg className="mx-auto h-12 w-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <label className="cursor-pointer bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-colors inline-block text-center">
              <span className="text-blue-600 font-bold block mb-1">Pilih File Gambar</span>
              <span className="text-slate-400 text-xs font-normal">JPG, PNG (Max. 5MB)</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanObat;
