import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFoodResponse } from 'src/app/interfaces/ifood-response';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  foodID: number = 0;
  foodItem: IFoodResponse | undefined;
  errorMsg: string = '';
  message: string = '';

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.message =
      this._router.getCurrentNavigation()?.extras?.state?.['message'];

    this.foodID = this._route.snapshot.params['foodID'];
    this._foodService.getFoodByID(this.foodID).subscribe((food) => {
      this.foodItem = food;
    });
  }

  onBackClicked() {
    this._router.navigate(['/admin/dashboard']);
  }

  updateItem() {
    if (this.foodID) {
      this._router.navigate(['/admin/food/update', this.foodID]);
    }
  }

  deleteItem() {
    if (this.foodID) {
      this._foodService.deleteFood(this.foodID).subscribe({
        next: () => {
          this._router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          this.errorMsg = err.message;
        },
      });
    }
  }
}
