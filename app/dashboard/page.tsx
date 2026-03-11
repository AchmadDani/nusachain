import { prisma } from "@/lib/prisma";
import StatCard from "@/components/StatCard";
import CommodityCard from "@/components/CommodityCard";
import LogisticsCard from "@/components/LogisticsCard";
import { PackageSearch, PackageOpen, Truck, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [
    demandCount, 
    supplyCount, 
    driversCount, 
    logisticsCount,
    recentDemands,
    recentSupplies,
    recentLogistics
  ] = await Promise.all([
    prisma.demand.count(),
    prisma.supply.count(),
    prisma.driver.count(),
    prisma.logisticsRequest.count(),
    prisma.demand.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.supply.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.logisticsRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 3 })
  ]);

  return (
    <div className="space-y-10 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Pantau aktivitas platform komoditas dan logistik Anda.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Permintaan Komoditas" 
          value={`${demandCount} aktif`}
          subtitle="Total kebutuhan di pasar"
          icon={<PackageSearch className="w-6 h-6" />}
          trend="up"
        />
        <StatCard 
          title="Supply Tersedia" 
          value={`${supplyCount} item`}
          subtitle="Tawaran dari supplier"
          icon={<PackageOpen className="w-6 h-6" />}
          trend="up"
        />
         <StatCard 
          title="Permintaan Logistik" 
          value={`${logisticsCount} order`}
          subtitle="Butuh pengiriman segera"
          icon={<ClipboardList className="w-6 h-6" />}
          trend="neutral"
        />
        <StatCard 
          title="Armada Tersedia" 
          value={`${driversCount} supir`}
          subtitle="Siap menerima order"
          icon={<Truck className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Latest Demand */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Permintaan Komoditas Terbaru
            </h2>
            <Link href="/marketplace?tab=demand" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group">
              Lihat Semua <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {recentDemands.length > 0 ? (
              recentDemands.map((item) => (
                <CommodityCard
                  key={item.id}
                  id={item.id}
                  name={item.commodityName}
                  quantity={item.quantity}
                  origin="N/A"
                  destination={item.destinationCity}
                  price={0} 
                  type="DEMAND"
                />
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">Belum ada permintaan.</div>
            )}
          </div>
        </section>

        {/* Latest Supply */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
             <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Supply Komoditas Terbaru
            </h2>
             <Link href="/marketplace?tab=supply" className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1 group">
              Lihat Semua <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {recentSupplies.length > 0 ? (
              recentSupplies.map((item) => (
                <CommodityCard
                  key={item.id}
                  id={item.id}
                  name={item.commodityName}
                  quantity={item.quantity}
                  origin={item.originCity}
                  destination="Nasional"
                  price={item.price} 
                  supplierName={item.contactInfo}
                  type="SUPPLY"
                />
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">Belum ada pasokan.</div>
            )}
          </div>
        </section>

        {/* Latest Logistics */}
        <section className="space-y-4 xl:col-span-2">
          <div className="flex justify-between items-center">
             <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
              Permintaan Logistik Terbaru
            </h2>
            <Link href="/logistik?tab=requests" className="text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 flex items-center gap-1 group">
              Lihat Semua <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {recentLogistics.length > 0 ? (
                recentLogistics.map((req) => (
                  <LogisticsCard
                    key={req.id}
                    id={req.id}
                    commodity={req.commodity}
                    weight={req.weight}
                    origin={req.pickupLocation}
                    destination={req.destinationLocation}
                    vehicleType={req.vehicleType}
                    date={new Date(req.createdAt).toLocaleDateString("id-ID")}
                  />
                ))
             ) : (
               <div className="col-span-full p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50 dark:bg-slate-900/50">Belum ada permintaan pengiriman.</div>
             )}
          </div>
        </section>
      </div>
    </div>
  );
}
