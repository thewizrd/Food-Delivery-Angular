import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerNavGuard } from '../guards/customer-nav.guard';
import { CartComponent } from './cart/cart.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrdersComponent } from './orders/orders.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

const routes: Routes = [
  {
    path: 'food/details/:foodID',
    component: ItemDetailsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'profile',
    component: UpdateProfileComponent,
    canActivate: [CustomerNavGuard],
  },
  {
    path: 'orders/confirmation',
    component: OrderConfirmationComponent,
    canActivate: [CustomerNavGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [CustomerNavGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
