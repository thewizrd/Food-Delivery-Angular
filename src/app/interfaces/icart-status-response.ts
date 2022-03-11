import { IFoodResponse } from './ifood-response';

export interface ICartStatusResponse {
  cart: IFoodResponse[];
  status: string;
}
