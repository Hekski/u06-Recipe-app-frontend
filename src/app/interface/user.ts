export interface User {
  id: number;
  data: Data;
  email: string;
  password: string;
}

export interface Data {
    name: string;
    token: string;
}