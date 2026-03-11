import { Phone, Truck, Calendar, ArrowRight } from "lucide-react";

interface DriverCardProps {
  id: string;
  name: string;
  vehicleType: string;
  capacity: number;
  origin: string;
  destination: string;
  availableDate: string;
}

export default function DriverCard({
  id,
  name,
  vehicleType,
  capacity,
  origin,
  destination,
  availableDate,
}: DriverCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden relative">
      {/* Decorative background shape */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 dark:bg-amber-900/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="p-5 flex-1 space-y-5 relative z-10">
        {/* Header with Avatar */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Supir Logistik</p>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">
              {name}
            </h3>
          </div>
        </div>

        {/* Vehicle & Capacity Specs */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-500 border border-amber-200/50 dark:border-amber-800/50">
            <Truck className="w-3.5 h-3.5" />
            {vehicleType}
          </span>
          <span className="inline-flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
            Kapasitas {capacity} ton
          </span>
        </div>

        {/* Route Info */}
        <div className="space-y-1 block p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Rute Perjalanan</p>
          <div className="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-200 text-sm">
            <span className="truncate max-w-[40%]">{origin}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate max-w-[40%]">{destination}</span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pt-0 mt-auto flex flex-col gap-3 relative z-10">
        <div className="flex justify-between items-center text-sm font-medium border-b border-slate-100 dark:border-slate-800/80 pb-3">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Tersedia
          </span>
          <span className="text-slate-900 dark:text-slate-100">
            {availableDate}
          </span>
        </div>
        
        <div className="flex gap-2 w-full pt-1">
          <button className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
            <Phone className="w-4 h-4" />
            Hubungi
          </button>
          <button className="flex-[1.5] bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-amber-500/20 active:scale-95">
            Ambil Pengiriman
          </button>
        </div>
      </div>
    </div>
  );
}
