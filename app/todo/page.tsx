/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Link from "next/link";
import { Modal } from "../components/ui/Modal";


const initialRequests = [
  { id: 1, docType: "Fire Safety Certificate", dueDate: "2026-02-15", status: "Pending", buyer: "Global Retailers Inc." },
  { id: 2, docType: "Environmental Audit Report", dueDate: "2026-03-01", status: "Pending", buyer: "EcoStyle Europe" },
  { id: 3, docType: "Minimum Wage Compliance", dueDate: "2026-01-20", status: "Fulfilled", buyer: "Nordic Fashion Hub" },
];

export default function BuyerRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFulfill = (id: number) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: "Fulfilled" } : req
    ));
    setModalOpen(false);
  };

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto">
      <Link href="/vault" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 text-sm font-medium mb-8 transition-colors">
        ← Back to Evidence Vault
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Buyer Requests</h1>
        <p className="text-slate-500 mt-2">Action items required by your business partners and buyers.</p>
      </div>

      <div className="grid gap-6">
        {requests.map((req) => (
          <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-slate-800">{req.docType}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  req.status === "Fulfilled" 
                    ? "bg-green-50 text-green-700 border-green-100" 
                    : "bg-orange-50 text-orange-700 border-orange-100"
                }`}>
                  {req.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Requested by: <span className="text-slate-700">{req.buyer}</span></p>
              <p className="text-sm text-slate-400 font-medium italic">Due by: {req.dueDate}</p>
            </div>

            <div className="mt-4 md:mt-0">
              {req.status === "Pending" ? (
                <button 
                  onClick={() => { setSelectedRequest(req); setModalOpen(true); }}
                  className="w-full md:w-auto bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
                >
                  Fulfill Request
                </button>
              ) : (
                <button disabled className="w-full md:w-auto bg-slate-100 text-slate-400 px-8 py-2.5 rounded-xl font-bold cursor-not-allowed">
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fulfill Action Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        title={`Fulfill: ${selectedRequest?.docType}`}
      >
        <div className="space-y-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            You are fulfilling a request for <span className="font-bold">{selectedRequest?.buyer}</span>. How would you like to provide the evidence?
          </p>
          
          <div className="grid gap-4">
            <button className="text-left p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
              <p className="font-bold text-slate-800 group-hover:text-blue-700">Select from Vault</p>
              <p className="text-xs text-slate-500 mt-1">Pick an existing verified document from your evidence library.</p>
            </button>

            <button className="text-left p-4 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all group">
              <p className="font-bold text-slate-800 group-hover:text-blue-700">Upload New File</p>
              <p className="text-xs text-slate-500 mt-1">Upload a fresh version of the requested document.</p>
            </button>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => handleFulfill(selectedRequest.id)}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
            >
              Confirm Fulfillment
            </button>
            <button 
              onClick={() => setModalOpen(false)}
              className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}