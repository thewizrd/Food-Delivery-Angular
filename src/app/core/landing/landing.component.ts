import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFoodResponse } from 'src/app/interfaces/ifood-response';
import { AuthService } from 'src/app/services/auth.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  foods: IFoodResponse[] = [];
  foodTypes: string[] = [];
  selectedFoodType: string = 'All';
  errorMsg: string = '';
  message: string = '';

  constructor(
    private _router: Router,
    private _foodService: FoodService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this._authService.isAdmin()) {
      this._router.navigate(['/admin/dashboard']);
      return;
    }

    this._foodService.getAllFoods().subscribe({
      next: (result) => {
        this.errorMsg = '';
        this.foods = result;
      },
      error: (err) => {
        this.errorMsg = err.message;
      },
    });

    this._foodService.getFoodTypes().subscribe({
      next: (result) => {
        this.errorMsg = '';

        var tmp = ['All'];
        tmp.push(...result);
        this.foodTypes = tmp;
      },
      error: (err) => {
        this.errorMsg = err.message;
      },
    });
  }

  foodTypeSelected(event: any) {
    console.log(event);
    var foodType: string = event.target.dataset.value;

    if (foodType === 'All') {
      this._foodService.getAllFoods().subscribe({
        next: (result) => {
          this.errorMsg = '';

          this.foods = result;
        },
        error: (err) => {
          this.errorMsg = err.message;
        },
      });
    } else {
      this._foodService.getFoodsByType(foodType).subscribe({
        next: (result) => {
          this.errorMsg = '';
          this.foods = result;
        },
        error: (err) => {
          this.errorMsg = err.message;
        },
      });
    }
  }

  onClickItem(food: IFoodResponse) {
    this._router.navigate(['/food/details', food.foodID]);
  }
}
