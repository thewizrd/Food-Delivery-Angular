import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new LoginRequest();
  message: string = '';
  errorMsg: string = '';

  constructor(private _router: Router, private _authService: AuthService) {}

  ngOnInit(): void {
    this.message =
      this._router.getCurrentNavigation()?.extras?.state?.['message'];

    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/']);
    }
  }

  login(): void {
    this._authService.loginUser(this.loginForm).subscribe({
      next: (result) => {
        var roles = result.roles;
        if (roles.includes('ROLE_ADMIN')) {
          this._router.navigate(['/admin/dashboard']);
        } else {
          this._router.navigate(['/']);
        }
      },
      error: (err) => {
        this.errorMsg = err.message;
      },
    });
  }
}
