export const Footer = () => {
  return (
    <footer className="mt-auto py-6 px-8 border-t border-slate-200 bg-white/50 text-slate-500">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-medium">
          © {new Date().getFullYear()} <span className="text-blue-600 font-bold">SentryLink</span>. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
        </div>
      </div>
    </footer>
  );
};