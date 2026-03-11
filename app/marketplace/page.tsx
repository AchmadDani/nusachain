import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import CommodityCard from "@/components/CommodityCard";
import { PackageSearch, PackageOpen } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function MarketplacePage(props: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const searchParams = await props.searchParams;
  const tab = searchParams.tab || 'demand';
  
  if (tab !== 'demand' && tab !== 'supply') {
    redirect('/marketplace?tab=demand');
  }

  const demands = tab === 'demand' ? await prisma.demand.findMany({ orderBy: { createdAt: 'desc' } }) : [];
  const supplies = tab === 'supply' ? await prisma.supply.findMany({ orderBy: { createdAt: 'desc' } }) : [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-white/70 dark:bg-slate-900/70 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Marketplace Komoditas</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm">
            {tab === 'demand' 
              ? 'Jelajahi permintaan komoditas dari pembeli di seluruh Indonesia.' 
              : 'Temukan hasil panen dan pasokan komoditas langsung dari supplier.'}
          </p>
        </div>
        
        {/* Tab Navigation & Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-full sm:w-auto">
            <Link
              href="/marketplace?tab=demand"
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 whitespace-nowrap px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${
                tab === 'demand'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <PackageSearch className="w-4 h-4" />
              Permintaan Pembeli
            </Link>
            <Link
              href="/marketplace?tab=supply"
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 whitespace-nowrap px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${
                tab === 'supply'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <PackageOpen className="w-4 h-4" />
              Pasokan Penjual
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            {tab === 'demand' ? (
              <Link 
                href="/post/komoditas" 
                className="w-full sm:w-auto inline-flex justify-center items-center bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-95 whitespace-nowrap"
              >
                Buat Permintaan
              </Link>
            ) : (
              <Link 
                href="/post/komoditas" 
                className="w-full sm:w-auto inline-flex justify-center items-center bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-emerald-500/30 hover:shadow-emerald-500/50 active:scale-95 whitespace-nowrap"
              >
                Jual Komoditas
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {tab === 'demand' && (
          demands.length === 0 ? (
            <div className="p-12 text-center bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <PackageSearch className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Tidak ada permintaan komoditas</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Jadilah yang pertama untuk membuat permintaan pasar.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {demands.map((demand: any) => (
                <CommodityCard
                  key={demand.id}
                  id={demand.id}
                  name={demand.commodityName}
                  quantity={demand.quantity}
                  origin="Tidak Terbatas"
                  destination={demand.destinationCity}
                  price={0}
                  type="DEMAND"
                  supplierName={demand.contactInfo}
                />
              ))}
            </div>
          )
        )}

        {tab === 'supply' && (
          supplies.length === 0 ? (
            <div className="p-12 text-center bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
               <PackageOpen className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Tidak ada pasokan komoditas</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Jadilah yang pertama untuk memasarkan hasil panen Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {supplies.map((supply: any) => (
                <CommodityCard
                  key={supply.id}
                  id={supply.id}
                  name={supply.commodityName}
                  quantity={supply.quantity}
                  origin={supply.originCity}
                  destination="Nasional"
                  price={supply.price}
                  type="SUPPLY"
                  supplierName={supply.contactInfo}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
