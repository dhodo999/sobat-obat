import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import authRoutes from "./auth/auth";
import { Obat } from "./models/obat";
import { User } from "./models/user";
import { extractText } from "./services/ocr.service";
import { extractDrugNameFromOCR, analyzeDrugInteraction } from "./services/ai.service";

dotenv.config();
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection Failed", err));

app.get("/api/search", async (req, res): Promise<any> => {
  const q = req.query.q as string;
  if (!q) {
    return res.json([]);
  }
  try {
    const results = await Obat.find({
      $or: [
        { nama_obat: { $regex: q, $options: "i" } },
        { merek_dagang: { $regex: q, $options: "i" } },
      ],
    }).limit(10);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Database search failed" });
  }
});

app.get("/api/hello", (_, res) => {
  res.json({ message: "Hello from Express on Vercel 🚀" });
});

const extractUser = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await User.findById(decoded.id);
    } catch (error) {
      console.log("Token invalid, dijadikan GUEST.");
    }
  }
  next();
};

const guestLimiter = rateLimit({
  windowMs: 7 * 24 * 60 * 60 * 1000, // 1 Minggu
  max: 5,
  skip: (req: any) => !!req.user, // Lewati limit jika Req.User ada (Berarti FREE / PREMIUM)
  message: { error: "Batas sesi GUEST (3x/minggu) habis. Silahkan daftar!" },
});

app.post(
  "/api/scan-ocr",
  extractUser,
  guestLimiter,
  async (req: any, res: any): Promise<any> => {
    try {
      const { image, medications, lifestyleContext } = req.body;
      let finalLifestyle = lifestyleContext || "";
      let finalMedications = medications || [];
      // Jika Statusnya USER REGISTERED (Free / Premium) -> Cek Limits di DB
      if (req.user) {
        const limits = { FREE: 5, PREMIUM: 70 }; // Premium 10/hari = 70 seminggu
        const userPlan = req.user.plan as "FREE" | "PREMIUM";
        if (req.user.scans_used >= limits[userPlan]) {
          return res
            .status(429)
            .json({ error: `Batas limit tipe ${userPlan} Anda sudah habis!` });
        }
        req.user.scans_used += 1;
        await req.user.save();
        // INJECTION PREMIUM KHUSUS: Memuat data kesehatan sebelumnya untuk AI
        if (userPlan === "PREMIUM" && req.user.health_profile) {
          finalLifestyle += `\n[Info Sistem: Profil Medis Pasien = ${JSON.stringify(req.user.health_profile)}]`;
        }
      }
      if (image) {
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const extractedText = await extractText(
          buffer,
          "upload.jpg",
          "image/jpeg",
        );
        // --- LLM TAHAP 1: MEMBERSIHKAN OCR ---
        const cleanedDrugName = await extractDrugNameFromOCR(extractedText);
        console.log("\n====== [1] HASIL BERSIH NAMA OBAT DARI OCR ======");
        console.log("Aslinya panjang, disaring AI menjadi:", cleanedDrugName);
        // Masukkan nama bersih terebut ke dalam "Obat yang Anda Pilih"
        if (cleanedDrugName) {
           finalMedications.push(cleanedDrugName); 
        }
      }
      // --- TAMBAHKAN LOG TOTAL DATA SEBELUM DIKIRIM KE AI ---
      console.log("\n====== [2] ISI KEPALA AI (PROMPT FINAL) ======");
      console.log("Daftar Obat:", finalMedications);
      console.log("Teks Konteks:\n", finalLifestyle);
      console.log("==================================================\n");
      const aiResponseString = await analyzeDrugInteraction(
        finalMedications,
        finalLifestyle,
      );
      const aiResponseJSON = JSON.parse(aiResponseString);
      // 3. Kembalikan Response Akhir ke Frontend
      return res.json({
        status: "success",
        tier: req.user ? req.user.plan : "GUEST",
        medications: finalMedications,
        lifestyle: finalLifestyle,
        result: aiResponseJSON,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server Error" });
    }
  },
);

app.listen(3000, () => console.log("http://localhost:3000"));
