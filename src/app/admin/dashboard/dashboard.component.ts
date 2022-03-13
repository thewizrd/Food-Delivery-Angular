import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFoodResponse } from 'src/app/interfaces/ifood-response';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  foods: IFoodResponse[] = [];
  foodTypes: string[] = [];
  selectedFoodType: string = 'All';
  errorMsg: string = '';
  message: string = '';

  constructor(private _router: Router, private _foodService: FoodService) {}

  ngOnInit(): void {
    this.message =
      this._router.getCurrentNavigation()?.extras?.state?.['message'];

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
    this.selectedFoodType = event.target.dataset.value;

    if (this.selectedFoodType === 'All') {
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
      this._foodService.getFoodsByType(this.selectedFoodType).subscribe({
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

  onClickAddItem() {
    this._router.navigate(['/admin/food/add']);
  }
}
