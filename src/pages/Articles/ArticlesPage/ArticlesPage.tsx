import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useArticles, useDeleteArticleMutation, useEntityDelete } from 'hooks';
import { Button, Modal, Table } from 'components';
import { Article } from 'types';
import { PATHS } from 'router/types';
import { columns } from './columns';

export const ArticlesPage = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, currentPage, goToPrevPage, goToNextPage, mutate } = useArticles();
  const { trigger: triggerDelete } = useDeleteArticleMutation(selectedArticle?.id ?? '');

  const { isDeleting, onDelete } = useEntityDelete<Article>({
    data,
    currentPage,
    successMessage: 'Article deleted!',
    mutate,
    trigger: triggerDelete,
    goToPrevPage,
  });

  return (
    <>
      <div className="page-title-wrapper">
        <h1>Articles</h1>
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
            <Table<Article>
              data={data?.data ?? []}
              columns={columns({
                onEdit: (article) => navigate(`${PATHS.Articles}/${article.id}`),
                onDelete: (article) => setSelectedArticle(article),
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

      {!!selectedArticle && (
        <Modal onClose={() => setSelectedArticle(null)}>
          {({ onModalClose }) => (
            <div>
              <h2>Delete Article</h2>
              <p>Are you sure you want to delete article "{selectedArticle.title}" ?</p>
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
