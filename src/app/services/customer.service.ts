import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CustomerResponse } from '../interfaces/customer-response';
import { CustomerRegistrationRequest } from '../models/customer-registration-request';
import { CartStatusResponse } from '../interfaces/cart-status-response';
import { CartUpdateRequest } from '../models/cart-update-request';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/users/';

  constructor(private _httpClient: HttpClient) {}

  getAllUsers(): Observable<CustomerResponse[]> {
    return this._httpClient
      .get<CustomerResponse[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }

  getUserByID(id: number): Observable<CustomerResponse> {
    return this._httpClient
      .get<CustomerResponse>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  updateUser(
    id: number,
    request: CustomerRegistrationRequest
  ): Observable<CustomerResponse> {
    return this._httpClient
      .post<CustomerResponse>(this.baseUrl + id, request)
      .pipe(catchError(this.errorHandler));
  }

  deleteUser(id: number): Observable<any> {
    return this._httpClient
      .delete<any>(this.baseUrl + id)
      .pipe(catchError(this.errorHandler));
  }

  getUserCart(id: number): Observable<CartStatusResponse> {
    return this._httpClient
      .get<CartStatusResponse>(this.baseUrl + id + '/cart')
      .pipe(catchError(this.errorHandler));
  }

  updateUserCart(
    id: number,
    request: CartUpdateRequest
  ): Observable<CartStatusResponse> {
    return this._httpClient
      .put<CartStatusResponse>(this.baseUrl + id + '/cart', request)
      .pipe(catchError(this.errorHandler));
  }

  batchAddToUserCart(
    id: number,
    request: CartUpdateRequest
  ): Observable<CartStatusResponse> {
    return this._httpClient
      .put<CartStatusResponse>(this.baseUrl + id + '/cart/add', request)
      .pipe(catchError(this.errorHandler));
  }

  addToUserCart(
    userID: number,
    foodID: number
  ): Observable<CartStatusResponse> {
    return this._httpClient
      .put<CartStatusResponse>(
        this.baseUrl + userID + '/cart/add/' + foodID,
        {}
      )
      .pipe(catchError(this.errorHandler));
  }

  removeFromUserCart(
    userID: number,
    foodID: number
  ): Observable<CartStatusResponse> {
    return this._httpClient
      .put<CartStatusResponse>(
        this.baseUrl + userID + '/cart/remove/' + foodID,
        {}
      )
      .pipe(catchError(this.errorHandler));
  }

  checkoutUserCart(id: number): Observable<CartStatusResponse> {
    return this._httpClient
      .put<CartStatusResponse>(this.baseUrl + id + '/cart/checkout', {})
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
