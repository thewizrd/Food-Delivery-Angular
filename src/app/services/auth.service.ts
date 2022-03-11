import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IRegister } from '../interfaces/iregister';
import { ICustomerResponse } from '../interfaces/icustomer-response';
import { ILogin } from '../interfaces/ilogin';
import { IJwtResponse } from '../interfaces/ijwt-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth/';

  constructor(private _httpClient: HttpClient) {}

  createUser(request: IRegister): Observable<ICustomerResponse[]> {
    return this._httpClient
      .post<ICustomerResponse[]>(this.baseUrl + 'register', request)
      .pipe(catchError(this.errorHandler));
  }

  loginUser(request: ILogin): Observable<IJwtResponse> {
    return this._httpClient
      .post<IJwtResponse>(this.baseUrl + 'login', request)
      .pipe(catchError(this.errorHandler));
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
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
