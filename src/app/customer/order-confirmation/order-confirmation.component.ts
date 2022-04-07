import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersResponse } from 'src/app/interfaces/orders-response';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent implements OnInit {
  orderDetails: OrdersResponse | undefined = undefined;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    const navState = this._router.getCurrentNavigation()?.extras.state;

    if (navState) {
      this.orderDetails = navState['order'];
    }
  }

  ngOnInit(): void {
    if (!this.orderDetails) {
      this._router.navigate(['orders']);
    }
  }
}
