import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">SentryLink Phase A Task</h1>
        <p className="text-slate-500 max-w-md mx-auto">
          Frontend Developer Assessment: Evidence Vault & Fulfillment UI.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link 
            href="/vault" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg
             font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            Go to Screen A: Evidence Vault
          </Link>
          <Link 
            href="/todo" 
            className="bg-white border border-slate-200 px-6 py-3 
            rounded-lg font-medium hover:bg-slate-50 transition-all"
          >
            Go to Screen C: Buyer Requests
          </Link>
        </div>
      </div>
    </div>
  );
}