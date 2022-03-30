import { FoodResponse } from './food-response';

export interface CartStatusResponse {
  cart: FoodResponse[];
  status: string;
}
