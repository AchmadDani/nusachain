import Link from "next/link";
import { Package, MapPin, Search } from "lucide-react";

interface CommodityCardProps {
  id: string;
  name: string;
  quantity: number;
  origin: string;
  destination: string;
  price: number;
  supplierName?: string;
  type: "SUPPLY" | "DEMAND";
}

export default function CommodityCard({ 
  id, name, quantity, origin, destination, price, supplierName, type 
}: CommodityCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      {/* Decorative Top Accent depending on type */}
      <div className={`h-1.5 w-full ${type === "SUPPLY" ? "bg-emerald-500" : "bg-blue-500"}`} />
      
      <div className="p-5 flex-1 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white uppercase tracking-wide">
            {name}
          </h3>
          <span className="font-semibold text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg text-sm">
            Rp {price.toLocaleString("id-ID")} <span className="text-xs font-normal text-slate-500">/ kg</span>
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Package className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-900 dark:text-slate-200">Jumlah:</span> {quantity} kg
          </div>
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="font-medium text-slate-900 dark:text-slate-200">Rute:</span> 
            <span className="truncate">{origin} → {destination}</span>
          </div>
          {supplierName && (
             <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 pt-1">
               <span className="font-medium text-slate-900 dark:text-slate-200">Supplier:</span> {supplierName}
             </div>
          )}
        </div>
      </div>

      <div className="p-5 pt-0 mt-auto flex gap-2">
        <Link 
          href={`/marketplace/${id}`}
          className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl text-sm font-semibold text-center transition-colors"
        >
          Lihat Detail
        </Link>
        <Link 
          href={`/logistik?tab=drivers`}
          className="flex-[1.5] bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Search className="w-4 h-4" />
          Cari Logistik
        </Link>
      </div>
    </div>
  );
}
