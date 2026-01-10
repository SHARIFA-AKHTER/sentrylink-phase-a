
export const StatusChip = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Active: "bg-green-100 text-green-700 border-green-200",
    "Expiring Soon": "bg-yellow-100 text-yellow-700 border-yellow-200",
    Expired: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {status}
    </span>
  );
};