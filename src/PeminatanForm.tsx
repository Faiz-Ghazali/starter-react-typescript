import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import peminatanSchema, { type PeminatanFormData } from "./peminatanSchema";

function PeminatanFormTS() {
  const [submittedData, setSubmittedData] = useState<PeminatanFormData | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PeminatanFormData>({
    mode: "onChange",
    resolver: zodResolver(peminatanSchema),
    defaultValues: {
      nama: "Jane Doe",
      NIS: 12345,
      umur: 15,
      keahlian: ["html", "react"],
      pilihanDivisi: "frontend",
      ketentuan: true,
    },
  });

  function onSubmit(data: PeminatanFormData) {
    console.log("Data Submitted:", data);
    setSubmittedData(data);
  }

  const pilihanDivisi = useWatch({ control, name: "pilihanDivisi" });

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-gray-200 bg-card p-4 text-left shadow-md">
      <h2 className="mb-3 text-lg font-semibold">Form Pendaftaran</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Nama Siswa:</label>
          <input
            {...register("nama")}
            type="text"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama"
          />
          {errors.nama && (
            <p className="text-sm text-red-600">{errors.nama.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">NIS:</label>
          <input
            {...register("NIS", { valueAsNumber: true })}
            type="number"
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan NIS"
          />
          {errors.NIS && (
            <p className="text-sm text-red-600">{errors.NIS.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Umur:</label>
          <input
            type="number"
            {...register("umur", { valueAsNumber: true })}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan umur"
          />
          {errors.umur && (
            <p className="text-sm text-red-600">{errors.umur.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Pilihan Divisi:</label>
          <select
            {...register("pilihanDivisi")}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Pilih Divisi</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="ui/ux">UI/UX</option>
          </select>
          {errors.pilihanDivisi && (
            <p className="text-sm text-red-600">
              {errors.pilihanDivisi.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium">Keahlian Pilihan:</label>
          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm">
              <input {...register("keahlian")} type="checkbox" value="html" />
              HTML
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input {...register("keahlian")} type="checkbox" value="css" />
              CSS
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                {...register("keahlian")}
                type="checkbox"
                value="javascript"
              />
              JavaScript
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input {...register("keahlian")} type="checkbox" value="react" />
              React
            </label>
          </div>
          {errors.keahlian && (
            <p className="text-sm text-red-600">{errors.keahlian.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm">
              <input {...register("ketentuan")} type="checkbox" />
              Saya Menyetujui tata tertib divisi IT
            </label>
          </div>
          {errors.ketentuan && (
            <p className="text-sm text-red-600">{errors.ketentuan.message}</p>
          )}
        </div>

        <p
          className={`text-sm font-medium ${
            isValid ? "text-green-600" : "text-red-600"
          }`}
        >
          {isValid
            ? "✓ Siap dikirim karena inputan valid"
            : "✕ Belum siap dikirim karena ada inputan yang belum valid"}
        </p>

        {pilihanDivisi && <p>Divisi dipilih: {pilihanDivisi}</p>}

        <button
          type="submit"
          disabled={!isValid}
          className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-20"
        >
          Kirim Pendaftaran
        </button>
      </form>

      {submittedData && (
        <section
          className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4"
          aria-live="polite"
        >
          <h3 className="mb-2 font-semibold text-green-800">
            Pendaftaran Berhasil
          </h3>
          <dl className="space-y-1 text-sm text-gray-700">
            <div>
              <dt className="inline font-medium">Nama: </dt>
              <dd className="inline">{submittedData.nama}</dd>
            </div>
            <div>
              <dt className="inline font-medium">NIS: </dt>
              <dd className="inline">{submittedData.NIS}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Umur: </dt>
              <dd className="inline">{submittedData.umur}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Divisi: </dt>
              <dd className="inline">{submittedData.pilihanDivisi}</dd>
            </div>
            <div>
              <dt className="inline font-medium">Keahlian: </dt>
              <dd className="inline">{submittedData.keahlian.join(", ")}</dd>
            </div>
          </dl>
        </section>
      )}
    </div>
  );
}

export default PeminatanFormTS;