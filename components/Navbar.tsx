"use client";

import { Search, Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 h-16 transition-colors duration-300 flex items-center shrink-0">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
        
        {/* Search Bar Container */}
        <div className="flex-1 max-w-2xl flex items-center">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari komoditas, kota, atau logistik..."
              className="block w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent rounded-full text-sm text-slate-900 dark:text-white placeholder:text-slate-500 focus:border-green-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-white shadow-sm ring-2 ring-white dark:ring-slate-900 cursor-pointer hover:opacity-90 transition-opacity">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </nav>
  );
}
