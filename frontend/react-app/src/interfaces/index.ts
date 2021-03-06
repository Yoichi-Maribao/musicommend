export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInParams {
  name: string;
  password: string;
}

export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  introduction: string | null;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Music {
  id: number | null;
  user_id: number | null;
  title: string;
  body: string;
}

export interface PostMusic {
  user_id: number;
  title: string;
  body: string;
}
