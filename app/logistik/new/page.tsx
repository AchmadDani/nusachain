"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewLogistics() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/logistics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/logistik?tab=requests");
        router.refresh();
      } else {
        alert("Gagal membuat permintaan pengiriman");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mengirim permintaan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/logistik?tab=requests" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-indigo-900/10 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Buat Permintaan Pengiriman</h1>
          <p className="mt-1 text-indigo-50 text-sm font-medium">Buat permintaan logistik untuk mengirimkan komoditas Anda dengan aman.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="commodity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Komoditas yang Dikirim <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="commodity"
                {...register("commodity", { required: true })}
                className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                placeholder="Cth: Beras, Minyak Sawit"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Total Berat <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="weight"
                  {...register("weight", { required: true, min: 1 })}
                  className="block w-full rounded-xl border-0 py-2.5 pl-4 pr-12 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-400 sm:text-sm">kg</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Kendaraan yang Dibutuhkan <span className="text-rose-500">*</span>
              </label>
              <select
                id="vehicleType"
                {...register("vehicleType", { required: true })}
                className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800/50 sm:text-sm transition-shadow"
              >
                <option value="">Pilih Kendaraan...</option>
                <option value="Pickup">Pickup</option>
                <option value="L300">L300</option>
                <option value="Colt Diesel">Colt Diesel</option>
                <option value="Fuso">Fuso</option>
                <option value="Tronton">Tronton</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Lokasi Penjemputan <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-indigo-500/30 ml-1"></div>
                 </div>
                <input
                  type="text"
                  id="pickupLocation"
                  {...register("pickupLocation", { required: true })}
                  className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                  placeholder="Alamat asal atau kota"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
               <label htmlFor="destinationLocation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Lokasi Tujuan <span className="text-rose-500">*</span>
              </label>
               <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-2 w-2 rounded-full bg-rose-500 ring-2 ring-rose-500/30 ml-1"></div>
                 </div>
                <input
                  type="text"
                  id="destinationLocation"
                  {...register("destinationLocation", { required: true })}
                  className="block w-full rounded-xl border-0 py-2.5 pl-10 pr-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                  placeholder="Alamat tujuan atau kota"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-end gap-4">
             <button
              type="button"
              onClick={() => router.back()}
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 hover:text-indigo-600 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-500/30 hover:bg-indigo-500 hover:shadow-indigo-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {isSubmitting ? "Memproses..." : "Kirim Permintaan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

