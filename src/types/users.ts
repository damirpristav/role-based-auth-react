export enum UserRole {
  Admin = 'admin',
  Editor = 'editor',
}

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  email: string;
  email_verified_at: string | null;
  created_at: Date;
  updated_at: Date;
};

export type UserSaveData = {
  first_name: string;
  last_name: string;
  role: UserRole | '';
  email: string;
  password: string | null;
};

export type UserShort = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
};
