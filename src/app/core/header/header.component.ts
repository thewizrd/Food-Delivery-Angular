import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  userEmail: string | null = null;
  isAdmin: boolean = false;
  cartCount: number = 0;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this._authService.isLoggedIn();
    this._authService.getUserDetails().subscribe((jwtToken) => {
      if (jwtToken == null) {
        this.loggedIn = false;
        this.userEmail = '';
        this.isAdmin = false;
      } else {
        this.loggedIn = true;
        this.userEmail = jwtToken.email;
        this.isAdmin = jwtToken.roles.includes('ROLE_ADMIN');
      }
    });

    this._cartService.getCartCount().subscribe({
      next: (result) => {
        this.cartCount = result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
