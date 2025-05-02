import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router';

import { Button, Input, TextEditor } from 'components';
import { ArticleSaveData } from 'types';
import { PATHS } from 'router/types';
import { useArticle, useCreateArticleMutation, useUpdateArticleMutation } from 'hooks';
import { defaultData, validationSchema } from './formHelpers';

export const ArticlePage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: article, isLoading } = useArticle(params.id ?? '');
  const { trigger: create } = useCreateArticleMutation();
  const { trigger: update } = useUpdateArticleMutation(params.id ?? '');

  const isOnEditPage = !!params.id && params.id !== 'new';

  const onSubmit = async (values: ArticleSaveData) => {
    try {
      if (article) {
        await update(values);
      } else {
        await create(values);
      }
      navigate(PATHS.Articles);
      toast.success(`Article successfully ${article ? 'updated' : 'created'}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="back-btn-wrapper">
        <Button label="Go back" isSmall onClick={() => navigate(PATHS.Articles)} />
      </div>
      <h2>{isOnEditPage ? 'Edit article' : 'Create article'}</h2>
      <Formik<ArticleSaveData>
        initialValues={defaultData(article?.data ?? null)}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Input name="title" label="Title" />
            <TextEditor name="content" label="Content" />
            <Button type="submit" label="Save" disabled={isSubmitting} isLoading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </>
  );
};
