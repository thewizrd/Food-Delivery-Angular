import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { FormsModule } from '@angular/forms';
import { UpdateItemsComponent } from './update-items/update-items.component';

@NgModule({
  declarations: [DashboardComponent, AddItemsComponent, ItemDetailsComponent, UpdateItemsComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
