import * as yup from 'yup';

import { LoginRequestData } from 'types';

export const validationSchema = yup.object().shape<{ [key in keyof LoginRequestData]: yup.Schema<any> }>({
  email: yup.string().trim().required('Email is required').email('Email is invalid'),
  password: yup
    .string()
    .trim()
    .strict()
    .required('Password is required')
    .min(8, 'Password must have at least 8 characters'),
  remember: yup.bool(),
});
