import { Component, OnInit } from '@angular/core';
import { WishlistService } from '@core/services/wishlistItem.service';
import { IWishlistItem } from '@core/models/wishlist-Item.model';
import { IProduct } from '@core/models/product.model';
import { NotificationService } from '@core/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss'],
  imports:[CommonModule,MatIconModule,MatProgressSpinnerModule]
})
export class WishlistItemComponent implements OnInit {
  wishlistItems: IWishlistItem[] = [];
  isLoading = false;
  userId: number | null = null;

  constructor(
    private wishlistService: WishlistService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadWishlist();
  }

  loadCurrentUser(): void {
    try {
      const userJson = localStorage.getItem('currentUser');
      if (!userJson) {
        this.notification.warning('Please login to view your wishlist');
        return;
      }
  
      const user = JSON.parse(userJson);
      console.log('Current user:', user); // Debug uchun
      
      if (!user?.id) {
        throw new Error('Invalid user data: ID missing');
      }
  
      this.userId = user.id;
      console.log('User ID loaded:', this.userId); // Debug uchun
    } catch (error) {
      console.error('Error loading user:', error);
      this.notification.error('Failed to load user data');
      this.userId = null;
    }
  }

  loadWishlist(): void {
    if (!this.userId) {
      console.error('Cannot load wishlist - no user ID');
      return;
    }
  
    this.isLoading = true;
    console.log('Loading wishlist for user ID:', this.userId); // Debug
    
    this.wishlistService.getUserWishlist(this.userId).subscribe({
      next: (items) => {
        console.log('Received wishlist items:', items); // Debug
        this.wishlistItems = items || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading wishlist:', err);
        this.notification.error(err.message || 'Failed to load wishlist');
        this.isLoading = false;
        this.wishlistItems = [];
      },
      complete: () => {
        console.log('Wishlist loading completed'); // Debug
      }
    });
  }

  trackByProductId(index: number, item: IWishlistItem): number {
    return item.productId;
  }

  removeFromWishlist(productId: number): void {
    if (!this.userId) return;

    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => {
        this.wishlistItems = this.wishlistItems.filter(item => item.productId !== productId);
        this.notification.success('Product removed from wishlist');
      },
      error: (err) => {
        this.notification.error('Failed to remove from wishlist');
        console.error(err);
      }
    });
  }

  toggleWishlist(productId: number,userId :number): void {
    this.wishlistService.toggleWishlist(productId,userId).subscribe({
      next: (response) => {
        if (response.isInWishlist) {
          this.notification.success('Product added to wishlist');
          // You might want to reload the wishlist or add the item locally
          this.loadWishlist();
        } else {
          this.notification.success('Product removed from wishlist');
          this.wishlistItems = this.wishlistItems.filter(item => item.productId !== productId);
        }
      },
      error: (err) => {
        this.notification.error('Failed to update wishlist');
        console.error(err);
      }
    });
  }

  getTotalItems(): number {
    return this.wishlistItems.length;
  }
}