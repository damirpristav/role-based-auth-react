import { createColumnHelper } from '@tanstack/react-table';

import { User } from 'types';

const columnHelper = createColumnHelper<User>();

export const columns = ({ loggedInUser, onEdit, onDelete }: ColumnsParameters) => [
  columnHelper.accessor('first_name', {
    header: 'First name',
  }),
  columnHelper.accessor('last_name', {
    header: 'Last name',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
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
          {loggedInUser?.id !== row.original.id && (
            <button type="button" onClick={() => onDelete(row.original)} className="delete">
              delete
            </button>
          )}
        </div>
      );
    },
  }),
];

type ColumnsParameters = {
  loggedInUser: User | null;
  onEdit: (entity: User) => void;
  onDelete: (entity: User) => void;
};
