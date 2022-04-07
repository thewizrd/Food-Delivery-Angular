import { Address } from './address';
import { FoodResponse } from './food-response';

export interface OrdersResponse {
  orderID: number;
  orderDate: string;
  address: Address;
  orderItems: FoodResponse[];
  orderTotal: number;
}
