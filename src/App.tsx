export default function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 text-blue-600 mb-2 font-bold text-2xl">
          ⚛️
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          ASAS Praktek XI
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Starter project React + TypeScript telah siap. Silakan buat komponen form dan skema validasi Zod sesuai instruksi lembar soal.
        </p>
        <div className="pt-2 text-xs text-slate-400 font-mono">
          Edit <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">src/App.tsx</span> untuk memulai.
        </div>
      </div>
    </main>
  );
}
