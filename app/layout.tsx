import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./components/shared/Sidebar";
import Navbar from "./components/shared/Navbar";
import { Footer } from "./components/shared/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SentryLink Comply Task",
  description: "Evidence Vault & Buyer Request UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased bg-slate-50 text-slate-900`}>
        <div className="flex">
          <Sidebar />

          <div className="flex-1 flex flex-col min-h-screen">

            <Navbar />
            <main className="flex-1">
              {children}

              <Footer />
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}