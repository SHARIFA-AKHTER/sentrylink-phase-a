export const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-500 md:hidden">SentryLink</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
          AD
        </div>
        <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin User</span>
      </div>
    </header>
  );
};