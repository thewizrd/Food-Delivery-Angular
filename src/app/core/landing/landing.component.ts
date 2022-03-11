import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IFood } from 'src/app/interfaces/ifood';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [FoodService],
})
export class LandingComponent implements OnInit {
  foods: IFood[] = [];
  foodTypes: string[] = [];
  errorMsg: string = '';

  constructor(private _foodService: FoodService) {}

  ngOnInit(): void {
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
}
