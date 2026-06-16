

const Table = ({
  headers = [],
  data = [],
  onRowClick,
  emptyMessage = "Tidak ada data tersedia.",
  className = ""
}) => {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-[var(--color-primary-light)] bg-[var(--color-surface)] ${className}`}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-primary-light)] bg-[var(--color-tertiary)]">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-accent-text/60"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-xs text-accent-text">
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="px-6 py-10 text-center text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition duration-150 ${
                  onRowClick ? "hover:bg-accent-bg cursor-pointer" : "hover:bg-gray-50/50"
                }`}
              >
                {headers.map((header, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                    {header.render ? header.render(row[header.key], row) : row[header.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
