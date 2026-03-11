import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NusaChain",
  description: "Platform Logistik dan Komoditas Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-slate-50 dark:bg-black w-full min-h-screen text-slate-900 dark:text-slate-100 flex overflow-hidden`}
      >
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Application Area Wrapper */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#0c0c0c] transition-colors relative">
          {/* Top Navbar */}
          <Navbar />
          
          {/* Main Scrollable Content */}
          <main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
