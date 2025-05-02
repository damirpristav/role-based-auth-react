import { JSX } from 'react';
import { Link, Navigate, Outlet } from 'react-router';

import { useGlobalProvider } from 'hooks';
import { PATHS } from 'router/types';

export const PublicLayout = ({ children = <Outlet /> }: Props) => {
  const { user, showPageLoader } = useGlobalProvider();

  if (user) {
    return <Navigate to={PATHS.Dashboard} />;
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
          <Link to={PATHS.Dashboard} className="header__logo">
            <p>Laravel/React Auth</p>
          </Link>
        </div>
      </header>
      <div className="public-wrapper">{children}</div>
    </>
  );
};

type Props = {
  children?: JSX.Element;
};
