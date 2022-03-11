import { IAddress } from './iaddress';

export interface ICustomerResponse {
  id: number;
  email: string;
  name: string;
  doj: string;
  address: IAddress[];
  roles: string[];
}
