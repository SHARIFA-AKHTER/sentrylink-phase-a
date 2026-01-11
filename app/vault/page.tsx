/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import { useState } from "react";
import { StatusChip } from "../components/ui/StatusChip";
import data from "@/data/mockData.json";

export default function EvidenceVault() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredData = data.evidence.filter(
    (item: any) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.type.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredData.map((item: any) => String(item.id)));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            Evidence Vault
          </h1>
          <p className="text-slate-500 text-xs md:text-sm">
            Viewing {filteredData.length} documents
          </p>
        </div>
        <button className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition-all active:scale-95">
          Add to Pack ({selectedIds.length})
        </button>
      </div>

      {/* Filters - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <input
          type="text"
          placeholder="Search by name or type..."
          className="w-full border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2 w-full">
          <select className="w-full border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-white">
            <option value="">All Types</option>
            <option value="Certification">Certification</option>
            <option value="Policy">Policy</option>
          </select>
          <select className="w-full border border-slate-200 p-2.5 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-white">
            <option value="">Status: All</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Mobile Card View (Visible only on small screens) */}
      <div className="block lg:hidden space-y-4">
        {filteredData.map((item: any) => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={selectedIds.includes(String(item.id))}
                  onChange={(e) => handleSelectOne(String(item.id), e.target.checked)}
                />
                <span className="font-bold text-slate-800">{item.name}</span>
              </div>
              <StatusChip status={item.status} />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-4">
              <span>Type: {item.type}</span>
              <span>Exp: {item.expiry}</span>
            </div>
            <Link href={`/vault/${item.id}`} className="block text-center w-full bg-slate-50 py-2 rounded-lg text-blue-600 font-bold text-sm">
              View Details →
            </Link>
          </div>
        ))}
      </div>

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden lg:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="py-4 px-4 w-10">
                  <input
                    type="checkbox"
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                  />
                </th>
                <th className="py-4 px-4">Doc Name</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-center">Expiry</th>
                <th className="py-4 px-4 text-center">Versions</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(String(item.id))}
                        onChange={(e) => handleSelectOne(String(item.id), e.target.checked)}
                      />
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800">{item.name}</td>
                    <td className="py-4 px-4 text-slate-600">{item.type}</td>
                    <td className="py-4 px-4"><StatusChip status={item.status} /></td>
                    <td className="py-4 px-4 text-slate-500 text-center">{item.expiry}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">
                        {item.versions || item.version}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Link href={`/vault/${item.id}`} className="text-blue-600 font-bold hover:text-blue-800">
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">No documents found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}