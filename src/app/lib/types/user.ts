// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AUTH_ROLES = [
  'admin', // Admin role
  'user', // Base user role
] as const;

export type UserRoles = (typeof AUTH_ROLES)[number];

export interface User {
  id: string;
  username: string;
  email: string;
  roles: UserRoles[];
  token: string;
}
