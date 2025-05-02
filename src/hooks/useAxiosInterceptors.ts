import { useEffect } from "react";

import { api } from "config";

export const useAxiosInterceptors = (unauthorizedAction: () => void) => {
  useEffect(() => {
    api.interceptors.response.use((response) => response, (error) => {
      if (error?.response?.status === 401) {
        unauthorizedAction();
      }
      return Promise.reject(error);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
