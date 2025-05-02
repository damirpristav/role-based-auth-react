import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router';

import { Button, Input, Select } from 'components';
import { UserRole, UserSaveData } from 'types';
import { PATHS } from 'router/types';
import { useUser, useCreateUserMutation, useUpdateUserMutation } from 'hooks';
import { defaultData, validationSchema } from './formHelpers';

export const UserPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: user, isLoading } = useUser(params.id ?? '');
  const { trigger: create } = useCreateUserMutation();
  const { trigger: update } = useUpdateUserMutation(params.id ?? '');

  const isOnEditPage = !!params.id && params.id !== 'new';

  const onSubmit = async (values: UserSaveData) => {
    try {
      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        role: values.role,
        password: values.password || null,
      };
      if (user) {
        await update(data);
      } else {
        await create(data);
      }
      navigate(PATHS.Users);
      toast.success(`User successfully ${user ? 'updated' : 'created'}`);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="back-btn-wrapper">
        <Button label="Go back" isSmall onClick={() => navigate(PATHS.Users)} />
      </div>
      <h2>{isOnEditPage ? 'Edit user' : 'Create user'}</h2>
      <Formik<UserSaveData>
        initialValues={defaultData(user?.data ?? null)}
        validationSchema={() => validationSchema({ isEdit: isOnEditPage })}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <Input name="first_name" label="First name" />
            <Input name="last_name" label="Last name" />
            <Input name="email" label="Email" />
            <Select
              name="role"
              label="Role"
              options={[
                { label: 'Admin', value: UserRole.Admin },
                { label: 'Editor', value: UserRole.Editor },
              ]}
            />
            <Input name="password" label="Password" type="password" />
            <Button type="submit" label="Save" disabled={isSubmitting} isLoading={isSubmitting} />
          </Form>
        )}
      </Formik>
    </>
  );
};
