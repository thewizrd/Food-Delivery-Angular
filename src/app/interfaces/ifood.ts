import { FoodTypes } from './food-types';

export interface IFood {
  foodName: string;
  foodCost: number | undefined;
  foodType: FoodTypes;
  description: string;
  foodPic: string;
}
