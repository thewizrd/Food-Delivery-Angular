import { ICart } from '../interfaces/icart';

export class Cart implements ICart {
  cart: number[] = [];
}
