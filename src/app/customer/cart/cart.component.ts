import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartStatusResponse } from 'src/app/interfaces/cart-status-response';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: CartStatusResponse | undefined = undefined;
  cartTotal: number = 0;

  constructor(
    private _cartService: CartService,
    private _authService: AuthService,
    private _customerService: CustomerService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._cartService.getCartDetails().subscribe({
      next: (result) => {
        this.updateCartItems(result);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCartItems(result: CartStatusResponse) {
    this.cart = result;

    var total = 0;

    if (result && result.cart.length > 0) {
      result.cart.forEach((ci) => {
        total += ci.foodCost;
      });
    }

    this.cartTotal = total;
  }

  removeFromCart(foodID: number) {
    this._cartService.removeFromUserCart(foodID).subscribe({
      next: (result) => {
        this.updateCartItems(result);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  continueShopping() {
    this._router.navigate(['/']);
  }

  checkout() {
    if (this._authService.isLoggedIn()) {
      const tokenResp = this._authService.getTokenResponse();

      if (tokenResp) {
        this._cartService.checkoutUserCart(tokenResp.id).subscribe({
          next: (result) => {
            this._router.navigate(['/orders/confirmation'], {
              state: { order: result },
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        throw new Error('User not logged in');
      }
    } else {
      this._router.navigate(['/login']);
    }
  }
}
