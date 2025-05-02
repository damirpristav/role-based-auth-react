import { User } from "types";

const USER_KEY = 'user';

export const getUserFromLS = (): User | null => {
  const user = localStorage.getItem(USER_KEY);
  if (!user) return null;
  return JSON.parse(user) as User;
};

export const saveUserToLS = (data: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(data));
};

export const removeUserFromLS = () => {
  localStorage.removeItem(USER_KEY);
};
