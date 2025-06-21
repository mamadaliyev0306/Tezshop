// src/app/services/faq.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IFaqCreate,
  IFaqUpdate
} from '../models/faq.models';
import { IFaq } from '../models/faq.model';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private readonly API_URL = `${environment.apiUrl}/api/Faq`;

  constructor(private http: HttpClient) {}

  create(faq: IFaqCreate): Observable<IFaq> {
    return this.http.post<IFaq>(`${this.API_URL}/create`, faq);
  }

  update(id: number, faq: IFaqUpdate): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/update?id=${id}`, faq);
  }

  getById(id: number): Observable<IFaq> {
    return this.http.get<IFaq>(`${this.API_URL}/getbyId/${id}`);
  }

  getAll(): Observable<IFaq[]> {
    return this.http.get<IFaq[]>(`${this.API_URL}/getall`);
  }

  getActive(): Observable<IFaq[]> {
    return this.http.get<IFaq[]>(`${this.API_URL}/active`);
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/count`);
  }

  exists(categoryId: number, question: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/exists?categoryId=${categoryId}&question=${encodeURIComponent(question)}`);
  }

  softDelete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/soft-delete/${id}`);
  }

  restore(id: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/restore/${id}`, {});
  }

  dynamicFilter(filter: any): Observable<IFaq[]> {
    return this.http.post<IFaq[]>(`${this.API_URL}/dynamic-filter`, filter);
  }

  search(query: string): Observable<IFaq[]> {
    return this.http.get<IFaq[]>(`${this.API_URL}/search?query=${encodeURIComponent(query)}`);
  }
}
