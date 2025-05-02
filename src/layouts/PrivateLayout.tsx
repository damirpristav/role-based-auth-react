import { JSX, useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

import { useGlobalProvider, useAuthMutation } from 'hooks';
import { PATHS } from 'router/types';
import { Button } from 'components';
import { removeUserFromLS } from 'actions';
import { getNavigationItems } from './helpers';

export const PrivateLayout = ({ children = <Outlet /> }: Props) => {
  const { user, showPageLoader, setUser } = useGlobalProvider();
  const [isLoading, setIsLoading] = useState(false);

  const { logout } = useAuthMutation();

  const onLogout = async () => {
    try {
      setIsLoading(true);
      await logout.trigger();
      setUser(null);
      removeUserFromLS();
      toast.success('Successfully logged out!');
      // clear cached data
      mutate(() => true, undefined, { revalidate: false });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <Navigate to={PATHS.SignIn} />;
  }

  return (
    <>
      {showPageLoader && (
        <div className="page-loading">
          <div className="loader"></div>
        </div>
      )}
      <header className="header">
        <div className="container">
          <nav className="top-navigation">
            {getNavigationItems(user.role).map((item) => (
              <Link to={item.path} key={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header__actions">
            <Button
              label="Logout"
              type="button"
              variant="outline-light"
              isSmall
              onClick={onLogout}
              isLoading={isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
      </header>
      <div className="container">{children}</div>
    </>
  );
};

type Props = {
  children?: JSX.Element;
};
