"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Store, 
  Truck, 
  Map, 
  PlusCircle, 
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Marketplace Komoditas", href: "/marketplace", icon: Store },
    { name: "Logistik", href: "/logistik", icon: Truck },
    { name: "Heatmap Distribusi", href: "/heatmap", icon: Map },
    { name: "Posting Baru", href: "/post/komoditas", icon: PlusCircle },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:static lg:flex-shrink-0"}
      `}>
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800/50 flex-shrink-0">
          <Link href="/dashboard" className="text-xl font-bold text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">NC</span>
            </div>
            NusaChain
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1.5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Menu Utama
          </div>
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href) && 
              (item.href !== "/post/komoditas" || pathname === "/post/komoditas");
              
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? "bg-green-600/10 text-green-500" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-green-500" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        {/* Footer Area */}
        <div className="p-4 border-t border-slate-800/50 text-xs text-slate-500 flex flex-col gap-1 flex-shrink-0">
          <span>&copy; 2026 NusaChain</span>
          <span>Versi 1.0 (MVP)</span>
        </div>
      </div>
    </>
  );
}
