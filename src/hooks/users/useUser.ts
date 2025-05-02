import useSWR from 'swr';

import { fetcherSingle } from 'config';
import { User } from 'types';

export const useUser = (id: string) => {
  return useSWR(id && id !== 'new' ? `/users/${id}` : null, fetcherSingle<User>, { revalidateOnFocus: false });
};
