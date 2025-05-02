/// <reference types="vite/client" />
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    headerCellClassName?: string;
    bodyCellClassName?: string;
    isSortable?: boolean;
  }
}
