"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function NewDriver() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: Record<string, unknown>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/drivers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/logistik?tab=drivers");
        router.refresh();
      } else {
        alert("Gagal mendaftarkan armada");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat mendaftar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/logistik?tab=drivers" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-amber-900/10 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Daftar Armada Tersedia</h1>
          <p className="mt-1 text-amber-50 text-sm font-medium">Bergabung dengan jaringan logistik untuk mendapatkan permintaan pengiriman.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
               <label htmlFor="driverName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Nama Pengemudi <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="driverName"
                {...register("driverName", { required: true })}
                className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                placeholder="Nama Lengkap"
              />
            </div>

            <div>
              <label htmlFor="vehicleType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Jenis Kendaraan <span className="text-rose-500">*</span>
              </label>
              <select
                id="vehicleType"
                {...register("vehicleType", { required: true })}
                className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-slate-800/50 sm:text-sm transition-shadow"
              >
                <option value="">Pilih Kendaraan...</option>
                <option value="Pickup">Pickup</option>
                <option value="L300">L300</option>
                <option value="Colt Diesel">Colt Diesel</option>
                <option value="Fuso">Fuso</option>
                <option value="Tronton">Tronton</option>
              </select>
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Kapasitas Muatan <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="capacity"
                  {...register("capacity", { required: true, min: 1 })}
                  className="block w-full rounded-xl border-0 py-2.5 pl-4 pr-12 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                  placeholder="0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-slate-500 dark:text-slate-400 sm:text-sm">kg</span>
                </div>
              </div>
            </div>

            <div>
               <label htmlFor="currentLocation" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Lokasi Saat Ini <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="currentLocation"
                {...register("currentLocation", { required: true })}
                className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                placeholder="Cth: Jakarta Pusat"
              />
            </div>

            <div>
              <label htmlFor="availableDate" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tanggal Tersedia
              </label>
              <input
                type="date"
                id="availableDate"
                {...register("availableDate")}
                className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-slate-800/50 sm:text-sm transition-shadow"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="destinationCity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Tujuan Pengiriman (Opsional)
              </label>
              <input
                type="text"
                id="destinationCity"
                {...register("destinationCity")}
                className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 dark:bg-slate-800/50 sm:text-sm transition-shadow"
                placeholder="Ke mana tujuan Anda?"
              />
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-end gap-4">
             <button
              type="button"
              onClick={() => router.back()}
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 hover:text-amber-600 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-amber-500/30 hover:bg-amber-400 hover:shadow-amber-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              {isSubmitting ? "Mendaftar..." : "Daftarkan Armada"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

