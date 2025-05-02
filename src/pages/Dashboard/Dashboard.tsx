import { useGlobalProvider } from 'hooks';

export const Dashboard = () => {
  const { user } = useGlobalProvider();

  return <h1>Welcome {user?.first_name}</h1>;
};
