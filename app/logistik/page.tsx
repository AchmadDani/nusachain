import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogisticsCard from "@/components/LogisticsCard";
import DriverCard from "@/components/DriverCard";

export const dynamic = 'force-dynamic';

export default async function LogisticsPage(props: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const searchParams = await props.searchParams;
  const tab = searchParams.tab || 'drivers';

  if (tab !== 'drivers' && tab !== 'requests') {
    redirect('/logistik?tab=drivers');
  }

  const drivers = tab === 'drivers' ? await prisma.driver.findMany({ orderBy: { createdAt: 'desc' } }) : [];
  const requests = tab === 'requests' ? await prisma.logisticsRequest.findMany({ orderBy: { createdAt: 'desc' } }) : [];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 bg-white/70 dark:bg-slate-900/70 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">Pusat Logistik</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm">
            {tab === 'drivers' 
              ? 'Temukan daftar pengemudi dan armada yang siap melayani pengiriman Anda.' 
              : 'Kelola dan lacak permintaan pengiriman Anda di seluruh jaringan.'}
          </p>
        </div>
        
        {/* Tab Navigation & Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-full sm:w-auto">
            <Link
              href="/logistik?tab=drivers"
              className={`flex-1 sm:flex-none flex justify-center whitespace-nowrap px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${
                tab === 'drivers'
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Armada Tersedia
            </Link>
            <Link
              href="/logistik?tab=requests"
              className={`flex-1 sm:flex-none flex justify-center whitespace-nowrap px-6 py-2.5 text-sm font-medium rounded-lg transition-all ${
                tab === 'requests'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              Permintaan Pengiriman
            </Link>
          </div>

          <div className="w-full sm:w-auto">
            {tab === 'drivers' ? (
              <Link 
                href="/drivers/new" 
                className="w-full sm:w-auto inline-flex justify-center items-center bg-amber-600 hover:bg-amber-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-95 whitespace-nowrap"
              >
                Daftar Driver
              </Link>
            ) : (
              <Link 
                href="/logistik/new" 
                className="w-full sm:w-auto inline-flex justify-center items-center bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-95 whitespace-nowrap"
              >
                Buat Pengiriman
              </Link>
            )}
          </div>
        </div>
      </div>

      <div>
        {tab === 'drivers' && (
          drivers.length === 0 ? (
            <div className="p-12 text-center bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
              <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Tidak ada pengemudi ditemukan</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Bergabunglah dengan jaringan kami sebagai pengemudi baru.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {drivers.map((driver: any) => (
                <DriverCard 
                  key={driver.id}
                  id={driver.id}
                  name={driver.driverName}
                  vehicleType={driver.vehicleType}
                  capacity={driver.capacity}
                  origin={driver.currentLocation}
                  destination={driver.destinationCity || "Bebas"}
                  availableDate={new Date(driver.availableDate).toLocaleDateString("id-ID")}
                />
              ))}
            </div>
          )
        )}

        {tab === 'requests' && (
          requests.length === 0 ? (
            <div className="p-12 text-center bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
               <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Tidak ada permintaan</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Buat permintaan baru untuk menyewa pengemudi logistik.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {requests.map((request: any) => (
                <LogisticsCard 
                  key={request.id}
                  id={request.id}
                  commodity={request.commodity}
                  weight={request.weight}
                  origin={request.pickupLocation}
                  destination={request.destinationLocation}
                  vehicleType={request.vehicleType}
                  date={new Date(request.createdAt).toLocaleDateString("id-ID")}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
