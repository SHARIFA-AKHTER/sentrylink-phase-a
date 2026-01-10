"use client";
import { useState } from "react";
import Link from "next/link";
import { StatusChip } from "@/components/ui/StatusChip";
import { Modal } from "@/components/ui/Modal";

export default function EvidenceDetail({ params }: { params: { id: string } }) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-8">
      <Link href="/vault" className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition-colors">
        ← Back to Evidence Vault
      </Link>

      {/* Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-slate-900">ISO 27001 Certificate</h2>
            <StatusChip status="Active" />
          </div>
          <p className="text-slate-500">Document ID: #EV-{params.id} | Type: Certification</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          Upload New Version
        </button>
      </div>

      {/* Versions Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold px-1">Version History</h3>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="p-4">Version</th>
                <th className="p-4">Date</th>
                <th className="p-4">Uploader</th>
                <th className="p-4 hidden sm:table-cell">Notes</th>
                <th className="p-4">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="hover:bg-blue-50/30 transition-colors">
                <td className="p-4 font-bold text-blue-600">v3 (Latest)</td>
                <td className="p-4 text-slate-600">Jan 10, 2024</td>
                <td className="p-4 text-slate-800 font-medium">Rakib Hasan</td>
                <td className="p-4 hidden sm:table-cell text-slate-500 italic">Updated after annual audit.</td>
                <td className="p-4 text-slate-400">2.4 MB</td>
              </tr>
              <tr className="hover:bg-blue-50/30 transition-colors opacity-70">
                <td className="p-4 font-bold">v2</td>
                <td className="p-4 text-slate-600">Jan 05, 2023</td>
                <td className="p-4 text-slate-800 font-medium">Rakib Hasan</td>
                <td className="p-4 hidden sm:table-cell text-slate-500 italic">Renewal submission.</td>
                <td className="p-4 text-slate-400">2.1 MB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Uploading */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Upload New Version">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Change Notes *</label>
            <textarea 
              required
              placeholder="Explain what has been updated..."
              className="w-full border border-slate-200 p-3 rounded-xl min-h-[100px] outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Expiry Date (Optional)</label>
            <input type="date" className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>
          <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:bg-slate-50 transition-colors cursor-pointer">
            <p className="text-slate-400 text-sm font-medium">Click to upload or drag and drop document</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
            Publish New Version
          </button>
        </form>
      </Modal>
    </div>
  );
}