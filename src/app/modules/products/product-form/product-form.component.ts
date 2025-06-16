import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '@core/services/product.service';
import { NotificationService } from '@core/services/notification.service';
import { IProduct } from '@core/models/product.model';
import { CategoryService } from '@core/services/category.service';
import { ICategory } from '@core/models/category.model';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // agar input ishlatilgan bo‘lsa
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  imports:[ReactiveFormsModule,MatDialogModule,
    MatFormFieldModule,MatInputModule,MatProgressSpinnerModule,
    MatSelectModule,MatOptionModule,CommonModule,RouterModule]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories: ICategory[] = [];
  isSubmitting = false;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private notification: NotificationService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product?: IProduct }
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      imageUrl: ['']
    });

    if (data?.product) {
      this.isEditMode = true;
      this.productForm.patchValue(data.product);
    }
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getActive().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        this.notification.error('Failed to load categories');
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) return;

    this.isSubmitting = true;
    const productData = this.productForm.value;

    const operation = this.isEditMode
      ? this.productService.updateProduct({ ...productData, id: this.data.product?.id })
      : this.productService.createProduct(productData);

    operation.subscribe({
      next: () => {
        this.notification.success(
          `Product ${this.isEditMode ? 'updated' : 'created'} successfully`
        );
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.notification.error(
          `Failed to ${this.isEditMode ? 'update' : 'create'} product`
        );
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}