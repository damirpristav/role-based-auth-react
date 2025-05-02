import * as yup from 'yup';

import { Article, ArticleSaveData } from 'types';

export const validationSchema = yup.object().shape<{ [key in keyof ArticleSaveData]: yup.Schema<any> }>({
  title: yup.string().trim().required('Title is required'),
  content: yup.string().trim().required('Content is required'),
});

export const defaultData = (data: Article | null): ArticleSaveData => {
  return {
    title: data?.title ?? '',
    content: data?.content ?? '',
  };
};
