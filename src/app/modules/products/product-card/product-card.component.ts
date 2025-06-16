import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@core/models/product.model';
import { ProductService } from '@core/services/product.service';
import { NotificationService } from '@core/services/notification.service';
import { IUpdateProduct } from '@core/models/product-update.model';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {}

  // Mahsulotni o'zgartirish
  onEditProduct(): void {
    this.loading = true;
  
    const updateData: IUpdateProduct = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      categoryId:this.product.categoryId,
      imageUrl:this.product.imageUrl,
      stockQuantity:this.product.stockQuantity,
      isDeleted:this.product.isDeleted,
      userPhone:this.product.userPhone,
      userEmail:this.product.userEmail
    };
  
    this.productService.updateProduct(updateData).subscribe(
      (updatedProduct) => {
        this.notification.success('Mahsulot muvaffaqiyatli yangilandi');
        this.loading = false;
      },
      (error) => {
        this.notification.error('Mahsulotni yangilashda xatolik');
        this.loading = false;
      }
    );
  }
  

  // Mahsulotni o'chirish
  onDeleteProduct(): void {
    if (confirm('Mahsulotni o\'chirmoqchimisiz?')) {
      this.loading = true;
      this.productService.deleteProduct(this.product.id).subscribe(
        () => {
          this.notification.success('Mahsulot muvaffaqiyatli o\'chirildi');
          this.loading = false;
        },
        (error) => {
          this.notification.error('Mahsulotni o\'chirishda xatolik');
          this.loading = false;
        }
      );
    }
  }
}
