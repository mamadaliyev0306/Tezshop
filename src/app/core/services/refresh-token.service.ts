import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { RefreshToken } from '../models/refresh-token.model';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {
  private readonly API_URL = `${environment.apiUrl}/api/refreshtoken`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  generateAccessToken(userId: number): Observable<string> {
    return this.http.post<string>(
      `${this.API_URL}/generate-access-token`,
      { userId },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  generateRefreshToken(userId: number): Observable<string> {
    return this.http.post<string>(
      `${this.API_URL}/generate-refresh-token`,
      { userId },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  generateEmailVerificationToken(email: string): Observable<string> {
    return this.http.post<string>(
      `${this.API_URL}/generate-email-verification-token`,
      { email },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  generatePasswordResetToken(email: string): Observable<string> {
    return this.http.post<string>(
      `${this.API_URL}/generate-password-reset-token`,
      { email },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  validateAccessToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.API_URL}/validate-access-token`,
      { token },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  validateEmailVerificationToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.API_URL}/validate-email-verification-token`,
      { token },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  validatePasswordResetToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.API_URL}/validate-password-reset-token`,
      { token },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  isRefreshTokenValid(token: string): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.API_URL}/is-refresh-token-valid`,
      { token },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }

  revokeAllRefreshTokens(userId: number): Observable<void> {
    return this.http.post<void>(
      `${this.API_URL}/revoke-all-refresh-tokens`,
      { userId },
      { headers: this.getAuthHeaders() }
    ).pipe(
      catchError(error => throwError(() => error))
    );
  }
}
