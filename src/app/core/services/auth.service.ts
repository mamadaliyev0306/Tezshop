import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { catchError, tap, switchMap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IUserRegister } from '../models/user-register.model';
import { IUserLogin } from '../models/user-login.model';
import { IResetPassword } from '../models/reset-password.model';
import { AuthResponse } from '../models/auth-response.model';
import { Router } from '@angular/router';
import { PlatformDetectorService } from './platform-detector.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/Auth`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser$: Observable<any>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private platformDetector: PlatformDetectorService,

  ) {
    const storedUser = this.platformDetector.isBrowser()
      ? JSON.parse(localStorage.getItem('currentUser') || 'null')
      : null;

    this.currentUserSubject = new BehaviorSubject<any>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return this.platformDetector.isBrowser() 
      ? localStorage.getItem('token') 
      : null;
  }

  register(userData: IUserRegister): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError)
    );
  }

  verifyEmail(email: string, code: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(
      `${this.apiUrl}/verify`,
      { email, code }
    ).pipe(
      catchError(this.handleError)
    );
  }

  resendVerificationCode(email: string): Observable<{ success: boolean, message?: string }> {
    return this.http.post<{ success: boolean, message?: string }>(
      `${this.apiUrl}/resend`,
      { email }
    ).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: IUserLogin): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.storeAuthData(response)),
      catchError(this.handleError)
    );
  }



  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.platformDetector.isBrowser() 
      ? localStorage.getItem('refreshToken') 
      : null;
    
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/refresh-token`, 
      { refreshToken }
    ).pipe(
      tap(response => this.storeAuthData(response)),
      catchError(error => {
        this.clearAuthData();
        return throwError(() => error);
      })
    );
  }

  revokeToken(): Observable<void> {
    const refreshToken = this.platformDetector.isBrowser() 
      ? localStorage.getItem('refreshToken') 
      : null;
    
    return this.http.post<void>(
      `${this.apiUrl}/revoke-token`, 
      { refreshToken }
    ).pipe(
      tap(() => this.clearAuthData()),
      catchError(this.handleError)
    );
  }

  forgotPassword(email: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(
      `${this.apiUrl}/forgot-password`, 
      { email }
    ).pipe(
      catchError(this.handleError)
    );
  }

  resetPassword(resetData: IResetPassword): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(
      `${this.apiUrl}/reset-password`, 
      resetData
    ).pipe(
      catchError(this.handleError)
    );
  }

  logout(redirectToLogin: boolean = true): void {
    this.clearAuthData();
    if (redirectToLogin) {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Token muddatini tekshirish
    const expires = localStorage.getItem('tokenExpires');
    return expires ? new Date(expires) > new Date() : false;
  }
  

  private storeAuthData(authData: AuthResponse): void {
    if (!authData?.token || !authData?.refreshToken || !authData?.tokenExpires) {
      throw new Error('Invalid authentication data received');
    }
  
    if (this.platformDetector.isBrowser()) {
      localStorage.setItem('token', authData.token);
      localStorage.setItem('refreshToken', authData.refreshToken);
  
      // <-- faqat ISO format
      const expires = new Date(authData.tokenExpires).toISOString();
      localStorage.setItem('tokenExpires', expires);
  
      localStorage.setItem('currentUser', JSON.stringify(authData.userResponse || {}));
    }
  
    this.currentUserSubject.next(authData.userResponse || null);
  }
  

  private clearAuthData(): void {
    if (this.platformDetector.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('tokenExpires');
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || error.message;
    }
    
    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      serverError: error.error
    }));
  }
  getToken(): string | null {
    // Agar SSR (Server-Side Rendering) ishlatayotgan bo'lsangiz
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return this.currentUserValue?.token || null;
  }
}