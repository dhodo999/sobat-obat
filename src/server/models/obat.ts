import { Document, model, Schema } from "mongoose";

export interface IObat extends Document<string> {
  _id: string;
  nama_obat: string;
  deskripsi_obat: string;
  peringatan_sebelum_mengonsumsi_obat: string;
  dosis_dan_aturan_pakai_obat: string;
  efek_samping_dan_bahaya_obat: string;
  penyakit_sesuai_dengan_obat: string;
  merek_dagang: string;
}

const obatSchema = new Schema<IObat>({
  nama_obat: String,
  deskripsi_obat: String,
  peringatan_sebelum_mengonsumsi_obat: String,
  dosis_dan_aturan_pakai_obat: String,
  efek_samping_dan_bahaya_obat: String,
  penyakit_sesuai_dengan_obat: String,
  merek_dagang: String,
});

export const Obat = model<IObat>("Obat", obatSchema, "data_obat");
