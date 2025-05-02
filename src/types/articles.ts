import { UserShort } from './users';

export type Article = {
  id: string;
  title: string;
  content: string;
  user_id: string;
  user: UserShort;
  created_at: Date;
  updated_at: Date;
};

export type ArticleSaveData = {
  title: string;
  content: string;
};
