import { createContext, Dispatch, SetStateAction } from 'react';

import { User } from 'types';

type GlobalContextProps = {
  user: User | null;
  showPageLoader: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setShowPageLoader: Dispatch<SetStateAction<boolean>>;
  setIsUserFetched: Dispatch<SetStateAction<boolean>>;
};

export const GlobalContext = createContext<GlobalContextProps>(undefined!);
