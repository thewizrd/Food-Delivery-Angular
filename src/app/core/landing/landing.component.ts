import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodTypes } from 'src/app/enums/food-types';
import { CartStatusResponse } from 'src/app/interfaces/cart-status-response';
import { FoodResponse } from 'src/app/interfaces/food-response';
import { CartUpdateRequest } from 'src/app/models/cart-update-request';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FoodService } from 'src/app/services/food.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  cart: CartStatusResponse | undefined = undefined;
  foods: FoodResponse[] = [];
  foodTypes: string[] = [];
  selectedFoodType: string = 'All';

  errorMsg: string = '';
  message: string = '';

  constructor(
    private _ref: ChangeDetectorRef,
    private _router: Router,
    private _foodService: FoodService,
    private _authService: AuthService,
    private _customerService: CustomerService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    if (this._authService.isAdmin()) {
      this._router.navigate(['/admin/dashboard']);
      return;
    }

    this._authService.getUserDetails().subscribe({
      next: (user) => {
        if (user == null) {
          this._cartService.getCartDetails().subscribe({
            next: (result) => {
              this.cart = result;
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });

    this._cartService.getCartDetails().subscribe({
      next: (result) => {
        this.cart = result;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._foodService.getAllFoods().subscribe({
      next: (result) => {
        this.errorMsg = '';
        this.foods = result;
      },
      error: (err) => {
        this.errorMsg = err.message;
      },
    });

    this.foodTypes = ['All'].concat(Object.values(FoodTypes));
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

  onClickItem(food: FoodResponse) {
    this._router.navigate(['/food/details', food.foodID]);
  }

  addToCart(foodID: number) {
    this._cartService.addToUserCart(foodID).subscribe({
      next: (result) => {
        this.cart = result;
      },
      error: (err) => {
        alert('Unable to add to cart');
        console.log(err);
      },
    });
  }

  removeFromCart(foodID: number) {
    this._cartService.removeFromUserCart(foodID).subscribe({
      next: (result) => {
        this.cart = result;
      },
      error: (err) => {
        alert('Unable to remove from cart');
        console.log(err);
      },
    });
  }

  isPresentInCart(
    cart: CartStatusResponse | undefined,
    foodID: number
  ): boolean {
    if (cart) {
      return cart.cart.map((food) => food.foodID).includes(foodID);
    }

    return false;
  }
}
