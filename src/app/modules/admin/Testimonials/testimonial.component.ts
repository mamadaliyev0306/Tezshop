import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '@core/services/testimonial.service';
import { ITestimonial, ICreateTestimonial } from '@core/models/testimonial.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  imports:[CommonModule,RouterModule],
})
export class TestimonialComponent implements OnInit {
  testimonials: ITestimonial[] = [];
  form: FormGroup;
  editingId: number | null = null;
  isLoading = false;

  constructor(
    private testimonialService: TestimonialService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      authorName: ['', Validators.required],
      content: ['', Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadTestimonials();
  }

  loadTestimonials(): void {
    this.isLoading = true;
    this.testimonialService.getAll().subscribe({
      next: data => {
        this.testimonials = data;
        this.isLoading = false;
      },
      error: err => {
        console.error('Xatolik:', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    const dto: ICreateTestimonial = this.form.value;

    if (this.editingId === null) {
      this.testimonialService.create(dto).subscribe(() => {
        this.form.reset();
        this.loadTestimonials();
      });
    } else {
      this.testimonialService.update(this.editingId, dto).subscribe(() => {
        this.editingId = null;
        this.form.reset();
        this.loadTestimonials();
      });
    }
  }

  onEdit(t: ITestimonial): void {
    this.form.patchValue({
      authorName: t.authorName,
      content: t.content,
      imageUrl: t.imageUrl
    });
    this.editingId = t.id;
  }

  onDelete(id: number): void {
    if (confirm('Haqiqatan ham o‘chirmoqchimisiz?')) {
      this.testimonialService.delete(id).subscribe(() => {
        this.loadTestimonials();
      });
    }
  }

  onCancelEdit(): void {
    this.editingId = null;
    this.form.reset();
  }
}
