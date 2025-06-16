// src/app/services/contact-message.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IContactMessage } from '../models/contact-message.model';
import { IContactMessageCreate } from '../models/contact-message-create.model';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ContactMessageService {
  private readonly API_URL = 'https://localhost:7179/api/contactmessage';

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  // Get all contact messages
  getAll(): Observable<IContactMessage[]> {
    return this.http.get<IContactMessage[]>(`${this.API_URL}/getall`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Get contact message by ID
  getById(id: number): Observable<IContactMessage> {
    return this.http.get<IContactMessage>(`${this.API_URL}/getbyId/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Create new contact message
  create(message: IContactMessageCreate): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/create`, message).pipe(
      tap(() => this.notification.success('Xabar yuborildi')),
      catchError(this.handleError.bind(this))
    );
  }

  // Delete contact message by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`).pipe(
      tap(() => this.notification.success('Xabar o‘chirildi')),
      catchError(this.handleError.bind(this))
    );
  }

  // Error handler
  private handleError(error: any): Observable<never> {
    this.notification.error('Xatolik yuz berdi');
    return throwError(() => error);
  }
}
