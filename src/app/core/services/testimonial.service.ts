import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICreateTestimonial,ITestimonial } from '../models/testimonial.model';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private readonly apiUrl = `${environment.apiUrl}/api/testimonial`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<ITestimonial[]> {
    return this.http.get<ITestimonial[]>(`${this.apiUrl}/getall`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<ITestimonial> {
    return this.http.get<ITestimonial>(`${this.apiUrl}/getbyId/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  create(dto: ICreateTestimonial): Observable<ITestimonial> {
    return this.http.post<ITestimonial>(`${this.apiUrl}/create`, dto, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  update(id: number, dto: ICreateTestimonial): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, dto, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  softDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/softdelete/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  restore(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/restore/${id}`, {}, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Xatolik yuz berdi:', error);
    return throwError(() => new Error(error?.message || 'Server xatosi'));
  }
}
