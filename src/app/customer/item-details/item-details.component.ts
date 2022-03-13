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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _foodService: FoodService
  ) {}

  ngOnInit(): void {
    this.foodID = this._route.snapshot.params['foodID'];
    this._foodService.getFoodByID(this.foodID).subscribe((food) => {
      this.foodItem = food;
    });
  }
}
