// src/app/services/email.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VerifyEmail } from '@core/models/verify-email.model';
import {
  SendEmailVerificationRequest,
  SendPasswordResetRequest,
  SendWelcomeEmailRequest,
  SendAccountLockedEmailRequest,
  SendAccountUnlockedEmailRequest,
  SendOrderConfirmationRequest,
  SendPasswordChangedNotificationRequest,
  SendNewUserNotificationToAdminRequest
} from '../models/email.models';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly API_URL = `${environment.apiUrl}/api/Email`;

  constructor(private http: HttpClient) {}

  sendVerification(data: SendEmailVerificationRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-verification`, data);
  }

  sendPasswordReset(data: SendPasswordResetRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-password-reset`, data);
  }

  sendWelcome(data: SendWelcomeEmailRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-welcome`, data);
  }

  sendAccountLocked(data: SendAccountLockedEmailRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-account-locked`, data);
  }

  sendAccountUnlocked(data: SendAccountUnlockedEmailRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-account-unlocked`, data);
  }

  sendOrderConfirmation(data: SendOrderConfirmationRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-order-confirmation`, data);
  }

  sendPasswordChanged(data: SendPasswordChangedNotificationRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-password-changed`, data);
  }

  sendNewUserNotification(data: SendNewUserNotificationToAdminRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/send-new-user-notification`, data);
  }
  verifyEmailCode(email: string, verificationCode: string): Observable<any> {
    const dto = { email, verificationCode }; // DTO ga moslashtirish
    return this.http.post(`${this.API_URL}/verify-email`, dto);
  }
}
