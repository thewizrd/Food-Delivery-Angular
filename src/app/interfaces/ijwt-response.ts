export interface IJwtResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  roles: string[];
}
