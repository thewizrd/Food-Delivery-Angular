import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTypes } from 'src/app/enums/food-types';
import { FoodRequest } from 'src/app/models/food-request';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent implements OnInit {
  errorMsg: string = '';
  foodForm = new FoodRequest();
  foodTypes: FoodTypes[] = Object.values(FoodTypes);

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
