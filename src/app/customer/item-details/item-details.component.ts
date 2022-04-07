import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartStatusResponse } from 'src/app/interfaces/cart-status-response';
import { FoodResponse } from 'src/app/interfaces/food-response';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent implements OnInit {
  cart: CartStatusResponse | undefined = undefined;

  foodID: number = 0;
  foodItem: FoodResponse | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _foodService: FoodService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.foodID = this._route.snapshot.params['foodID'];

    this._foodService.getFoodByID(this.foodID).subscribe((food) => {
      this.foodItem = food;
    });

    this._cartService.getCartDetails().subscribe({
      next: (result) => {
        this.cart = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
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
