import { Address } from './address';

export interface CustomerResponse {
  id: number;
  email: string;
  name: string;
  doj: string;
  address: Address[];
  roles: string[];
}
