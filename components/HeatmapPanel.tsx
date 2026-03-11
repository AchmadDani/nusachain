import { Flame, TrendingUp } from "lucide-react";

interface HeatmapDataProps {
  city: string;
  commodity: string;
  status: "Tinggi" | "Sedang" | "Rendah";
}

const mockData: HeatmapDataProps[] = [
  { city: "Semarang", commodity: "Cabai", status: "Tinggi" },
  { city: "Jakarta", commodity: "Beras", status: "Tinggi" },
  { city: "Bandung", commodity: "Bawang", status: "Sedang" },
  { city: "Surabaya", commodity: "Jagung", status: "Sedang" },
  { city: "Yogyakarta", commodity: "Kedelai", status: "Rendah" },
];

export default function HeatmapPanel() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Map visualization placeholder */}
      <div className="w-full h-[400px] bg-slate-100 dark:bg-slate-800/50 relative overflow-hidden flex items-center justify-center">
        {/* Abstract Map Background Grid */}
        <div className="absolute inset-0 border-t border-l border-slate-200 dark:border-slate-800/50 opacity-20 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        <div className="text-center z-10 space-y-4">
          <div className="mx-auto w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center border border-slate-100 dark:border-slate-700">
            <Flame className="w-8 h-8 text-rose-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Visualisasi Peta Distribusi</h3>
            <p className="text-sm text-slate-500">Integrasi peta interaktif sedang dalam pengembangan.</p>
          </div>
        </div>
        
        {/* Animated Heat Blobs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-2/3 w-24 h-24 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-green-500" />
          Kota dengan Permintaan Tertinggi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.map((data, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50 hover:bg-white dark:bg-slate-800/30 dark:hover:bg-slate-800 transition-colors"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{data.city}</p>
                <p className="text-sm text-slate-500 mt-0.5">{data.commodity} meningkat</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                data.status === 'Tinggi' ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-800/50' :
                data.status === 'Sedang' ? 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50' :
                'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/50'
              }`}>
                {data.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
