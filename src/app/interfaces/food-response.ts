import { FoodTypes } from '../enums/food-types';

export interface FoodResponse {
  foodID: number;
  foodName: string;
  foodCost: number;
  foodType: FoodTypes;
  description: string;
  foodPic: string;
}
