import { User } from "./users";

export type LoginRequestData = {
  email: string;
  password: string;
  remember: boolean;
};

export type AuthResponseData = {
  message: string;
  user: User;
};
