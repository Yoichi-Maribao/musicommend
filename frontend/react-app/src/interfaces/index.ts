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
  id: number | null;
  uid: string;
  provider: string;
  email: string;
  name: string;
  introduction?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date | null;
  updated_at: Date | null;
}

export interface Music {
  id: number | null;
  userId: number | null;
  title: string;
  body: string;
}

export interface PostMusic {
  userId: number | null;
  title: string;
  body: string;
}
