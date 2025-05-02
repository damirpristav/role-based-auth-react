import useSWRMutation from "swr/mutation";

import { api } from "config";
import { ArticleSaveData } from "types";

const ROUTE = '/articles';

async function createArticle(url: string, { arg }: { arg: ArticleSaveData }) {
  return await api.post(url, arg);
}

async function updateArticle(url: string, { arg }: { arg: ArticleSaveData }) {
  return await api.put(url, arg);
}

async function deleteArticle(url: string) {
  return await api.delete(url);
}

export const useCreateArticleMutation = () => {
  return useSWRMutation(ROUTE, createArticle);
};

export const useUpdateArticleMutation = (id: string) => {
  return useSWRMutation(`${ROUTE}/${id}`, updateArticle);
};

export const useDeleteArticleMutation = (id: string) => {
  return useSWRMutation(`${ROUTE}/${id}`, deleteArticle);
};
