import useSWR from 'swr';

import { fetcherSingle } from 'config';
import { Article } from 'types';

export const useArticle = (id: string) => {
  return useSWR(id && id !== 'new' ? `/articles/${id}` : null, fetcherSingle<Article>, { revalidateOnFocus: false });
};
