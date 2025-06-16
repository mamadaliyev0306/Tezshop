import { Component, Input, OnInit } from '@angular/core';
import { IReview } from '@core/models/review.model'; // Sharhlar uchun model
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterModule],
})
export class ProductReviewsComponent implements OnInit {
  @Input() reviews: IReview[] = []; // Mahsulot sharhlari ro'yxati

  constructor() {}

  ngOnInit(): void {}

  // Sharhlarni tartiblash: eng yangi sharhlar yuqorida
  sortReviews(): void {
    this.reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
