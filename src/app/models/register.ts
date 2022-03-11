import { IRegister } from '../interfaces/iregister';
import { Address } from './address';

export class Register implements IRegister {
  email: string;
  password: string;
  name: string;
  address: Address[];
  doj: string;
  roles: string[];

  constructor(
    email: string,
    password: string,
    name: string,
    address: Address[],
    doj: string,
    roles: string[]
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.address = address;
    this.doj = doj;
    this.roles = roles;
  }
}
