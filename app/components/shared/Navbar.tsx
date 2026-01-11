"use client";

import {
  Bell,
  Search,
  ChevronDown,
  Menu,
  ShieldCheck,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header 
      className={`h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50" 
        : "bg-white border-b border-slate-100"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        <button className="p-2.5 hover:bg-slate-100 rounded-xl md:hidden text-slate-600 transition-colors active:scale-95">
          <Menu size={20} />
        </button>

        <div className="md:hidden flex items-center text-blue-600">
          <ShieldCheck size={24} fill="currentColor" fillOpacity={0.2} />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative w-full max-w-sm group">
          <Search
            className="absolute left-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200"
            size={17}
          />
          <input
            type="text"
            placeholder="Search documents, vault..."
            className="w-full bg-slate-50 border border-slate-200 py-2.5 pl-11 pr-4 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 focus:bg-white transition-all duration-300 group-hover:bg-slate-100/80"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4 relative" ref={dropdownRef}>
        
        {/* Notifications */}
        <button className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-xl relative transition-all active:scale-90 group">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full animate-ping opacity-75 group-hover:opacity-100" />
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-3 p-1 pr-3 rounded-2xl transition-all duration-200 border ${
              open 
              ? "bg-slate-100 border-slate-200" 
              : "border-transparent hover:bg-slate-50"
            }`}
          >
        
            <div className="h-9 w-9 rounded-xl bg-linear-to-tr from-blue-700 via-blue-600 to-blue-500 flex items-center justify-center text-white text-[13px] font-bold shadow-[0_4px_12px_rgba(59,130,246,0.3)] ring-2 ring-white">
              RH
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-[13px] font-bold text-slate-800 leading-tight">
                Rakib Hasan
              </p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-0.5">
                Admin
              </p>
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="p-4 border-b border-slate-50 bg-slate-50/50">
                <p className="text-sm font-bold text-slate-800">Rakib Hasan</p>
                <p className="text-xs text-slate-500 mt-1 font-medium italic">rakib@sentrylink.com</p>
              </div>
              
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  <User size={16} className="text-slate-400" /> My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                  <Settings size={16} className="text-slate-400" /> Settings
                </button>
              </div>

              <div className="p-2 border-t border-slate-50">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}