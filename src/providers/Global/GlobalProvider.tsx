import { JSX, useState, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router';

import { User } from 'types';
import { getUser, getUserFromLS, removeUserFromLS, saveUserToLS } from 'actions';
import { useAxiosInterceptors } from 'hooks';
import { GlobalContext } from './GlobalContext';

export const GlobalProvider = ({ children = <Outlet /> }: Props) => {
  const [user, setUser] = useState<User | null>(getUserFromLS());
  const [showPageLoader, setShowPageLoader] = useState(true);
  const [isUserFetched, setIsUserFetched] = useState(false);

  useAxiosInterceptors(() => {
    setUser(null);
    removeUserFromLS();
  });

  const fetchUser = useCallback(async () => {
    try {
      const res = await getUser();
      setUser(res.data);
      setIsUserFetched(true);
      saveUserToLS(res.data);
    } catch {
      // not authenticated
    } finally {
      setShowPageLoader(false);
    }
  }, []);

  useEffect(() => {
    if (!isUserFetched && !!user) {
      fetchUser();
    } else {
      setShowPageLoader(false);
    }
  }, [isUserFetched, user, fetchUser]);

  return (
    <GlobalContext.Provider value={{ user, showPageLoader, setUser, setShowPageLoader, setIsUserFetched }}>
      {children}
    </GlobalContext.Provider>
  );
};

type Props = {
  children?: JSX.Element;
};
