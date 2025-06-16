import { Component, OnInit } from '@angular/core';
import { CartService } from '@core/services/cart.service';
import { ICart} from '@core/models/cart.model';
import { NotificationService } from '@core/services/notification.service';
import { animate, style, transition, trigger, stagger, query } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { ProductService } from '@core/services/product.service';
import { Router } from '@angular/router';
import { ICartItem } from '@core/models/cart-item-model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports:[MatIconModule,MatProgressSpinnerModule,CommonModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger('100ms', [
            animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('pulse', [
      transition('* => *', [
        animate('200ms ease-in', style({ transform: 'scale(1.05)' })),
        animate('200ms ease-out', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class CartComponent implements OnInit {
  cart: ICart | null = null;
  isLoading = true;
  isUpdating = false;
  pulse = false;

  constructor(
    private cartService: CartService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    const userId = this.getCurrentUserId();
    this.cartService.getActiveCart(userId).subscribe({
      next: (cart) => {
        this.cart = cart;
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.cart = null;
        } else {
          this.notification.error('Savatchani yuklab bo\'lmadi');
        }
        this.isLoading = false;
      }
    });
  }

  updateQuantity(item: ICartItem, newQuantity: number): void {
    if (newQuantity < 1 || newQuantity > 100) return;
    
    this.isUpdating = true;
    this.cartService.updateItemQuantity(item.cartItemId, newQuantity).subscribe({
      next: () => {
        this.notification.success('Miqdor yangilandi');
        this.loadCart();
        this.triggerPulse();
      },
      error: () => {
        this.notification.error('Miqdorni yangilashda xatolik');
        this.isUpdating = false;
      }
    });
  }

  removeItem(itemId: number): void {
    this.isUpdating = true;
    this.cartService.removeItemFromCart(itemId).subscribe({
      next: () => {
        this.notification.success('Mahsulot savatchadan olib tashlandi');
        this.loadCart();
        this.triggerPulse();
      },
      error: () => {
        this.notification.error('Mahsulotni olib tashlashda xatolik');
        this.isUpdating = false;
      }
    });
  }

  clearCart(): void {
    if (!this.cart) return;
    
    if (confirm('Haqiqatan ham savatchani tozalamoqchimisiz?')) {
      this.isUpdating = true;
      this.cartService.clearCart(this.cart.id).subscribe({
        next: () => {
          this.notification.success('Savatcha tozalandi');
          this.cart = null;
          this.isUpdating = false;
        },
        error: () => {
          this.notification.error('Savatchani tozalashda xatolik');
          this.isUpdating = false;
        }
      });
    }
  }

  openCheckoutDialog(): void {
    if (!this.cart || this.cart.items.length === 0) return;

    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '600px',
      data: { cart: this.cart }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.cart = null;
      }
    });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  private getCurrentUserId(): number {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.id;
  }

  private triggerPulse(): void {
    this.pulse = !this.pulse;
    setTimeout(() => this.pulse = !this.pulse, 400);
  }
  // In your CartComponent class
addOrUpdateProduct(productId: number, quantityChange: number = 1): void {
  this.isUpdating = true;
  const userId = this.getCurrentUserId();
  
  this.cartService.addOrUpdateItem(userId, productId, quantityChange).subscribe({
    next: () => {
      this.notification.success('Savatcha yangilandi');
      this.loadCart();
      this.triggerPulse();
    },
    error: () => {
      this.notification.error('Savatchani yangilashda xatolik');
      this.isUpdating = false;
    }
  });
}
}