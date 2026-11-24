import {z} from "zod";
const peminatanSchema= z.object({
  nama: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(30, "Maksimal 30 karakter"),
 
  NIS: z
    .number({ error: "NIS harus diisi" })
    .min(10000, "Minimal 10000")
    .max(99999, "Maksimal 99999"),
  umur: z
    .number({ error: "Umur harus diisi" })
    .min(15, "Minimal 15 tahun"),
  keahlian: z
    .array(z.enum(["html", "css", "javascript", "react"]))
    .min(1, "Wajib diisi"),
  pilihanDivisi: z.enum(["frontend", "backend", "ui/ux"], {
    error: "Divisi harus dipilih",
  }),
  
  ketentuan: z
    .boolean()
    .refine((accepted) => accepted, "Wajib menyetujui ketentuan"),
});
export default peminatanSchema;