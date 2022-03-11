import { FoodTypes } from './food-types';

export interface IFood {
  foodID: number;
  foodName: string;
  foodCost: number;
  foodType: FoodTypes;
  description: string;
  foodPic: string;
}
