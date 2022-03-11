import { FoodTypes } from '../interfaces/food-types';
import { IFood } from '../interfaces/ifood';

export class Food implements IFood {
  foodID: number;
  foodName: string;
  foodCost: number;
  foodType: FoodTypes;
  description: string;
  foodPic: string;

  constructor(
    foodID: number,
    foodName: string,
    foodCost: number,
    foodType: FoodTypes,
    description: string,
    foodPic: string
  ) {
    this.foodID = foodID;
    this.foodName = foodName;
    this.foodCost = foodCost;
    this.foodType = foodType;
    this.description = description;
    this.foodPic = foodPic;
  }
}
