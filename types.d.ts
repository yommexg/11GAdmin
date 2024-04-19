export interface User {
  email?: string;
  phoneNumber?: string;
  status?: number;
  username?: string;
  avatar?: string;
}

export enum UserRole {
  ADMIN = 5150,
  USER = 2001,
}
