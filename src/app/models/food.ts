import { FoodTypes } from '../interfaces/food-types';
import { IFood } from '../interfaces/ifood';

export class Food implements IFood {
  foodName: string;
  foodCost: number | undefined;
  foodType: FoodTypes;
  description: string;
  foodPic: string;

  constructor(
    foodName: string,
    foodCost: number | undefined,
    foodType: FoodTypes,
    description: string,
    foodPic: string
  ) {
    this.foodName = foodName;
    this.foodCost = foodCost;
    this.foodType = foodType;
    this.description = description;
    this.foodPic = foodPic;
  }
}
