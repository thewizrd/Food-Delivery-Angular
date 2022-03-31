import { FoodTypes } from '../enums/food-types';
import { FoodResponse } from '../interfaces/food-response';

export class FoodRequest {
  foodName: string | null = null;
  foodCost: number | null = null;
  foodType: FoodTypes | null = null;
  description: string | null = null;
  foodPic: string | null = null;

  updateFromResponse(food: FoodResponse) {
    this.foodName = food.foodName;
    this.foodCost = food.foodCost;
    this.foodType = food.foodType;
    this.description = food.description;
    this.foodPic = food.foodPic;
  }
}
