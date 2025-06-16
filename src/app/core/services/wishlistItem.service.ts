import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IWishlistItem ,IWishlistItemCreate} from '@core/models/wishlist-Item.model';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'

})
export class WishlistService {
  private readonly API_URL = `https://localhost:7179/api/WishlistItem`;

  constructor(private http: HttpClient,
    private notification: NotificationService
  ) { }

  /**
   * Mahsulotni istaklar ro'yxatiga qo'shish
   * @param dto WishlistItemCreateDto
   */
  addToWishlist(productId: number): Observable<any> {
    const userId = this.getCurrentUserId();
    return this.http.post(`${this.API_URL}/${userId}/items`, { productId }).pipe(
      tap(() => this.notification.success('Product added to wishlist successfully')),
      catchError(error => {
        this.notification.error('Failed to add to wishlist');
        return throwError(() => error);
      })
    );
  }

  /**
   * Mahsulotni istaklar ro'yxatidan olib tashlash
   * @param userId Foydalanuvchi IDsi
   * @param productId Mahsulot IDsi
   */
  removeFromWishlist(productId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${productId}`);
  }

  /**
   * Mahsulot istaklar ro'yxatida borligini tekshirish
   * @param userId Foydalanuvchi IDsi
   * @param productId Mahsulot IDsi
   */
  isInWishlist( productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_URL}/exists/${productId}`);
  }

  /**
   * Foydalanuvchining istaklar ro'yxatidagi mahsulotlar soni
   * @param userId Foydalanuvchi IDsi
   */
  getWishlistCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/count/${userId}`);
  }

  /**
   * Foydalanuvchining istaklar ro'yxatidagi barcha mahsulotlar
   * @param userId Foydalanuvchi IDsi
   */
  getUserWishlist(userId: number): Observable<IWishlistItem[]> {
    return this.http.get<IWishlistItem[]>(`${this.API_URL}/${userId}`);
  }
  private getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.id;
  }

    // Productni wishlistga qo'shish/olib tashlash
    toggleWishlist(productId: number,userId:number): Observable<{ isInWishlist: boolean }> {
      return this.http.post<{ isInWishlist: boolean }>(
        `${this.API_URL}/toggle/${productId}/${userId}`, 
        {}
      ).pipe(
        tap(response => {
          console.log('Wishlist updated:', response);
        }),
        catchError(error => {
          console.error('Error toggling wishlist:', error);
          throw error;
        })
      );
    }
}