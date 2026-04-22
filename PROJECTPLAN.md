# COMPREHENSIVE SYSTEM INSTRUCTION: SOBATOBAT - AI CLINICAL PHARMACIST (SaaS)

## 1. PROJECT OVERVIEW
**Project Name:** SobatObat
**Mission:** An Indonesian web-based AI Clinical Pharmacist. It reads medicine packaging via OCR, combines it with the user's medical and lifestyle context, and evaluates Drug-Drug Interactions (DDI) and Drug-Food Interactions (DFI).
**Output:** A JSON object mapped to a "Traffic Light" UI (AMAN / WASPADA / BAHAYA).
**Current State:** The frontend (React/Rsbuild) and auth backend (Express/JWT) are partially built. The external OCR Microservice (Modal/Python) is deployed and working. The AI Consultant UI currently uses a dummy `setTimeout` and needs to be wired to the real backend.

## 2. TECH STACK (Based on package.json)
- **Frontend:** React 19 (.tsx), Tailwind CSS 4, Framer Motion, Shadcn UI, Rsbuild.
- **Backend:** Node.js, Express 5, TypeScript (.ts), Mongoose 9.
- **Key Packages:** axios, form-data, groq-sdk, jsonwebtoken, bcryptjs.
- **OCR Microservice (EXTERNAL):** Python FastAPI on Modal. DO NOT MODIFY THIS.
- **LLM Provider:** Groq API using qwen-3-32b.

## 3. DIRECTORY STRUCTURE
Restrict your file creations/edits to these existing paths:
- src/components/content/Consultant.tsx (The main AI UI - Needs backend connection)
- src/server/main.ts (Express entry point)
- src/server/auth/auth.ts (JWT Auth routes)
- src/server/services/ocr.service.ts (Axios call to Modal API - Created)
- src/server/services/ai.service.ts (Groq SDK call for Reasoning - Created)
- src/server/models/user.ts (Mongoose User Schema - Needs SaaS update)
- src/server/models/obat.ts (Master Medicine Data)

## 4. ENVIRONMENT VARIABLES (.env)
Ensure the code relies on these exact variables:
- MODAL_OCR_URL
- MODAL_API_TOKEN (Used in ocr.service.ts)
- GROQ_API_KEY (Used in ai.service.ts)
- MONGODB_URI
- JWT_SECRET

## 5. USER JOURNEY & SaaS TIER SYSTEM
The system uses a Freemium model. Authentication is handled via JWT (localStorage.getItem("token")).
- **GUEST (No JWT Token):** Max 3 scans/week. Tracked via IP address.
- **FREE TIER (Valid JWT, plan='FREE'):** Max 5 scans/week. Users must manually type their lifestyle context.
- **PREMIUM TIER (Valid JWT, plan='PREMIUM'):** Max 10 scans/day. The backend must automatically fetch their health_profile and saved_medicines from MongoDB and inject it into the Groq prompt.

## 6. API CONTRACT: POST /api/scan-ocr
You need to build this route in src/server/main.ts.
**Request Payload (from React Consultant.tsx):**
{
  "image": "data:image/jpeg;base64,...", // Optional (if scanning)
  "medications": ["Paracetamol", "Vitamin C"], // Extracted from selectedMeds
  "lifestyleContext": "Saya sering minum kopi." 
}

**Express Logic Flow:**
1. Extract JWT token from Authorization header (if present) to determine if the user is Guest, Free, or Premium.
2. Apply Rate Limiting based on their Tier.
3. If image is provided, send to ocr.service.ts. If not, use the medications array directly.
4. If the user is PREMIUM, fetch their saved health profile from MongoDB and append it to lifestyleContext.
5. Send data to ai.service.ts (Groq SDK).
6. Return the JSON response to the frontend.

## 7. IMMEDIATE EXECUTION PLAN FOR AI AGENT
Please execute the following steps in order. Do not skip steps.

1. **Install Dependencies:** Run `npm install express-rate-limit` and `npm install -D @types/express-rate-limit` since it is missing from package.json.
2. **Update Database Schema:** Open src/server/models/user.ts. Update the schema to include the SaaS fields: role (USER/ADMIN), plan (FREE/PREMIUM), scans_used (number), health_profile (Object), and saved_medicines (Array of ObjectIds).
3. **Build the Backend Route:** Open src/server/main.ts. Add `app.use(express.json({ limit: "10mb" }));`. Implement the `POST /api/scan-ocr` route according to the API Contract and SaaS tier logic.
4. **Wire the Frontend:** Open src/components/content/Consultant.tsx. Locate the handleAnalyze function. Remove the setTimeout dummy logic. Replace it with a fetch call to `POST /api/scan-ocr`. Ensure it passes the Authorization: Bearer <token> header if a token exists in localStorage, and handles the 429 Rate Limit error gracefully by showing an alert or modal.