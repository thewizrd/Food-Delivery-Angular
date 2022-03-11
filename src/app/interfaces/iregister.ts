import { IAddress } from './iaddress';

export interface IRegister {
  email: string;
  password: string;
  name: string;
  address: IAddress[];
  doj: string;
  roles: string[];
}
