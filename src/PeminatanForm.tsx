import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import pendaftaranSchema, {
  DivisiIT,
  type PendaftaranFormData,
} from "./PeminatanSchema";

export interface FormSantriProps {
  judulForm: string;
  kuotaTersedia: number;
  isOpen: boolean;
}

export function FormulirPendaftaranSantri(props: FormSantriProps) {
  // Menyimpan seluruh objek data hasil submit (bukan sekadar string)
  const [submittedData, setSubmittedData] = useState<PendaftaranFormData | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PendaftaranFormData>({
    mode: "onChange",
    resolver: zodResolver(pendaftaranSchema),
    defaultValues: {
      namaLengkap: "",
      umur: undefined,
      email: "",
      divisi: undefined,
      motivasi: "",
    },
  });

  // Memantau pilihan divisi secara real-time
  const divisiTerpilih = useWatch({ control, name: "divisi" });

  function onSubmit(data: PendaftaranFormData) {
    console.log("Data Pendaftaran Berhasil:", data);
    setSubmittedData(data);
    reset();
  }

  if (!props.isOpen) {
    return (
      <p className="text-red-500 font-semibold">
        Pendaftaran divisi sedang ditutup.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-900 border border-slate-700 rounded-2xl text-white shadow-xl">
      <h2 className="text-xl font-bold mb-1 text-cyan-400">{props.judulForm}</h2>
      <p className="text-xs text-slate-400 mb-4">
        Sisa Kuota: {props.kuotaTersedia} Kursi
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Input Nama Lengkap */}
        <div>
          <label className="block text-xs font-semibold mb-1">
            Nama Lengkap Santri:
          </label>
          <input
            type="text"
            {...register("namaLengkap")}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
            placeholder="Masukkan nama santri..."
          />
          {errors.namaLengkap && (
            <p className="text-red-400 text-xs mt-1">
              {errors.namaLengkap.message}
            </p>
          )}
        </div>

        {/* Input Umur */}
        <div>
          <label className="block text-xs font-semibold mb-1">
            Umur (Tahun):
          </label>
          <input
            type="number"
            {...register("umur", { valueAsNumber: true })}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
            placeholder="Contoh: 16"
          />
          {errors.umur && (
            <p className="text-red-400 text-xs mt-1">{errors.umur.message}</p>
          )}
        </div>

        {/* Input Email */}
        <div>
          <label className="block text-xs font-semibold mb-1">
            Email Aktif:
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
            placeholder="santri@abudzar.sch.id"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Pilihan Divisi (Dropdown Enum) */}
        <div>
          <label className="block text-xs font-semibold mb-1">
            Pilih Divisi IT:
          </label>
          <select
            {...register("divisi")}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none text-white"
          >
            <option value="">-- Pilih Salah Satu --</option>
            {Object.values(DivisiIT).map((divisi) => (
              <option key={divisi} value={divisi}>
                {divisi}
              </option>
            ))}
          </select>
          {errors.divisi && (
            <p className="text-red-400 text-xs mt-1">{errors.divisi.message}</p>
          )}
        </div>

        {/* Input Motivasi */}
        <div>
          <label className="block text-xs font-semibold mb-1">
            Motivasi Belajar:
          </label>
          <textarea
            rows={3}
            {...register("motivasi")}
            className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm focus:border-cyan-400 focus:outline-none"
            placeholder="Tuliskan motivasi antum bergabung di divisi ini..."
          />
          {errors.motivasi && (
            <p className="text-red-400 text-xs mt-1">
              {errors.motivasi.message}
            </p>
          )}
        </div>

        {/* Indikator Status Validasi Real-Time */}
        <p
          className={`text-xs font-medium ${
            isValid ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isValid
            ? "✓ Siap dikirim karena semua inputan valid"
            : "✕ Belum siap dikirim karena ada inputan yang belum valid"}
        </p>

        {/* Pratinjau Pilihan Divisi dari useWatch */}
        {divisiTerpilih && (
          <p className="text-xs text-cyan-300">
            Divisi dipilih: <span className="font-semibold">{divisiTerpilih}</span>
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-2.5 px-4 rounded-xl font-bold text-sm bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all text-white shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
        >
          Kirim Formulir Pendaftaran
        </button>
      </form>

      {/* Ringkasan Data Setelah Berhasil Submit */}
      {submittedData && (
        <section
          className="mt-5 rounded-xl border border-emerald-500/50 bg-emerald-950/60 p-4"
          aria-live="polite"
        >
          <h3 className="mb-2 text-sm font-bold text-emerald-300">
            Alhamdulillah, Pendaftaran Berhasil
          </h3>
          <dl className="space-y-1 text-xs text-slate-200">
            <div>
              <dt className="inline font-semibold text-slate-400">Nama: </dt>
              <dd className="inline">{submittedData.namaLengkap}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-slate-400">Umur: </dt>
              <dd className="inline">{submittedData.umur} tahun</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-slate-400">Email: </dt>
              <dd className="inline">{submittedData.email}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-slate-400">Divisi: </dt>
              <dd className="inline">{submittedData.divisi}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-slate-400">Motivasi: </dt>
              <dd className="inline">{submittedData.motivasi}</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}

export default FormulirPendaftaranSantri;