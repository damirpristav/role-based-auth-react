import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useUsers, useGlobalProvider, useDeleteUserMutation, useEntityDelete } from 'hooks';
import { Button, Modal, Table } from 'components';
import { User } from 'types';
import { PATHS } from 'router/types';
import { columns } from './columns';

export const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, currentPage, goToPrevPage, goToNextPage, mutate } = useUsers();
  const { trigger: triggerDelete } = useDeleteUserMutation(selectedUser?.id ?? '');
  const { user: loggedInUser } = useGlobalProvider();

  const { isDeleting, onDelete } = useEntityDelete<User>({
    data,
    currentPage,
    successMessage: 'User deleted!',
    mutate,
    trigger: triggerDelete,
    goToPrevPage,
  });

  return (
    <>
      <div className="page-title-wrapper">
        <h1>Users</h1>
        <Button label="New" onClick={() => navigate('new')} />
      </div>
      <div className="data-wrapper">
        <div className="table-wrapper">
          {isLoading && (
            <div className="loading-wrapper">
              <p>Loading...</p>
            </div>
          )}
          <div className="table-container">
            <Table<User>
              data={data?.data ?? []}
              columns={columns({
                loggedInUser,
                onEdit: (user) => navigate(`${PATHS.Users}/${user.id}`),
                onDelete: (user) => setSelectedUser(user),
              })}
            />
          </div>
        </div>
        {data && data.last_page > 1 && (
          <div className="pagination">
            <Button label="prev" onClick={goToPrevPage} disabled={data && data.current_page === 1} isSmall />
            <Button label="next" onClick={goToNextPage} disabled={data && data.last_page === currentPage} isSmall />
          </div>
        )}
      </div>

      {!!selectedUser && (
        <Modal onClose={() => setSelectedUser(null)}>
          {({ onModalClose }) => (
            <div>
              <h2>Delete User</h2>
              <p>Are you sure you want to delete user "{selectedUser.email}" ?</p>
              <div className="modal-actions">
                <Button label="Cancel" variant="outline" disabled={isDeleting} onClick={() => onModalClose()} />
                <Button
                  label="Delete"
                  variant="danger"
                  onClick={() => onDelete(onModalClose)}
                  disabled={isDeleting}
                  isLoading={isDeleting}
                />
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};
