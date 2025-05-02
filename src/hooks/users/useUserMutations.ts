import useSWRMutation from "swr/mutation";

import { api } from "config";
import { UserSaveData } from "types";

const ROUTE = '/users';

async function createUser(url: string, { arg }: { arg: UserSaveData }) {
  return await api.post(url, arg);
}

async function updateUser(url: string, { arg }: { arg: UserSaveData }) {
  return await api.put(url, arg);
}

async function deleteUser(url: string) {
  return await api.delete(url);
}

export const useCreateUserMutation = () => {
  return useSWRMutation(ROUTE, createUser);
};

export const useUpdateUserMutation = (id: string) => {
  return useSWRMutation(`${ROUTE}/${id}`, updateUser);
};

export const useDeleteUserMutation = (id: string) => {
  return useSWRMutation(`${ROUTE}/${id}`, deleteUser);
};
