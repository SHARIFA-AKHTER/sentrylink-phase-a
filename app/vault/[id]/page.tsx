"use client";
import { useState, use } from "react"; 
import Link from "next/link";
import { StatusChip } from "@/app/components/ui/StatusChip";
import { Modal } from "@/app/components/ui/Modal";
import data from "@/data/mockData.json";

export default function EvidenceDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isModalOpen, setModalOpen] = useState(false);

  const doc = data.evidence.find((item: { id: string; }) => item.id === id);

  if (!doc) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Document not found!</h2>
        <Link href="/vault" className="text-blue-600 underline mt-4 inline-block">Return to Vault</Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto space-y-6 md:y-8">
      <Link href="/vault" className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-xs md:text-sm font-medium transition-colors">
        ← Back to Evidence Vault
      </Link>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{doc.name}</h2>
            <StatusChip status={doc.status} />
          </div>
          <p className="text-slate-500 text-sm">ID: #EV-{id} | Type: {doc.type}</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 text-sm"
        >
          Upload New Version
        </button>
      </div>

      {/* Version History */}
      <div className="space-y-4">
        <h3 className="text-lg md:text-xl font-bold px-1 text-slate-800">Version History</h3>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm min-w-125">
          
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[10px] tracking-widest">
                <tr>
                  <th className="p-4">Version</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Uploader</th>
                  <th className="p-4 text-right">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700">
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4 font-bold text-blue-600">{doc.version} (Latest)</td>
                  <td className="p-4">{doc.updatedAt}</td>
                  <td className="p-4 font-medium">Rakib Hasan</td>
                  <td className="p-4 text-right text-slate-400">2.4 MB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Upload New Version">
        <form className="space-y-4 md:space-y-5" onSubmit={(e) => { e.preventDefault(); setModalOpen(false); }}>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Change Notes *</label>
            <textarea 
              required
              placeholder="Explain updates..."
              className="w-full border border-slate-200 p-3 rounded-xl min-h-[100px] text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Expiry Date (Optional)</label>
            <input type="date" className="w-full border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
          <div className="p-5 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50">
            <p className="text-slate-400 text-xs md:text-sm font-medium">Click or drop file here</p>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3.5 md:py-4 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm">
            Publish New Version
          </button>
        </form>
      </Modal>
    </div>
  );
}