import { IAddress } from '../interfaces/iaddress';

export class Address implements IAddress {
  houseNo: number;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;

  constructor(
    houseNo: number,
    street: string,
    city: string,
    state: string,
    country: string,
    zipCode: number
  ) {
    this.houseNo = houseNo;
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zipCode = zipCode;
  }
}
