import axios from 'axios';

export const getCsrfCookie = async (): Promise<void> => {
  return axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};
