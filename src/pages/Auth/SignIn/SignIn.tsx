import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';

import { AuthLayout } from 'layouts';
import { useAuthMutation, useGlobalProvider } from 'hooks';
import { LoginRequestData } from 'types';
import { getCsrfCookie, saveUserToLS } from 'actions';
import { Button, Checkbox, Input } from 'components';
import { validationSchema } from './formHelpers';

export const SignIn = () => {
  const { setUser, setIsUserFetched } = useGlobalProvider();
  const { login } = useAuthMutation();

  const onSubmit = async (values: LoginRequestData) => {
    try {
      await getCsrfCookie();
      const res = await login.trigger(values);
      toast.success(res.data.message);
      setUser(res.data.user);
      saveUserToLS(res.data.user);
      setIsUserFetched(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <AuthLayout title="Sign in">
      <Formik<LoginRequestData>
        initialValues={{ email: '', password: '', remember: false }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <p>Enter a valid email address and your password.</p>
            <Input name="email" label="Email address" />
            <Input name="password" label="Password" type="password" />
            <Checkbox name="remember" label="Remember me" />
            <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};
