import { useState } from "react";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { TriggerWithoutArgs } from "swr/mutation";
import { KeyedMutator } from "swr";

import { PaginatedData } from "types";

export const useEntityDelete = <T,>({ data, currentPage, successMessage, trigger, goToPrevPage, mutate }: Props<T>) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async (callback?: () => void) => {
    try {
      setIsDeleting(true);
      await trigger();
      toast.success(successMessage || 'Entity deleted!');
      if (data && data.last_page === currentPage && data.data.length === 1 && currentPage > 1) {
        goToPrevPage();
      } else {
        await mutate();
      }
      callback?.();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, onDelete };
};

type Props<T> = {
  data: PaginatedData<T> | undefined;
  currentPage: number;
  successMessage?: string;
  trigger: TriggerWithoutArgs<AxiosResponse<any, any>, any, string, never>;
  goToPrevPage: () => void;
  mutate: KeyedMutator<PaginatedData<T>>;
};
