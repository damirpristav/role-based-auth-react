import { createColumnHelper } from '@tanstack/react-table';

import { Article } from 'types';

const columnHelper = createColumnHelper<Article>();

export const columns = ({ onEdit, onDelete }: ColumnsParameters) => [
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('user', {
    header: 'Created by',
    cell: ({ getValue }) => {
      const { first_name, last_name } = getValue();
      return `${first_name} ${last_name}`;
    },
  }),
  columnHelper.display({
    id: 'actions',
    meta: {
      headerCellClassName: 'align-right',
      bodyCellClassName: 'align-right',
    },
    cell: ({ row }) => {
      return (
        <div className="actions">
          <button type="button" onClick={() => onEdit(row.original)}>
            edit
          </button>
          <button type="button" onClick={() => onDelete(row.original)} className="delete">
            delete
          </button>
        </div>
      );
    },
  }),
];

type ColumnsParameters = {
  onEdit: (entity: Article) => void;
  onDelete: (entity: Article) => void;
};
