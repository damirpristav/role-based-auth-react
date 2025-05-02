import useSWRMutation from 'swr/mutation';

import { api } from 'config';
import { LoginRequestData } from 'types';

async function login(url: string, { arg }: { arg: LoginRequestData }) {
  return await api.post(url, arg);
}

async function logout(url: string) {
  return await api.post(url);
}

export const useAuthMutation = () => {
  return {
    login: useSWRMutation('/login', login),
    logout: useSWRMutation('/logout', logout),
  };
};
