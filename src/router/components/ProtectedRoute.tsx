import { Outlet, Navigate } from "react-router";

import { UserRole } from "types";
import { useGlobalProvider } from "hooks";
import { PATHS } from "router/types";

export const ProtectedRoute = ({ roles }: Props) => {
  const { user } = useGlobalProvider();

  if (!!user && !roles.includes(user.role)) {
    return <Navigate to={PATHS.Dashboard} />;
  }

  return <Outlet />
};

type Props = {
  roles: UserRole[];
};
