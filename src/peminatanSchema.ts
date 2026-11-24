// src/schemas/pendaftaranSchema.ts
import { z } from "zod";

export enum DivisiIT {
  WEB = "WEB_DEVELOPMENT",
  MOBILE = "MOBILE_DEVELOPMENT",
  CYBER = "CYBER_SECURITY",
}

export const pendaftaranSchema = z.object({
  namaLengkap: z.string().min(3, { message: "Nama santri minimal 3 huruf" }),
  umur: z.number().min(12, { message: "Umur minimal 12 tahun" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  divisi: z.nativeEnum(DivisiIT),
  motivasi: z.string().min(10, { message: "Tuliskan motivasi minimal 10 karakter" }),
});

export type PendaftaranFormData = z.infer<typeof pendaftaranSchema>;

export default pendaftaranSchema;