import { AddressRequest } from './address-request';

export class CustomerRegistrationRequest {
  email: string | null = null;
  password: string | null = null;
  name: string | null = null;
  address: AddressRequest[] = [];
  roles: string[] = ['user'];

  constructor() {
    this.address.push(new AddressRequest());
  }
}
