import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISlider,ICreateSlider } from '../models/slider.model';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private readonly apiUrl = `${environment.apiUrl}/api/slider`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token localStorage yoki boshqa joydan olinadi
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getAll(): Observable<ISlider[]> {
    return this.http.get<ISlider[]>(`${this.apiUrl}/getall`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<ISlider> {
    return this.http.get<ISlider>(`${this.apiUrl}/getbyId/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  create(dto: ICreateSlider): Observable<ISlider> {
    return this.http.post<ISlider>(`${this.apiUrl}/create`, dto, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  update(id: number, dto: ICreateSlider): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${id}`, dto, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API xatoligi:', error);
    return throwError(() => new Error(error?.message || 'Serverda xatolik yuz berdi'));
  }
}
