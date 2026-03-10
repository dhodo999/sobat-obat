import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Obat } from "./models/obat";
import authRoutes from "./auth/auth";

dotenv.config();
const app = express();
app.use(express.json());
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

app.listen(3000, () => console.log("http://localhost:3000"));
