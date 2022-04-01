import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CartStatusResponse } from '../interfaces/cart-status-response';
import { FoodResponse } from '../interfaces/food-response';
import { CartUpdateRequest } from '../models/cart-update-request';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { FoodService } from './food.service';

const CART_KEY = 'user-local-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localCart: Set<number>;
  private cartCount = new BehaviorSubject<number>(0);

  constructor(
    private _customerService: CustomerService,
    private _authService: AuthService,
    private _foodService: FoodService
  ) {
    this.localCart = new Set<number>(this.getLocalCart().cart);

    this._authService.getUserDetails().subscribe({
      next: (result) => {
        if (
          result &&
          result.roles.includes('ROLE_USER') &&
          this.localCart.size > 0
        ) {
          this.mergeLocalCart();
        }
      },
    });
  }

  private clearLocalCart() {
    this.localCart.clear();
    localStorage.removeItem(CART_KEY);
  }

  private getLocalCart(): CartUpdateRequest {
    const resp = localStorage.getItem(CART_KEY);

    if (resp) {
      return JSON.parse(resp, (key, value) => {
        if (key == 'cart') {
          const array = value as number[];
          return new Set<number>(array);
        } else {
          return value;
        }
      });
    }

    return new CartUpdateRequest();
  }

  private saveLocalCart(): void {
    const str = JSON.stringify({ cart: this.localCart }, (key, value) => {
      if (key == 'cart') {
        const set = value as Set<number>;
        return Array.from(set);
      } else {
        return value;
      }
    });
    localStorage.setItem(CART_KEY, str);
  }

  private getLocalCartRequest(): CartUpdateRequest {
    return {
      cart: Array.from(this.localCart),
    } as CartUpdateRequest;
  }

  addToUserCart(foodID: number): Observable<CartStatusResponse> {
    if (this._authService.isLoggedIn()) {
      const tokenResp = this._authService.getTokenResponse();

      if (tokenResp) {
        const userID = tokenResp.id;
        return this._customerService
          .addToUserCart(userID, foodID)
          .pipe(tap((value) => this.cartCount.next(value.cart.length)));
      }

      throw new Error('Unable to get user id');
    } else {
      this.localCart.add(foodID);
      this.saveLocalCart();

      return this._foodService
        .getCartDetails(this.getLocalCartRequest())
        .pipe(
          map<FoodResponse[], CartStatusResponse>((result) => {
            return {
              cart: result,
              status: 'active',
            } as CartStatusResponse;
          })
        )
        .pipe(tap((value) => this.cartCount.next(value.cart.length)));
    }
  }

  removeFromUserCart(foodID: number): Observable<CartStatusResponse> {
    if (this._authService.isLoggedIn()) {
      const tokenResp = this._authService.getTokenResponse();

      if (tokenResp) {
        const userID = tokenResp.id;
        return this._customerService
          .removeFromUserCart(userID, foodID)
          .pipe(tap((value) => this.cartCount.next(value.cart.length)));
      }

      throw new Error('Unable to get user id');
    } else {
      this.localCart.delete(foodID);
      this.saveLocalCart();

      return this._foodService
        .getCartDetails(this.getLocalCartRequest())
        .pipe(
          map<FoodResponse[], CartStatusResponse>((result) => {
            return {
              cart: result,
              status: 'active',
            } as CartStatusResponse;
          })
        )
        .pipe(tap((value) => this.cartCount.next(value.cart.length)));
    }
  }

  getCartDetails(): Observable<CartStatusResponse> {
    if (this._authService.isLoggedIn()) {
      console.log('Logged in');
      const tokenResp = this._authService.getTokenResponse();

      if (tokenResp) {
        const userID = tokenResp.id;
        return this._customerService
          .getUserCart(userID)
          .pipe(tap((result) => this.cartCount.next(result.cart.length)));
      }

      throw new Error('Unable to get user id');
    } else {
      console.log('Logged out');

      return this._foodService
        .getCartDetails(this.getLocalCartRequest())
        .pipe(
          map<FoodResponse[], CartStatusResponse>((result) => {
            return {
              cart: result,
              status: 'active',
            } as CartStatusResponse;
          })
        )
        .pipe(tap((result) => this.cartCount.next(result.cart.length)));
    }
  }

  mergeLocalCart() {
    const tokenResp = this._authService.getTokenResponse();

    if (tokenResp) {
      this._customerService
        .batchAddToUserCart(tokenResp.id, this.getLocalCartRequest())
        .subscribe({
          next: (result) => {
            this.cartCount.next(result.cart.length);
            this.clearLocalCart();
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }
}
