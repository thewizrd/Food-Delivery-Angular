import { Component, OnInit } from '@angular/core';
import { OrdersResponse } from 'src/app/interfaces/orders-response';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: OrdersResponse[] = [];

  constructor(
    private _authService: AuthService,
    private _customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const tokenResp = this._authService.getTokenResponse();

    if (tokenResp) {
      this._customerService.getUserOrders(tokenResp.id).subscribe({
        next: (result) => {
          this.orders = result;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
