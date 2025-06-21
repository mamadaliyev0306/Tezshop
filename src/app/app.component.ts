import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterModule, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Services
import { AuthService } from '../app/core/services/auth.service';
import { CartService } from '../app/core/services/cart.service';
import { TokenService } from '../app/core/services/token.service';
import { NotificationService } from '../app/core/services/notification.service';
import { CategoryService } from '../app/core/services/category.service';
import { PlatformDetectorService } from '../app/core/services/platform-detector.service';
import { ProductService } from '../app/core/services/product.service';
import { WishlistService } from '@core/services/wishlistItem.service';
import { IProduct } from '@core/models/product.model';
import { IProductFilter } from '@core/models/product-filter.model';
import { ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from '@modules/shared/shared.module';
import { LoadingSpinnerComponent } from '@modules/shared/components/loading-spinner/loading-spinner.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, CommonModule, RouterOutlet, HttpClientModule,FormsModule,SharedModule,LoadingSpinnerComponent ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'E-Commerce App';
  currentYear = new Date().getFullYear();
  cartItemCount = 0;
  wishlistCount = 0;
  isLoggedIn = false;
  isMobileMenuOpen = false;
  isSearchActive = false;
  showCategories = false;
  showUserDropdown = false;
  isLoading = false;
  categories: any[] = [];
  selectedCategory = '';
  showProducts = true;
  currentPage = 1;
  totalPages = 14;
  products: any[] = [];
  searchQuery = '';
  userName = 'Muhammadyusuf';
  userPhone='+998940030303';
  isScrolled = false;
  showDropdown = false;
  pageSize=20;
  showAllCategories = false;
  mainCategories: any[] = [];
  featuredCategories: any[] = [];
  visiblePages: number[] = [];
  isDarkMode = false;
  currentLanguage = 'uz';
  showLanguageDropdown = false;
  searchSuggestions: string[] = [];
  activeCategoryMenu: any = null;
  isMobileView = false;
  mobileSearchQuery = '';
  @ViewChild('searchInput') searchInput!: ElementRef;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private tokenService: TokenService,
    private notification: NotificationService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private wishlistService:WishlistService,
    private platformDetectorService: PlatformDetectorService,
    private router: Router,
    private route: ActivatedRoute
  
  ) {

      }

  ngOnInit(): void {
    this.checkAuthStatus();
    this.loadCartCount();
    this.loadWishlistCount();
    this.loadCategories();
    this.loadProducts();
    this.setupRouterEvents();

    if (this.platformDetectorService.isBrowser()) {
      this.setupScrollListener();
      this.setupLocalStorage();
    }

    this.subscriptions.add(
      this.authService.currentUser$.subscribe(user => {
        this.isLoggedIn = !!user;
        this.userName = user?.name || '';
        if (this.isLoggedIn) {
          this.loadCartCount();
          this.loadWishlistCount();
        } else {
          this.cartItemCount = 0;
          this.wishlistCount = 0;
        }
      })
    );
  }
  get pagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.products.slice(start, start + this.pageSize);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    
    // Close categories menu if clicked outside
    if (!target.closest('.categories-dropdown')) {
      this.showCategories = false;
    }
    
    // Close user dropdown if clicked outside
    if (!target.closest('.user-dropdown')) {
      this.showUserDropdown = false;
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  private setupLocalStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userName = JSON.parse(storedUser).name;
    }

    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token found:', token);
    }
  }

  private setupScrollListener(): void {
    window.scrollTo(0, 0);
    document.title = 'Welcome to E-Commerce';
    console.log('User agent:', navigator.userAgent);
  }

  private setupRouterEvents(): void {
    this.subscriptions.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.showDropdown = false;
          this.showCategories = false;
          this.isMobileMenuOpen = false;
          window.scrollTo(0, 0);
        })
    );
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.authService.currentUserValue;
      this.userName = user?.name || '';
    }
  }

  loadCartCount(): void {
    if (this.isLoggedIn) {
      const user = this.authService.currentUserValue;
      if (user?.id) {
        this.subscriptions.add(
          this.cartService.getCartItemCount(user.id).subscribe({
            next: (response) => {
              this.cartItemCount = response.count;
            },
            error: (err) => {
              this.notification.error('Failed to load cart count');
              console.error(err);
            }
          })
        );
      }
    }
  }

  loadWishlistCount(): void {
    if (this.isLoggedIn) {
      const user = this.authService.currentUserValue;
      if (user?.id) {
        this.subscriptions.add(
          this.wishlistService.getWishlistCount(user.id).subscribe({
            next: (count: number) => {
              this.wishlistCount = count;
            },
            error: (err: any) => {
              this.notification.error('Failed to load wishlist count');
              console.error(err);
            }
          })
        );
      }
    }
  }

  loadCategories(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.categoryService.getActive().subscribe({
        next: (categories) => {
          this.categories = categories;
          this.isLoading = false;
        },
        error: (err) => {
          this.notification.error('Failed to load categories');
          this.isLoading = false;
          console.error(err);
        }
      })
    );
  }

  loadProducts(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.productService.getAllProducts().subscribe({
        next: (products) => {
          this.products = products;
          // Agar pagination kerak bo'lsa, backenddan qaytgan javobga moslashtiring
          this.totalPages = Math.ceil(products.length / 20); // Masalan, frontendda hisoblash
          this.isLoading = false;
        },
        error: (err) => {
          this.notification.error('Failed to load products');
          this.isLoading = false;
          console.error(err);
        }
      })
    );
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.showCategories = false;
      this.showUserDropdown = false;
    }
  }

  toggleCategories(): void {
    this.showCategories = !this.showCategories;
    if (this.showCategories) {
      this.showUserDropdown = false;
      this.isMobileMenuOpen = false;
    }
  }

  toggleUserDropdown(): void {
    this.showUserDropdown = !this.showUserDropdown;
    if (this.showUserDropdown) {
      this.showCategories = false;
      this.isMobileMenuOpen = false;
    }
  }

  selectSubcategory(category: any, subcategory: string): void {
    this.selectedCategory = `${category.name} - ${subcategory}`;
    this.showProducts = false;
  
    const filterDto: IProductFilter = {
      categoryId: category.id,
      searchQuery: subcategory // Subkategoriya nomi bo‘yicha qidirish
    };
  
    this.subscriptions.add(
      this.productService.filterProducts(filterDto, 1, 20).subscribe({
        next: (products) => {
          this.products = products;
          this.totalPages = 1; // Agar pagination bo‘lmasa yoki backend qaytarmasa
          this.currentPage = 1;
          this.showProducts = true;
        },
        error: (err) => {
          this.notification.error('Subkategoriya mahsulotlarini yuklashda xatolik yuz berdi');
          console.error(err);
        }
      })
    );
  }
  


  search(query: string): void {
    if (query.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: query } });
      this.searchQuery = '';
    }
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  addToCart(id: number): void {
    if (this.isLoggedIn) {
      this.subscriptions.add(
        this.cartService.addToCart(id, 1).subscribe({
          next: () => {
            this.cartItemCount++;
            this.notification.success('Product added to cart');
          },
          error: (err) => {
            this.notification.error('Failed to add to cart');
            console.error(err);
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  addToWishlist(id: number): void {
    if (this.isLoggedIn) {
      this.subscriptions.add(
        this.wishlistService.addToWishlist(id).subscribe({
          next: () => {
            this.wishlistCount++;
            this.notification.success('Product added to wishlist');
          },
          error: (err) => {
            this.notification.error('Failed to add to wishlist');
            console.error(err);
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  quickView(id: number): void {
    // Implement quick view modal logic here
    console.log('Quick view for product:', id);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }



  logout(): void {
    this.authService.logout();
    this.tokenService.clear();
    this.showUserDropdown = false;
    this.isMobileMenuOpen = false;
    this.notification.success('Successfully logged out');
    this.router.navigate(['/login']);
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/products'], { queryParams: { category: categoryId } });
  }
  selectCategory(category: any): void {
    this.selectedCategory = category.name;
    this.showProducts = false;
    this.isLoading = true;
    
    // Clear previous products
    this.products = [];
    
    this.subscriptions.add(
      this.productService.getProductsByCategory(category.id).subscribe({
        next: (products: IProduct[]) => {
          this.products = products;
          this.totalPages = Math.ceil(products.length / this.pageSize); // Frontend pagination
          this.currentPage = 1;
          this.showProducts = true;
          this.isLoading = false;
          
          // Scroll to top for better UX
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          this.notification.success(`${category.name} kategoriyasidagi mahsulotlar yuklandi`);
        },
        error: (err) => {
          this.notification.error('Kategoriya mahsulotlarini yuklashda xato yuz berdi');
          console.error(err);
          this.isLoading = false;
        }
      })
    );
  }



  // ... existing methods remain the same ...

  // Add these new methods for Uzum-like functionality
  toggleAllCategories(): void {
    this.showAllCategories = !this.showAllCategories;
    if (this.showAllCategories) {
      this.showCategories = false;
      this.showUserDropdown = false;
      this.isMobileMenuOpen = false;
    }
  }

  openLoginModal(): void {
    // Implement your login modal logic here
    this.router.navigate(['/login']);
  }

  updateVisiblePages(): void {
    const maxVisible = 5;
    this.visiblePages = [];
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.visiblePages.push(i);
      }
    } else {
      let start = Math.max(1, this.currentPage - 2);
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = end - maxVisible + 1;
      }
      
      for (let i = start; i <= end; i++) {
        this.visiblePages.push(i);
      }
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateVisiblePages();
      this.loadProducts();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateVisiblePages();
      this.loadProducts();
    }
  }

  shortNumber(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  }
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-theme', this.isDarkMode);
    // You can also save to localStorage
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  // Language selector
  toggleLanguageDropdown() {
    this.showLanguageDropdown = !this.showLanguageDropdown;
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.showLanguageDropdown = false;
    // Implement your language change logic here
  }
  private getSearchSuggestions(query: string): string[] {
    // Bu yerda haqiqiy qidiruv takliflari logikasi bo'lishi kerak
    // Misol uchun:
    if (!query) return [];
    
    // Agar mahsulotlar ro'yxati mavjud bo'lsa, ular orasidan qidirish
    if (this.products && this.products.length > 0) {
      return this.products
        .filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()))
        .map(product => product.name)
        .slice(0, 5); // Faqat 5 ta taklif
    }
    
    return [];
  }

  refreshProducts(): void {
    // Option 1: Using query params
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { refresh: true },
      queryParamsHandling: 'merge'
    });
  
    // Option 2: Using custom event
    window.dispatchEvent(new Event('tezshop:refresh-products'));
  }
}
