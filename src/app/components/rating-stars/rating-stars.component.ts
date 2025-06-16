import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
  standalone: true,
  imports: [CommonModule,RouterModule],
})
export class RatingStarsComponent {
  @Input() rating: number = 0; // Yulduzlar reytingi
  @Input() readonly: boolean = false; // Faqat ko'rish uchun
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

  stars: boolean[] = [];

  ngOnChanges(): void {
    this.updateStars();
  }

  // Yulduzlarni yangilash
  private updateStars(): void {
    this.stars = [];
    for (let i = 1; i <= 5; i++) {
      this.stars.push(i <= this.rating);
    }
  }

  // Reytingni o'zgartirish
  onRate(rating: number): void {
    if (!this.readonly) {
      this.rating = rating;
      this.ratingChanged.emit(this.rating);
      this.updateStars();
    }
  }
}
