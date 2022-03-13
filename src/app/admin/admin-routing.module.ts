import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from './add-items/add-items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { UpdateItemsComponent } from './update-items/update-items.component';

const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin/food/add',
    component: AddItemsComponent,
  },
  {
    path: 'admin/food/update/:foodID',
    component: UpdateItemsComponent,
  },
  {
    path: 'admin/food/details/:foodID',
    component: ItemDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
