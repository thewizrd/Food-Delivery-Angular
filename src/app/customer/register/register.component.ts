import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';
import { CustomerRegistrationRequest } from 'src/app/models/customer-registration-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new CustomerRegistrationRequest();
  errorMsg: string = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this._authService.createUser(this.registerForm).subscribe({
      next: (result) => {
        this._router.navigate(['/login'], {
          state: { message: 'Registration successful' },
        });
      },
      error: (err) => {
        this.errorMsg = err.message;
        console.log(err);
      },
    });
  }
}
