import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [CommonModule, CoreRoutingModule, FormsModule],
  exports: [
    // lists out components to be exported (to the outside world; ~= public)
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    LoginComponent,
  ],
})
export class CoreModule {}
