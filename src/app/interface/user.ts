export interface User {
  id: number;
  data: Data;
  email: string;
  password: string;
  confirm_password: string;
}

export interface Data {
    name: string;
    token: string;
}