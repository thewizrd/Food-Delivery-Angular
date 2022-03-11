import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ICustomerResponse } from '../interfaces/icustomer-response';
import { IRegister } from '../interfaces/iregister';
import { ICartStatusResponse } from '../interfaces/icart-status-response';
import { ICart } from '../interfaces/icart';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/users/';

  constructor(private _httpClient: HttpClient) {}

  getAllUsers(): Observable<ICustomerResponse[]> {
    return this._httpClient
      .get<ICustomerResponse[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }

  getUserByID(id: number): Observable<ICustomerResponse> {
    return this._httpClient
      .get<ICustomerResponse>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  updateUser(id: number, user: IRegister): Observable<ICustomerResponse> {
    return this._httpClient
      .post<ICustomerResponse>(this.baseUrl + id, user)
      .pipe(catchError(this.errorHandler));
  }

  deleteUser(id: number): Observable<any> {
    return this._httpClient
      .delete<any>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  getUserCart(id: number): Observable<ICartStatusResponse> {
    return this._httpClient
      .get<ICartStatusResponse>(this.baseUrl + id + '/cart')
      .pipe(catchError(this.errorHandler));
  }

  updateUserCart(id: number, request: ICart): Observable<ICartStatusResponse> {
    return this._httpClient
      .put<ICartStatusResponse>(this.baseUrl + id + '/cart', request)
      .pipe(catchError(this.errorHandler));
  }

  checkoutUserCart(id: number): Observable<ICartStatusResponse> {
    return this._httpClient
      .put<ICartStatusResponse>(this.baseUrl + id + '/cart/checkout', {})
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
