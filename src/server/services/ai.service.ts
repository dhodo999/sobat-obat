import Groq from "groq-sdk";

export async function analyzeDrugInteraction(
  medications: string[],
  lifestyleContext: string,
) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  // 1. Konteks Referensi Medis (Pharmacokinetics & Pharmacodynamics)
  const contextFarmakologi = `
  PENGETAHUAN FARMAKOLOGI (REFERENSI UTAMA):
  - Anda memiliki basis data setara dengan Lexicomp, Medscape, dan BPOM Indonesia.
  - Drug-Drug Interaction (DDI): Deteksi interaksi sinergis, antagonis, atau perubahan metabolisme (misal: enzim sitokrom P450 di hati).
  - Drug-Food Interaction (DFI): Deteksi pengaruh makanan/minuman terhadap absorpsi obat (misal: susu/kalsium mengikat antibiotik tetrasiklin, grapefruit menghambat enzim CYP3A4, kafein meningkatkan takikardia jika digabung obat asma/flu tertentu).
  - Drug-Disease Interaction: Perhatikan kondisi penyerta jika disebutkan oleh pengguna (misal: hipertensi, maag, hamil).
  `;

  const aturanKeputusan = `
  ATURAN KLASIFIKASI RISIKO (TRAFFIC LIGHT SYSTEM):
  1. AMAN (Tingkat Risiko: RENDAH): Tidak ada interaksi bermakna. Aman dikonsumsi bersamaan.
  2. WASPADA (Tingkat Risiko: SEDANG): Ada potensi interaksi ringan/menengah. Membutuhkan penyesuaian (misal: diberi jeda waktu 2-4 jam) atau pemantauan gejala.
  3. BAHAYA (Tingkat Risiko: TINGGI): Kontraindikasi mutlak atau interaksi parah (misal: risiko pendarahan, sindrom serotonin, toksisitas hati). Tidak boleh dikonsumsi bersamaan.
  `;

  // 2. System Prompt Master (Chain of Thought & JSON Schema)
  const systemPrompt = `Anda adalah "Apoteker AI SobatObat", konsultan farmasi klinis di Indonesia yang empatik, profesional, dan berbasis sains.
Tugas Anda menganalisis daftar obat yang dikonsumsi pasien dan mencocokkannya dengan kebiasaan/gaya hidup yang mereka sebutkan.

PENGETAHUAN KLINIS:
${contextFarmakologi}
${aturanKeputusan}

ATURAN STRICT:
1. CHAIN OF THOUGHT: Anda WAJIB mengisi "langkah_analisis" pertama kali. Identifikasi zat aktif masing-masing obat -> Evaluasi DDI antar obat -> Evaluasi DFI dengan makanan/minuman -> Tentukan risiko tertinggi.
2. BAHASA: Gunakan Bahasa Indonesia yang mudah dipahami orang awam (jangan terlalu banyak jargon medis yang rumit tanpa penjelasan).
3. DISCLAIMER: Saran Anda bersifat informatif, bukan diagnosis medis pengganti dokter.
4. OUTPUT HANYA JSON MURNI TANPA MARKDOWN.

CONTOH FORMAT OUTPUT JSON YANG WAJIB DIIKUTI PERSIS STRUKTURNYA:
{
  "langkah_analisis": "1. Pasien minum Paracetamol dan Kopi. 2. Paracetamol aman, tapi Kopi mengandung kafein. 3. Kafein dapat sedikit mempercepat absorpsi Paracetamol namun berisiko meningkatkan detak jantung atau iritasi lambung jika diminum saat perut kosong. Kesimpulan: Risiko Sedang.",
  "status_risiko": "WASPADA",
  "ringkasan_analisis": "Ada interaksi ringan antara konsumsi kafein dan obat yang Anda pilih.",
  "penjelasan_medis": "Mengonsumsi obat ini bersamaan dengan kopi dapat memicu peningkatan asam lambung atau membuat detak jantung lebih cepat.",
  "saran_tindakan": [
    "Beri jeda minimal 1-2 jam antara minum obat dan minum kopi.",
    "Pastikan perut sudah terisi makanan sebelum minum obat.",
    "Perbanyak minum air putih."
  ]
}`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Tolong analisis interaksi ini:\n\nDaftar Obat: ${medications.join(", ")}\nKonteks/Gaya Hidup: "${lifestyleContext || "Tidak ada info tambahan"}"`,
        },
      ],
      model: "qwen/qwen3-32b",
      temperature: 0.2, // Sedikit dinaikkan dari 0.1 agar bahasanya lebih luwes saat menjelaskan
      response_format: { type: "json_object" },
    });

    return completion.choices[0]?.message?.content || "{}";
  } catch (error) {
    console.error("Gagal memproses LLM:", error);
    throw new Error("Gagal mengambil keputusan klinis AI");
  }
}

export async function extractDrugNameFromOCR(ocrText: string): Promise<string> {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  
  const systemPrompt = `Anda adalah asisten farmasi pendeteksi nama obat. 
Tugas Anda: Carilah SATU NAMA OBAT UTAMA TERPENTING (Merek atau Generik) dari teks acak hasil scan kemasan ini. 
ATURAN MUTLAK:
- Kembalikan HANYA namanya saja (misalnya "Paracetamol" atau "Zyloric").
- JANGAN tambahkan kalimat "Ini obatnya...", "Nama obat adalah...", atau tanda kutip.`;
  
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Teks kemasan kotor:\n${ocrText}` },
      ],
      model: "qwen/qwen3-32b",
      temperature: 0.1, // Harus rendah agar sangat persis dan tidak ngelantur
    });
    
    return completion.choices[0]?.message?.content?.trim() || "";
  } catch (error) {
    console.error("Gagal membersihkan OCR dengan AI:", error);
    return "";
  }
}