import useSWR from "swr";

import { fetcher } from "config";
import { Article } from "types";

export const useArticlesSwr = ({ page }: Filters) => {
  const url = `/articles?page=${page}`;

  return useSWR(url, fetcher<Article>, { revalidateOnFocus: false });
};

type Filters = {
  page: number;
};
