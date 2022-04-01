import { CustomerResponse } from '../interfaces/customer-response';
import { AddressRequest } from './address-request';

export class CustomerUpdateRequest {
  name: string | null = null;
  address: AddressRequest[] = [];

  constructor() {
    this.address.push(new AddressRequest());
  }

  updateFromCustomerProfile(user: CustomerResponse) {
    this.name = user.name;
    if (user.address && user.address.length > 0) {
      this.address = user.address.map((address) => {
        var addr = new AddressRequest();

        addr.houseNo = address.houseNo;
        addr.street = address.street;
        addr.city = address.city;
        addr.state = address.state;
        addr.country = address.country;
        addr.zipCode = address.zipCode;

        return addr;
      });
    }
  }
}
