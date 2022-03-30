import { FoodTypes } from '../enums/food-types';

export class FoodRequest {
  foodName: string | null = null;
  foodCost: number | null = null;
  foodType: FoodTypes | null = null;
  description: string | null = null;
  foodPic: string | null = null;
}
