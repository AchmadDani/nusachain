import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Package, Phone, Calendar, Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CommodityDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;

  // Try to find in Supply first, then Demand
  let item: any = await prisma.supply.findUnique({
    where: { id },
  });
  let type: "SUPPLY" | "DEMAND" = "SUPPLY";

  if (!item) {
    item = await prisma.demand.findUnique({
      where: { id },
    });
    type = "DEMAND";
  }

  if (!item) {
    notFound();
  }

  const isSupply = type === "SUPPLY";

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      <Link href={`/marketplace?tab=${type.toLowerCase()}`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Kembali ke Marketplace
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Visual / Abstract Area */}
        <div className={`md:w-1/3 p-8 flex flex-col justify-between text-white ${isSupply ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>
          <div>
             <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
              {isSupply ? "Pasokan Tersedia" : "Kebutuhan Pasar"}
            </span>
            <h1 className="text-3xl font-black leading-tight mb-2">{item.commodityName}</h1>
            <p className="text-white/80 flex items-center gap-2">
              <Package className="w-4 h-4" />
              {item.quantity} kg {isSupply ? 'Tersedia' : 'Dibutuhkan'}
            </p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 space-y-4">
             {isSupply && item.price > 0 && (
                <div>
                   <p className="text-sm text-white/70">Harga Penawaran</p>
                   <p className="text-2xl font-bold">Rp {item.price.toLocaleString("id-ID")}<span className="text-sm font-normal">/kg</span></p>
                </div>
             )}
            <div>
              <p className="text-sm text-white/70">Tanggal Posting</p>
              <p className="font-medium flex items-center gap-1.5 mt-1">
                <Calendar className="w-4 h-4" />
                {new Date(item.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* Details Area */}
        <div className="md:w-2/3 p-8">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Informasi Rinci</h2>
           
           <div className="grid sm:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                 <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" /> Lokasi Asal
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-200">
                      {isSupply ? item.originCity : 'Disesuaikan dengan penawaran'}
                    </p>
                 </div>
                 <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" /> Tujuan Pengiriman / Area
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-slate-200">
                      {isSupply ? (item.destinationCity || 'Bebas') : item.destinationCity}
                    </p>
                 </div>
              </div>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                 <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Info Kontak & Supplier
                 </p>
                 <p className="font-bold text-lg text-slate-900 dark:text-white">
                    {item.contactInfo}
                 </p>
              </div>
           </div>

           {item.notes && (
             <div className="mb-8">
               <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">Catatan Tambahan</h3>
               <p className="text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed text-sm">
                 {item.notes}
               </p>
             </div>
           )}

           <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
              <button className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-white font-bold transition-all shadow-sm active:scale-95 ${isSupply ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'}`}>
                <Phone className="w-5 h-5" /> 
                Hubungi {isSupply ? 'Supplier' : 'Pembeli'}
              </button>
              
              <Link 
                href="/logistik?tab=drivers"
                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3.5 px-6 rounded-xl font-bold transition-all shadow-sm shadow-amber-500/20 active:scale-95"
              >
                <Search className="w-5 h-5" />
                Cari Logistik
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
