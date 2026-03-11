import { MapPin, Truck, Calendar, Package } from "lucide-react";

interface LogisticsCardProps {
  id: string;
  commodity: string;
  weight: number;
  origin: string;
  destination: string;
  vehicleType: string;
  date: string;
}

export default function LogisticsCard({
  id,
  commodity,
  weight,
  origin,
  destination,
  vehicleType,
  date,
}: LogisticsCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
      {/* Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-amber-500" />
      
      <div className="p-5 flex-1 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Komoditas</p>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
                {commodity}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
              #{id.slice(-6).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm mt-2">
          <div className="space-y-1">
            <p className="text-slate-500 dark:text-slate-400 text-xs">Berat</p>
            <p className="font-semibold text-slate-900 dark:text-slate-200">{weight} ton</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 dark:text-slate-400 text-xs">Kendaraan</p>
            <p className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              {vehicleType}
            </p>
          </div>
        </div>

        {/* Route Details */}
        <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex gap-3 relative">
            <div className="absolute left-[9px] top-6 bottom-[-12px] w-0.5 bg-slate-200 dark:bg-slate-700" />
            <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 mt-0.5 z-10">
              <div className="w-2 h-2 rounded-full bg-slate-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Asal</p>
              <p className="font-medium text-slate-900 dark:text-slate-200 text-sm truncate">{origin}</p>
            </div>
          </div>
          <div className="flex gap-3 relative">
            <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0 mt-0.5 z-10">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tujuan</p>
              <p className="font-medium text-slate-900 dark:text-slate-200 text-sm truncate">{destination}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 mt-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-amber-500/20 active:scale-95">
          Ambil Order
        </button>
      </div>
    </div>
  );
}
