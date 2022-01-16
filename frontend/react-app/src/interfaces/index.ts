export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Music {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface PostMusic {
  title: string;
  body: string;
}
