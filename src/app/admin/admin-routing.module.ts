import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminNavGuard } from '../guards/admin-nav.guard';
import { AddItemsComponent } from './add-items/add-items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { UpdateItemsComponent } from './update-items/update-items.component';

const routes: Routes = [
  {
    path: 'admin',
    canActivateChild: [AdminNavGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'food/add',
        component: AddItemsComponent,
      },
      {
        path: 'food/update/:foodID',
        component: UpdateItemsComponent,
      },
      {
        path: 'food/details/:foodID',
        component: ItemDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
