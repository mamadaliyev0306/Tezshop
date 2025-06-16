import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductService } from '@core/services/product.service';
import { NotificationService } from '@core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { RatingStarsComponent } from '@components/rating-stars/rating-stars.component';
import { ProductReviewsComponent } from '@components/product-reviews/product-reviews.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProductDetailsComponent,
    ProductListComponent,
    ProductCardComponent,
    RatingStarsComponent,
    ProductReviewsComponent
  ],
  providers: [
    ProductService,
    NotificationService
  ]
})
export class ProductsModule { }
