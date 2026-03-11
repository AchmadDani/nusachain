import HeatmapPanel from "@/components/HeatmapPanel";

export const dynamic = 'force-dynamic';

export default function HeatmapPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-white/70 dark:bg-slate-900/70 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Peta Panas Logistik</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Analisis titik konsentrasi permintaan dan pasokan komoditas di seluruh wilayah untuk optimasi rute.
          </p>
        </div>
      </div>

      <HeatmapPanel />
    </div>
  );
}
