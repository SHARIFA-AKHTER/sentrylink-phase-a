import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

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
      <body className={`${geistSans.variable} antialiased bg-slate-50
         text-slate-900`}>
      
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}