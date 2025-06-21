import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ShippingAddressCreate } from '../models/shipping-address-create';
import { ShippingAddressUpdate } from '../models/shipping-address-update';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ShippingAddressService {
  private baseUrl = `${environment.apiUrl}/api/shippingaddress`; // Backend API URL

  // HTTP headers for authorization (if required)
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${your_token_here}` // Unkomment if you need to pass token
  });

  constructor(private http: HttpClient) {}

  // Create a new shipping address
  create(address: ShippingAddressCreate): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/create`, address, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a shipping address by id
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a shipping address by id
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getbyId/${id}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get all shipping addresses by userId
  getByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getby-userId/${userId}`, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Update a shipping address
  update(id: number, address: ShippingAddressUpdate): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, address, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors from HTTP requests
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

