import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { FoodRequest } from '../models/food-request';
import { FoodResponse } from '../interfaces/food-response';
import { CartUpdateRequest } from '../models/cart-update-request';

@Injectable({ providedIn: 'root' })
export class FoodService {
  private baseUrl = 'http://localhost:8080/api/food/';

  constructor(private _httpClient: HttpClient) {}

  addFood(food: FoodRequest): Observable<FoodResponse> {
    return this._httpClient
      .post<FoodResponse>(this.baseUrl, food)
      .pipe(catchError(this.errorHandler));
  }

  getFoodByID(foodID: number): Observable<FoodResponse> {
    return this._httpClient
      .get<FoodResponse>(this.baseUrl + 'get/id/' + foodID)
      .pipe(catchError(this.errorHandler));
  }

  updateFood(id: number, food: FoodRequest): Observable<FoodResponse> {
    return this._httpClient
      .put<FoodResponse>(this.baseUrl + 'id/' + id, food)
      .pipe(catchError(this.errorHandler));
  }

  getCartDetails(request: CartUpdateRequest): Observable<FoodResponse[]> {
    return this._httpClient
      .post<FoodResponse[]>(this.baseUrl + 'get/cart', request)
      .pipe(catchError(this.errorHandler));
  }

  getAllFoods(): Observable<FoodResponse[]> {
    return this._httpClient
      .get<FoodResponse[]>(this.baseUrl + 'get')
      .pipe(catchError(this.errorHandler));
  }

  getFoodsByType(foodType: string): Observable<FoodResponse[]> {
    return this._httpClient
      .get<FoodResponse[]>(this.baseUrl + 'get/foodType/' + foodType)
      .pipe(catchError(this.errorHandler));
  }

  deleteFood(id: number): Observable<any> {
    return this._httpClient
      .delete<any>(this.baseUrl + 'id/' + id)
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
