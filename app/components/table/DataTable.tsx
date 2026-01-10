/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface Column {
  header: string;
  accessor: string;
  render?: (item: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export const DataTable = ({ columns, data }: DataTableProps) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="py-4 px-4">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-4 px-4">
                      {col.render ? col.render(item) : item[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-10 text-center text-slate-400">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};