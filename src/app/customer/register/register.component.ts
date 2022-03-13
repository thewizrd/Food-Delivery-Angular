import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: Register = new Register(
    '',
    '',
    '',
    [
      {
        houseNo: undefined,
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: undefined,
      },
    ],
    formatDate(new Date(), 'yyyy-MM-dd', 'en_US'),
    ['user']
  );
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
