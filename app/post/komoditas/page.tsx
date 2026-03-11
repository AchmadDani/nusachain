"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronDown } from "lucide-react";

export default function PostKomoditasPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState<"SUPPLY" | "DEMAND">("SUPPLY");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Convert string inputs to correct types
    const apiData = {
      commodityName: data.commodityName as string,
      quantity: Number(data.quantity),
      price: Number(data.price),
      originCity: data.originCity as string,
      destinationCity: data.destinationCity as string,
      contactInfo: data.contactInfo as string,
      notes: data.notes as string,
    };

    try {
      // POST based on selected type
      const endpoint = postType === "SUPPLY" ? "/api/supply" : "/api/demand";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      if (res.ok) {
        router.push(`/marketplace?tab=${postType.toLowerCase()}`);
        router.refresh();
      } else {
        alert(`Gagal memposting ${postType === "SUPPLY" ? "Pasokan" : "Kebutuhan"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <Link href="/marketplace" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Kembali ke Marketplace
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header Section */}
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Posting Komoditas Baru</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Gunakan form ini untuk memposting hasil panen (Supply) atau mencari barang yang Anda butuhkan (Demand).
          </p>
          
          {/* Post Type Selector */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setPostType("SUPPLY")}
              className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${
                postType === "SUPPLY" 
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400" 
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:border-emerald-200 dark:hover:border-emerald-800"
              }`}
            >
              {postType === "SUPPLY" && (
                <CheckCircle2 className="w-5 h-5 absolute top-3 right-3 text-emerald-500" />
              )}
              <span className="font-bold text-lg mb-1">Saya Ingin Menjual</span>
              <span className="text-xs opacity-80">(Posting Supply)</span>
            </button>
            <button
              onClick={() => setPostType("DEMAND")}
               className={`flex-1 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all relative overflow-hidden ${
                postType === "DEMAND" 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" 
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:border-blue-200 dark:hover:border-blue-800"
              }`}
            >
               {postType === "DEMAND" && (
                <CheckCircle2 className="w-5 h-5 absolute top-3 right-3 text-blue-500" />
              )}
              <span className="font-bold text-lg mb-1">Saya Sedang Mencari</span>
              <span className="text-xs opacity-80">(Posting Demand)</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 block">Nama Komoditas / Barang</label>
                <input
                  type="text"
                  name="commodityName"
                  required
                  placeholder="Cth: Cabai Merah Keriting"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all dark:text-white"
                />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 block">Jumlah Kebutuhan (Kg)</label>
                <div className="relative">
                  <input
                    type="number"
                    name="quantity"
                    required
                    placeholder="2000"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all dark:text-white pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">kg</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 block">
                  {postType === "SUPPLY" ? "Lokasi Barang" : "Area Pengiriman Diharapkan"}
                </label>
                <input
                  type="text"
                  name="originCity"
                  required
                  placeholder={postType === "SUPPLY" ? "Cth: Brebes, Jawa Tengah" : "Cth: Jakarta Pusat"}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 block">Harga Ditawarkan (Rp/Kg)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">Rp</span>
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="35000"
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all dark:text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 block">Nama Perusahaan / Kontak</label>
                <input
                  type="text"
                  name="contactInfo"
                  required
                  placeholder="PT Tani Makmur"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all dark:text-white"
                />
              </div>
               <div className="space-y-2">
                 {/* For APIs consistency with specific fields: Supply requires contactInfo, Demand uses destinationCity conceptually. I'm providing all basic inputs seamlessly so they align broadly with any schema we got. */}
                <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 block">
                  {postType === "SUPPLY" ? "Siap Kirim ke Wilayah" : "Batas Waktu Pengiriman (Opsional)"}
                </label>
                <input
                  type="text"
                  name="destinationCity"
                  placeholder={postType === "SUPPLY" ? "Seluruh Jawa" : "-"}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 dark:text-slate-200 block">Catatan Tambahan (Opsional)</label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Spesifikasi kualitas, persyaratan, dll."
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all dark:text-white resize-none"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white transition-all 
                  ${postType === "SUPPLY" 
                    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30" 
                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/30"} 
                  ${loading ? "opacity-75 cursor-wait" : "active:scale-[0.98]"}`}
              >
                {loading ? "Menyimpan data..." : postType === "SUPPLY" ? "Posting Supply Sekarang" : "Posing Kebutuhan Sekarang"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
