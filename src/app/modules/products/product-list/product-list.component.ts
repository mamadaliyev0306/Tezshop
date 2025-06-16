import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { animate, style, transition, trigger } from '@angular/animations';
import { tap, finalize } from 'rxjs/operators';

import { ProductService } from '@core/services/product.service';
import { IProduct } from '@core/models/product.model';
import { NotificationService } from '@core/services/notification.service';
import { CartService } from '@core/services/cart.service';
import { WishlistService } from '@core/services/wishlistItem.service';
import { AuthService } from '@core/services/auth.service';
import { getUzbekPaginatorIntl } from '@app/UzbekPaginator/uzbek-paginator-intl';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getUzbekPaginatorIntl() }
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
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
export class ProductListComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  category1Products: IProduct[] = [];
  category2Products: IProduct[] = [];
  category3Products: IProduct[] = [];

  categories: string[] = [];
  selectedCategory: string | 'ALL' = 'ALL';

  isLoading = true;
  isLoggedIn = false;
  pulse = false;

  pageSize = 20;
  currentPage = 0;
  totalProducts = 0;
  showLoadMore = false;

  private subscriptions = new Subscription();

  constructor(
    private productService: ProductService,
    private notification: NotificationService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    const userId = this.getCurrentUserId();
  
    this.productService.getProductsWithWishlist(userId).pipe(
      tap(products => {
        this.products = products;
        this.filteredProducts = [...products];
        this.totalProducts = products.length;
  
        this.categories = [...new Set(products.map(p => p.categoryName))];
  
        this.category1Products = this.prepareCategoryProducts(products, 1);
        this.category2Products = this.prepareCategoryProducts(products, 2);
        this.category3Products = this.prepareCategoryProducts(products, 3);
      }),
      finalize(() => {
        this.isLoading = false;
        this.showLoadMore = this.totalProducts > this.pageSize;
      })
    ).subscribe({
      error: err => {
        this.notification.error('Mahsulotlarni yuklab bo‘lmadi');
        console.error('Xatolik:', err);
      }
    });
  }
  

  private prepareCategoryProducts(products: IProduct[], categoryId: number): IProduct[] {
    return products
      .filter(p => p.categoryId === categoryId)
      .slice(0, 12)
      .map(p => ({
        ...p,
        id: p.id || 0,
        name: p.name || 'Nomsiz mahsulot',
        price: p.price || 0,
        imageUrl: p.imageUrl || 'assets/images/product-placeholder.png',
        categoryName: p.categoryName,
        discountPercent: p.discountPercent || 0,
        isLiked: p.isLiked || false,
        averageRating: p.averageRating || 0,
        totalOrders: p.totalOrders || 0
      }));
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filteredProducts = category === 'ALL' ? [...this.products] : this.products.filter(p => p.categoryName === category);
    this.totalProducts = this.filteredProducts.length;
    this.currentPage = 0;
    this.pageSize = 20;
    this.showLoadMore = this.totalProducts > this.pageSize;
  }

  loadMore(): void {
    this.pageSize += 10;
    this.showLoadMore = this.pageSize < this.totalProducts;
  }

  goToUserProfile(product: IProduct): void {
    if (product.userId) {
      this.router.navigate(['/profile', product.userId]);
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.showLoadMore = this.pageSize < this.totalProducts;
  }

  addToCart(productId: number, event: Event): void {
    event.stopPropagation();
    if (this.isLoggedIn) {
      this.notification.warning('Iltimos, avval tizimga kiring');
      return;
    }
  
    const userId = this.getCurrentUserId();
    console.log('Adding to cart - Product ID:', productId, 'User ID:', userId);
    
    const sub = this.cartService.addToCart(productId, userId).subscribe({
      next: (response) => {
        console.log('Add to cart response:', response);
        this.notification.success('Mahsulot savatga qo‘shildi');
        
        // Update the product's totalOrders count
        const updatedProducts = this.products.map(p => 
          p.id === productId ? { ...p, totalOrders: (p.totalOrders || 0) + 1 } : p
        );
        
        this.products = updatedProducts;
        this.filteredProducts = this.filteredProducts.map(p => 
          p.id === productId ? { ...p, totalOrders: (p.totalOrders || 0) + 1 } : p
        );
        
        this.triggerPulse();
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Xatolik tafsilotlari:', err);
        const errorMsg = err.error?.message || err.message || 'Savatga qo‘shib bo‘lmadi';
        this.notification.error(errorMsg);
        
        // Log the full error for debugging
        console.error('Full error:', err);
      }
    });
  
    this.subscriptions.add(sub);
  }

  toggleLike(productId: number, event: Event): void {
    event.stopPropagation();
    
    if (this.isLoggedIn) {
      this.notification.warning('Iltimos, avval tizimga kiring');
      return;
    }
  
    const userId = this.getCurrentUserId();
    const sub = this.wishlistService.toggleWishlist(productId, userId).subscribe({
      next: response => {
        // Debug the response
        console.log('Wishlist response:', response);
        
        // Update all product lists
        this.updateAllProductLists(productId, 'isLiked', response.isInWishlist);
        
        // Force change detection
        this.cdr.detectChanges();
        
        this.notification.success(response.isInWishlist ?
          'Mahsulot yoqtirilganlarga qo\'shildi' :
          'Mahsulot yoqtirilganlardan olib tashlandi');
        this.triggerPulse();
      },
      error: err => {
        console.error('Xatolik:', err);
        this.notification.error('Yoqtirish holatini o\'zgartirib bo\'lmadi');
      }
    });
  
    this.subscriptions.add(sub);
  }

  private updateAllProductLists(productId: number, field: string, value: any): void {
    const updateFn = (p: IProduct) => p.id === productId ? { ...p, [field]: value } : p;

    this.products = this.products.map(updateFn);
    this.filteredProducts = this.filteredProducts.map(updateFn);
    this.category1Products = this.category1Products.map(updateFn);
    this.category2Products = this.category2Products.map(updateFn);
    this.category3Products = this.category3Products.map(updateFn);
  }

  showContactInfo(product: IProduct, event: Event): void {
    event.stopPropagation();
    if (product.userPhone && product.userEmail) {
      alert(`Contact:\nPhone: ${product.userPhone}\nEmail: ${product.userEmail}`);
    } else {
      this.notification.warning('Foydalanuvchi aloqa ma’lumotlarini kiritmagan');
    }
  }

  get paginatedProducts(): IProduct[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  chunkArray(arr: any[], size: number): any[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/product-placeholder.png';
    img.classList.add('error-image');
  }

  private getCurrentUserId(): number {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) return 0;
    try {
      const user = JSON.parse(userJson);
      return user.id || 0;
    } catch (e) {
      console.error('Foydalanuvchi ma’lumotlarini o‘qishda xatolik:', e);
      return 0;
    }
  }

  private triggerPulse(): void {
    this.pulse = !this.pulse;
    setTimeout(() => {
      this.pulse = !this.pulse;
      this.cdr.detectChanges();
    }, 400);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
