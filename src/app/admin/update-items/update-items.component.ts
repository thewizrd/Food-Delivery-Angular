import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodTypes } from 'src/app/interfaces/food-types';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css'],
})
export class UpdateItemsComponent implements OnInit {
  errorMsg: string = '';
  foodID: number = 0;
  foodForm: Food = new Food('', undefined, FoodTypes.Unknown, '', '');
  foodTypes: FoodTypes[] = Object.entries(FoodTypes)
    .map((foodType) => {
      return foodType[1];
    })
    .filter((foodType) => foodType != FoodTypes.Unknown);

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.foodID = this._route.snapshot.params['foodID'];
    this._foodService.getFoodByID(this.foodID).subscribe((food) => {
      this.foodForm = new Food(
        food.foodName,
        food.foodCost,
        food.foodType as FoodTypes,
        food.description,
        food.foodPic
      );
    });
  }

  onBackClicked() {
    this._router.navigate(['/admin/food/details', this.foodID]);
  }

  onSubmit() {
    this._foodService.updateFood(this.foodID, this.foodForm).subscribe({
      next: (food) => {
        this._router.navigate(['/admin/food/details', this.foodID], {
          state: { message: 'Item updated successfully' },
        });
      },
      error: (err) => {
        this.errorMsg = err.message;
      },
    });
  }
}
