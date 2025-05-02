import { useState } from "react";

import { useUsersSwr } from "./useUsersSwr";

export const useUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, mutate } = useUsersSwr({ page: currentPage });

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    isLoading,
    currentPage,
    onPageChange,
    goToNextPage,
    goToPrevPage,
    mutate,
  };
};
