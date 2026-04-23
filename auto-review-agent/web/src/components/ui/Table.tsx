import { type ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | string | ((item: T) => ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export function Table<T extends { id: string | number }>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-slate-50/50">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className={`px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length > 0 ? (
            data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`transition-colors ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : ''}`}
              >
                {columns.map((column, idx) => (
                  <td key={idx} className={`px-6 py-4 text-sm text-primary-dark ${column.className || ''}`}>
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor as keyof T] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-muted italic">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
