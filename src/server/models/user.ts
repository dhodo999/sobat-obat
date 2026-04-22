import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // SaaS Tiers & RBAC Fields
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    plan: { type: String, enum: ['FREE', 'PREMIUM'], default: 'FREE' },
    scans_used: { type: Number, default: 0 },
    health_profile: { type: Object, default: {} },
    saved_medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Obat' }]
  },
  { timestamps: true }
);

export const User = mongoose.model("users", userSchema);
