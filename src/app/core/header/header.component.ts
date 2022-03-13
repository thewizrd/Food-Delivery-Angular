import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  userEmail: string | null = null;
  isAdmin: boolean = false;

  constructor(
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _authService: AuthService
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
  }

  logout(): void {
    this._authService.logout();
    this._router.navigate(['/']);
  }
}
