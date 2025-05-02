import useSWR from "swr";

import { fetcher } from "config";
import { User } from "types";

export const useUsersSwr = ({ page }: Filters) => {
  const url = `/users?page=${page}`;

  return useSWR(url, fetcher<User>, { revalidateOnFocus: false });
};

type Filters = {
  page: number;
};
