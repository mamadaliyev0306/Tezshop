// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrder } from '../models/order.model';
import { ICreateOrder } from '../models/order-create.model';
import { ICheckout } from '../models/order-Chekout.model';
import { OrderStatus } from '../models/enum/orderstuts.enum';
import { NotificationService } from './notification.service';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly API_URL = `${environment.apiUrl}/api/order`;



  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  createOrder(createOrderDto: ICreateOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.API_URL, createOrderDto).pipe(
      catchError((err) => {
        this.notification.error('Failed to create order');
        return throwError(() => err);
      })
    );
  }

  createOrderFromCart(userId: number, checkoutDto: ICheckout): Observable<IOrder> {
    return this.http.post<IOrder>(`${this.API_URL}/from-cart/${userId}`, checkoutDto).pipe(
      catchError((err) => {
        this.notification.error('Failed to create order from cart');
        return throwError(() => err);
      })
    );
  }

  getAllOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.API_URL).pipe(
      catchError((err) => {
        this.notification.error('Failed to get orders');
        return throwError(() => err);
      })
    );
  }

  getOrderById(id: number): Observable<IOrder> {
    return this.http.get<IOrder>(`${this.API_URL}/${id}`).pipe(
      catchError((err) => {
        this.notification.error('Failed to get order');
        return throwError(() => err);
      })
    );
  }

  updateOrder(id: number, orderDto: IOrder): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/${id}`, orderDto).pipe(
      catchError((err) => {
        this.notification.error('Failed to update order');
        return throwError(() => err);
      })
    );
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      catchError((err) => {
        this.notification.error('Failed to delete order');
        return throwError(() => err);
      })
    );
  }

  updateOrderStatus(orderId: number, status: OrderStatus): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${orderId}/status?status=${status}`, {}).pipe(
      catchError((err) => {
        this.notification.error('Failed to update order status');
        return throwError(() => err);
      })
    );
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/${orderId}/cancel`, {}).pipe(
      catchError((err) => {
        this.notification.error('Failed to cancel order');
        return throwError(() => err);
      })
    );
  }

  getOrderTotalPrice(orderId: number): Observable<{ totalPrice: number }> {
    return this.http.get<{ totalPrice: number }>(`${this.API_URL}/${orderId}/total`).pipe(
      catchError((err) => {
        this.notification.error('Failed to get order total price');
        return throwError(() => err);
      })
    );
  }

  getLatestOrders(count: number = 10): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.API_URL}/latest?count=${count}`).pipe(
      catchError((err) => {
        this.notification.error('Failed to get latest orders');
        return throwError(() => err);
      })
    );
  }

  getOrdersByDateRange(startDate: Date, endDate: Date): Observable<IOrder[]> {
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    return this.http.get<IOrder[]>(`${this.API_URL}/date-range?startDate=${start}&endDate=${end}`).pipe(
      catchError((err) => {
        this.notification.error('Failed to get orders by date range');
        return throwError(() => err);
      })
    );
  }

  getUserOrders(userId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.API_URL}/user/${userId}`).pipe(
      catchError((err) => {
        this.notification.error('Failed to get user orders');
        return throwError(() => err);
      })
    );
  }

}