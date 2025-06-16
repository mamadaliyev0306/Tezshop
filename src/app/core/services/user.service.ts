import { Injectable } from '@angular/core';
import { HttpClient, HttpParams ,HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IUser} from '@core/models/user.model';
import { UserProfileUpdate } from '@core/models/user-profile-update.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://localhost:7179/api/users';

  constructor(private http: HttpClient) {}

  // ✅ Check if email exists
  emailExists(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    return this.http.get<boolean>(`${this.API_URL}/email-exists`, { params }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Check if username exists
  usernameExists(username: string): Observable<boolean> {
    const params = new HttpParams().set('username', username);
    return this.http.get<boolean>(`${this.API_URL}/username-exists`, { params }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Check if phone exists
  phoneExists(phone: string): Observable<boolean> {
    const params = new HttpParams().set('phone', phone);
    return this.http.get<boolean>(`${this.API_URL}/phone-exists`, { params }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Get user profile by ID
  getProfile(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.API_URL}/profile/${userId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Update user profile
  updateProfile(userId: number, data: UserProfileUpdate): Observable<any> {
    return this.http.put(`${this.API_URL}/update-profile/${userId}`, data).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Soft delete profile
  softDeleteProfile(userId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/softdelete-profile/${userId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Hard delete profile
  deleteProfile(userId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/delete-profile/${userId}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Verify email by userId
  verifyEmail(userId: number): Observable<any> {
    return this.http.put(`${this.API_URL}/verify-email/${userId}`, {}).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Get user by email
  getByEmail(email: string): Observable<IUser> {
    const params = new HttpParams().set('email', email);
    return this.http.get<IUser>(`${this.API_URL}/by-email`, { params }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Get user by username
  getByUsername(username: string): Observable<IUser> {
    const params = new HttpParams().set('username', username);
    return this.http.get<IUser>(`${this.API_URL}/by-username`, { params }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  // ✅ Get user by phone
  getByPhone(phone: string): Observable<IUser> {
    const params = new HttpParams().set('phone', phone);
    return this.http.get<IUser>(`${this.API_URL}/by-phone`, { params }).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
