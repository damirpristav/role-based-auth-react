import { ColumnDef, useReactTable, getCoreRowModel, flexRender, Header } from '@tanstack/react-table';

export const Table = <T,>({ data, columns, sortDirection, sortBy, onSort }: Props<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onTableHeadingClick = (header: Header<T, unknown>) => {
    onSort?.(header.column.id);
  };

  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const isSortable = header.column.columnDef.meta?.isSortable ?? false;
              return (
                <th
                  key={header.id}
                  className={`${header.column.columnDef.meta?.headerCellClassName ?? ''} ${
                    isSortable ? 'sortable' : ''
                  }`}
                  onClick={isSortable ? () => onTableHeadingClick(header) : undefined}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {isSortable && sortDirection && sortBy === header.column.id ? (
                    sortDirection === 'asc' ? (
                      <span>&#x25B2;</span>
                    ) : (
                      <span>&#x25BC;</span>
                    )
                  ) : (
                    ''
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className={cell.column.columnDef.meta?.bodyCellClassName}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

type Props<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  sortDirection?: 'desc' | 'asc';
  sortBy?: string;
  onSort?: (key: string) => void;
};
