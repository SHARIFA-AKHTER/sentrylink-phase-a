"use client";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Evidence Vault", path: "/vault" },
    { name: "Buyer Requests", path: "/todo" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-6 hidden md:block">
    
      <Link href="/" className="mb-10 flex items-center gap-3 px-2 group cursor-pointer">
        <div className="relative">
          <div className="bg-linear-to-tr from-blue-700 to-blue-500 p-2 rounded-xl shadow-lg shadow-blue-100 group-hover:rotate-12 transition-transform duration-300">
            <ShieldCheck className="text-white" size={24} />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-black text-slate-800 tracking-tighter">
            Sentry<span className="text-blue-600">Link</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
            Enterprise Vault
          </p>
        </div>
      </Link>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              pathname.startsWith(item.path)
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};