import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { IProduct } from '@core/models/product.model';
import { NotificationService } from '@core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    // Router orqali ID ni olish
    const productId = +this.route.snapshot.paramMap.get('id')!;

    if (productId) {
      this.getProductDetails(productId);
    }
  }

  // Mahsulotni olish uchun metod
  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product: IProduct) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = 'Mahsulotni yuklashda xato yuz berdi';
        this.notification.error(this.error);
      }
    });
  }

  // Mahsulotni savatga qo'shish
  addToCart(product: IProduct): void {
    // Savatga qo'shish lojiği
    this.notification.success(`${product.name} savatga qo'shildi`);
  }

  // Mahsulotni sevimlilar ro'yxatiga qo'shish
  addToWishlist(product: IProduct): void {
    // Sevimlilar ro'yxatiga qo'shish lojiği
    this.notification.success(`${product.name} sevimlilar ro'yxatiga qo'shildi`);
  }
}
