import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import {
  IPaymentCreate,
  IPayment,
  IRefundRequest,
  ICancelPaymentRequest,
  IPaymentDetailsUpdate,
  IPaymentCallback,
  IPaymentStatistics,
  IPaginatedPaymentResponse
} from '../models/payment.model';
import { IPaymentFilter } from '../models/payment-filter.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly baseUrl = 'https://localhost:7179/api/payment';

  constructor(
    private http: HttpClient,
    private notify: NotificationService
  ) {}

  create(payment: IPaymentCreate): Observable<IPayment> {
    return this.http.post<IPayment>(`${this.baseUrl}/create`, payment).pipe(
      catchError((error) => this.handleError(error, 'To‘lov yaratishda xatolik'))
    );
  }

  getById(id: number): Observable<IPayment> {
    return this.http.get<IPayment>(`${this.baseUrl}/getbyId/${id}`).pipe(
      catchError((error) => this.handleError(error, 'To‘lovni topib bo‘lmadi'))
    );
  }

  getOrderById(orderId: number): Observable<IPayment> {
    return this.http.get<IPayment>(`${this.baseUrl}/get-order-byId/${orderId}`).pipe(
      catchError((error) => this.handleError(error, 'Buyurtmaga tegishli to‘lovni olishda xatolik'))
    );
  }

  getStatistics(): Observable<IPaymentStatistics> {
    return this.http.get<IPaymentStatistics>(`${this.baseUrl}/statistics`).pipe(
      catchError((error) => this.handleError(error, 'Statistikani olishda xatolik'))
    );
  }

  filterPayments(filter: IPaymentFilter): Observable<IPaginatedPaymentResponse> {
    return this.http.post<IPaginatedPaymentResponse>(`${this.baseUrl}/filtered`, filter).pipe(
      catchError((error) => this.handleError(error, 'To‘lovlarni filterlashda xatolik'))
    );
  }

  updateStatus(paymentId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/update-status`, { paymentId, status }).pipe(
      catchError((error) => this.handleError(error, 'Statusni yangilashda xatolik'))
    );
  }

  refund(paymentId: number, refundDto: IRefundRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/refund/${paymentId}`, refundDto).pipe(
      catchError((error) => this.handleError(error, 'To‘lovni qaytarishda xatolik'))
    );
  }

  cancel(paymentId: number, cancelDto: ICancelPaymentRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/cancel/${paymentId}`, cancelDto).pipe(
      catchError((error) => this.handleError(error, 'To‘lovni bekor qilishda xatolik'))
    );
  }

  updateDetails(paymentId: number, updateDto: IPaymentDetailsUpdate): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/fupdate-details/${paymentId}`, updateDto).pipe(
      catchError((error) => this.handleError(error, 'To‘lov tafsilotlarini yangilashda xatolik'))
    );
  }

  callback(callbackDto: IPaymentCallback): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/callback`, callbackDto).pipe(
      catchError((error) => this.handleError(error, 'Callbackni bajarishda xatolik'))
    );
  }

  private handleError(error: any, message: string) {
    console.error(error);
    this.notify.error(message);
    return throwError(() => error);
  }
}
