import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerUpdateRequest } from 'src/app/models/customer-update-request';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  userID: number | undefined;
  profileForm = new CustomerUpdateRequest();
  emailAddr: string | undefined;
  errorMsg: string = '';

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const tokenResp = this._authService.getTokenResponse();

    if (tokenResp) {
      this.userID = tokenResp.id;
      this.emailAddr = tokenResp.email;

      this._customerService.getUserByID(this.userID).subscribe({
        next: (result) => {
          this.profileForm.updateFromCustomerProfile(result);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  onSubmit(): void {
    console.log(this.profileForm);

    if (this.userID) {
      this._customerService
        .updateUser(this.userID, this.profileForm)
        .subscribe({
          next: (result) => {
            alert('Profile updated successfully');
            this._router.navigate(['/']);
          },
          error: (err) => {
            this.errorMsg = err.message;
            console.log(err);
          },
        });
    }
  }
}
