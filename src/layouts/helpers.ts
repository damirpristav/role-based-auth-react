import { PATHS } from 'router/types';
import { NavigationItem, UserRole } from 'types';

export const getNavigationItems = (role: UserRole): NavigationItem[] => {
  if (role === UserRole.Editor) {
    return [
      { path: PATHS.Dashboard, label: 'Dashboard' },
      { path: PATHS.Articles, label: 'Articles' },
    ];
  }

  return [
    { path: PATHS.Dashboard, label: 'Dashboard' },
    { path: PATHS.Articles, label: 'Articles' },
    { path: PATHS.Users, label: 'Users' },
  ];
};
