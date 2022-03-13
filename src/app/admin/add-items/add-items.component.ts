import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTypes } from 'src/app/interfaces/food-types';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  errorMsg: string = '';
  foodForm: Food = new Food('', undefined, FoodTypes.Unknown, '', '');
  foodTypes: FoodTypes[] = Object.entries(FoodTypes)
    .map((foodType) => {
      return foodType[1];
    })
    .filter((foodType) => foodType != FoodTypes.Unknown);

  constructor(private _router: Router, private _foodService: FoodService) {}

  ngOnInit(): void {}

  onSubmit() {
    this._foodService.addFood(this.foodForm).subscribe({
      next: (food) => {
        this._router.navigate(['/admin/dashboard'], {
          state: { message: 'Item added successfully' },
        });
      },
      error: (err) => {
        this.errorMsg = err.message;
      },
    });
  }
}
