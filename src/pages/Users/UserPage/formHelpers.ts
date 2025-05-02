import * as yup from 'yup';

import { User, UserSaveData } from 'types';

export const validationSchema = ({ isEdit }: { isEdit: boolean }) => yup.object().shape<{ [key in keyof UserSaveData]: yup.Schema<any> }>({
  first_name: yup.string().trim().required('First name is required'),
  last_name: yup.string().trim().required('Last name is required'),
  role: yup.string().trim().required('Role is required'),
  email: yup.string().trim().email().required('Role is required'),
  password: yup.string().trim().test('password-validation', 'Password must be at least 8 characters long', function (value) {
    if (isEdit) {
      if (!value) return true;
      return value.length >= 8;
    } else {
      return !!value && value.length >= 8;
    }
  }),
});

export const defaultData = (data: User | null): UserSaveData => {
  return {
    first_name: data?.first_name ?? '',
    last_name: data?.last_name ?? '',
    role: data?.role ?? '',
    email: data?.email ?? '',
    password: '',
  };
};
