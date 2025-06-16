// src/app/services/newsletter-subscription.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  INewsletterSubscription,
  INewsletterSubscriptionCreate
} from '../models/newsletter-subscription.model';

@Injectable({
  providedIn: 'root',
})
export class NewsletterSubscriptionService {
  private readonly API_URL = 'https://localhost:7179/api/NewsletterSubscription';

  constructor(private http: HttpClient) {}

  create(subscription: INewsletterSubscriptionCreate): Observable<INewsletterSubscription> {
    return this.http.post<INewsletterSubscription>(`${this.API_URL}/create`, subscription);
  }

  getAll(): Observable<INewsletterSubscription[]> {
    return this.http.get<INewsletterSubscription[]>(`${this.API_URL}/getall`);
  }

  getById(id: number): Observable<INewsletterSubscription> {
    return this.http.get<INewsletterSubscription>(`${this.API_URL}/getbyId/${id}`);
  }

  update(id: number, subscription: INewsletterSubscriptionCreate): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/update?id=${id}`, subscription);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  softDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/soft-delete/${id}`);
  }

  restore(id: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
  }
}
