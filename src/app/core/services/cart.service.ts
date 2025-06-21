// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ICart } from '../models/cart.model';
import { ICartItem } from '../models/cart-item-model';
import { ICartItemCreate } from '../models/cart-item-create.model';
import { NotificationService } from './notification.service';
import { switchMap } from 'rxjs/operators';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly API_URL = `${environment.apiUrl}/api/cartservice`;

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  // Get all carts of a specific user
  getUserCarts(userId: number): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.API_URL}/user/${userId}`).pipe(
      tap(() => this.notification.success('User carts loaded successfully')),
      catchError((err) => {
        this.notification.error('Failed to load user carts');
        return throwError(() => err);
      })
    );
  }

  // Create a new cart for a user
  createCart(userId: number): Observable<ICart> {
    return this.http.post<ICart>(`${this.API_URL}/user/${userId}`, {}).pipe(
      tap(() => this.notification.success('Cart created successfully')),
      catchError((err) => {
        this.notification.error('Failed to create cart');
        return throwError(() => err);
      })
    );
  }

  // Get the current active cart for a user
  getActiveCart(userId: number): Observable<ICart> {
    return this.http.get<ICart>(`${this.API_URL}/active/${userId}`).pipe(
      tap(() => this.notification.success('Active cart loaded successfully')),
      catchError((err) => {
        if (err.status === 404) {
          this.notification.warning('No active cart found');
        } else {
          this.notification.error('Failed to load active cart');
        }
        return throwError(() => err);
      })
    );
  }

  // Get items in a specific cart
  getCartItems(cartId: number): Observable<ICartItem[]> {
    return this.http.get<ICartItem[]>(`${this.API_URL}/${cartId}/items`).pipe(
      tap(() => this.notification.success('Cart items loaded successfully')),
      catchError((err) => {
        this.notification.error('Failed to load cart items');
        return throwError(() => err);
      })
    );
  }

  // Add item to cart
  addItemToCart(cartId: number, item: ICartItemCreate): Observable<any> {
    return this.http.post(`${this.API_URL}/${cartId}/items`, item).pipe(
      tap(() => this.notification.success('Item added to cart successfully')),
      catchError((err) => {
        this.notification.error('Failed to add item to cart');
        return throwError(() => err);
      })
    );
  }

  // Update item quantity
  updateItemQuantity(cartItemId: number, newQuantity: number): Observable<any> {
    return this.http.put(`${this.API_URL}/items/${cartItemId}?newQuantity=${newQuantity}`, {}).pipe(
      tap(() => this.notification.success('Item quantity updated successfully')),
      catchError((err) => {
        this.notification.error('Failed to update item quantity');
        return throwError(() => err);
      })
    );
  }

  // Remove item from cart
  removeItemFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/items/${cartItemId}`).pipe(
      tap(() => this.notification.success('Item removed from cart successfully')),
      catchError((err) => {
        this.notification.error('Failed to remove item from cart');
        return throwError(() => err);
      })
    );
  }

  // Clear a specific cart
  clearCart(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${cartId}/clear`).pipe(
      tap(() => this.notification.success('Cart cleared successfully')),
      catchError((err) => {
        this.notification.error('Failed to clear cart');
        return throwError(() => err);
      })
    );
  }

  // Check if a cart exists for a user
  cartExists(userId: number): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.API_URL}/user/${userId}/exists`).pipe(
      catchError((err) => {
        this.notification.error('Failed to check cart existence');
        return throwError(() => err);
      })
    );
  }

  // Calculate cart total
  calculateCartTotal(cartId: number): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${this.API_URL}/${cartId}/total`).pipe(
      tap(() => this.notification.success('Cart total calculated successfully')),
      catchError((err) => {
        this.notification.error('Failed to calculate cart total');
        return throwError(() => err);
      })
    );
  }

  // Get cart item count
  getCartItemCount(cartId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.API_URL}/${cartId}/item-count`).pipe(
      tap(() => this.notification.success('Cart item count retrieved successfully')),
      catchError((err) => {
        this.notification.error('Failed to get cart item count');
        return throwError(() => err);
      })
    );
  }

addToCart(productId: number, quantity: number = 1): Observable<any> {
  // Avval active cart ni topamiz
  const userId = this.getCurrentUserId(); // Foydalanuvchi ID sini olish usuli
  return this.getActiveCart(userId).pipe(
    switchMap(cart => {
      const item: ICartItemCreate = {
        productId: productId,
        quantity: quantity
      };
      return this.addItemToCart(cart.id, item);
    }),
    catchError(error => {
      if (error.status === 404) {
        // Agar savatcha bo'lmasa, yangi yaratamiz
        return this.createCart(userId).pipe(
          switchMap(newCart => {
            const item: ICartItemCreate = {
              productId: productId,
              quantity: quantity
            };
            return this.addItemToCart(newCart.id, item);
          })
        );
      }
      return throwError(() => error);
    })
  );
}
addOrUpdateItem(userId: number, productId: number, quantityChange: number): Observable<any> {
  return this.http.post(`${this.API_URL}/add-or-update`, {
    userId,
    productId,
    quantityChange
  });
}
// Yordamchi metod - foydalanuvchi ID sini olish
private getCurrentUserId(): number {
  // Haqiqiy loyihada bu AuthService dan olinadi
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
  return user.id;
}
}