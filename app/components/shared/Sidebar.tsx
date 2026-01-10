"use client";
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
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-600 tracking-tight">SentryLink</h2>
      </div>
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