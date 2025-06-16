import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactMessageService } from '@core/services/contact-message.service';
import { NotificationService } from '@core/services/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
    trigger('shake', [
      transition('* => *', [
        style({ transform: 'translateX(0)' }),
        animate('100ms', style({ transform: 'translateX(-8px)' })),
        animate('100ms', style({ transform: 'translateX(8px)' })),
        animate('100ms', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class ContactFormComponent {
  contactForm: FormGroup;
  isSending = false;
  shake = false;
  showSuccessMessage = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactMessageService,
    private notification: NotificationService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.markFormAsTouched();
      this.shakeForm();
      this.notification.error(
        "Iltimos, barcha maydonlarni to'g'ri to'ldiring"
      );
      return;
    }

    this.isSending = true;
    const messageData = this.contactForm.value;

    this.contactService.create(messageData).subscribe({
      next: () => {
        this.contactForm.reset();
        this.isSending = false;
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 5000);
        this.notification.success("Xabaringiz yuborildi! Tez orada javob beramiz");
      },
      error: () => {
        this.isSending = false;
        this.notification.error("Xabar yuborishda xatolik yuz berdi");
      },
    });
  }

  private markFormAsTouched(): void {
    Object.values(this.contactForm.controls).forEach(control =>
      control.markAsTouched()
    );
  }

  private shakeForm(): void {
    this.shake = !this.shake;
  }
}