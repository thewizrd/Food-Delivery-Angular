import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';
import { JwtResponse } from '../interfaces/jwt-response';
import { CustomerRegistrationRequest } from '../models/customer-registration-request';
import { CustomerResponse } from '../interfaces/customer-response';
import { LoginRequest } from '../models/login-request';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth/';
  private userDetails: BehaviorSubject<JwtResponse | null> =
    new BehaviorSubject<JwtResponse | null>(
      this._tokenService.getTokenResponse()
    );

  constructor(
    private _tokenService: TokenStorageService,
    private _httpClient: HttpClient
  ) {}

  createUser(
    request: CustomerRegistrationRequest
  ): Observable<CustomerResponse> {
    return this._httpClient
      .post<CustomerResponse>(this.baseUrl + 'register', request)
      .pipe(catchError(this.errorHandler));
  }

  loginUser(request: LoginRequest): Observable<JwtResponse> {
    return this._httpClient
      .post<JwtResponse>(this.baseUrl + 'login', request)
      .pipe(tap((value) => this.setSession(value)))
      .pipe(catchError(this.errorHandler));
  }

  logout(): void {
    this._tokenService.clearStorage();
    this.userDetails.next(null);
  }

  isLoggedIn(): boolean {
    return !!this._tokenService.getToken();
  }

  isAdmin(): boolean {
    const tokenResp = this._tokenService.getTokenResponse();

    if (tokenResp) {
      console.log(tokenResp.roles);
      return tokenResp.roles.includes('ROLE_ADMIN');
    }

    return false;
  }

  getUserDetails(): Observable<JwtResponse | null> {
    return this.userDetails.asObservable();
  }

  getTokenResponse(): JwtResponse | null {
    return this._tokenService.getTokenResponse();
  }

  private setSession(response: JwtResponse) {
    console.log('logged in; set session');
    this._tokenService.saveToken(response);
    this.userDetails.next(response);
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(() => new Error(error.error.message));
  }
}
