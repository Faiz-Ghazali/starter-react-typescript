import {z} from "zod";
export const peminatanSchema = z.object({
  nama: z.string().min(3,"Minimal 3 karakter").max(30,"Maksimal 30 karakter"),
  NIS: z.number({error: "NIS Wajib diisi"}).max(99999,"maksimal 99999"),
  umur:z.number({error: "Umur Wajib diisi"}).max(99,"maksimal 99"),
  keahlian:z.array(z.enum(["html", "css", "javascript", "react"])).min(1, "Wajib Diisi"),
  pilihanDivisi: z.enum(["frontend", "backend", "ui/ux"], {
    error: "Divisi harus dipilih",}),
  ketentuan: z
    .boolean()
    .refine((accepted) => accepted, "Wajib menyetujui ketentuan"),
})

export type PeminatanFormData = z.infer<typeof peminatanSchema>;

export default peminatanSchema;
