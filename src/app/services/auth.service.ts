import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IRegister } from '../interfaces/iregister';
import { ICustomerResponse } from '../interfaces/icustomer-response';
import { ILogin } from '../interfaces/ilogin';
import { IJwtResponse } from '../interfaces/ijwt-response';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth/';
  private userDetails: BehaviorSubject<IJwtResponse | null> =
    new BehaviorSubject<IJwtResponse | null>(
      this._tokenService.getTokenResponse()
    );

  constructor(
    private _tokenService: TokenStorageService,
    private _httpClient: HttpClient
  ) {}

  createUser(request: IRegister): Observable<ICustomerResponse[]> {
    return this._httpClient
      .post<ICustomerResponse[]>(this.baseUrl + 'register', request)
      .pipe(catchError(this.errorHandler));
  }

  loginUser(request: ILogin): Observable<IJwtResponse> {
    return this._httpClient
      .post<IJwtResponse>(this.baseUrl + 'login', request)
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

  getUserDetails(): Observable<IJwtResponse | null> {
    return this.userDetails.asObservable();
  }

  private setSession(response: IJwtResponse) {
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
