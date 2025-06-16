import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderService } from '@core/services/order.service';
import { NotificationService } from '@core/services/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { ICart } from '@core/models/cart.model';
import { ICheckout } from '@core/models/order-Chekout.model';
import { PaymentMethod } from '@core/models/enum/paymentmetod.enum';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.scss'],
  imports:[MatButtonModule,CommonModule,MatInputModule,ReactiveFormsModule,MatFormFieldModule ,
    MatProgressSpinnerModule,MatIconModule ,MatDialogModule,MatSelectModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('shake', [
      transition('* => *', [
        style({ transform: 'translateX(0)' }),
        animate('100ms', style({ transform: 'translateX(-10px)' })),
        animate('100ms', style({ transform: 'translateX(10px)' })),
        animate('100ms', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class CheckoutDialogComponent implements OnInit {
  checkoutForm: FormGroup;
  paymentMethods = [
    { value: PaymentMethod.CreditCard, label: 'Kredit karta' },
    { value: PaymentMethod.PayPal, label: 'PayPal' },
    { value: PaymentMethod.Click, label: 'Click' },
    { value: PaymentMethod.Payme, label: 'Payme' },
    { value: PaymentMethod.Uzumbank, label: 'Uzumbank' }
];
  isLoading = false;
  shake = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<CheckoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cart: ICart }
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      paymentMethod: [PaymentMethod.Click, [Validators.required]],
      additionalNotes: ['']
    });
  }

  ngOnInit(): void {
    // Pre-fill form if user data exists
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user) {
      this.checkoutForm.patchValue({
        fullName: user.fullName || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.markFormAsTouched();
      this.shakeForm();
      this.notification.error('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring');
      return;
    }

    this.isLoading = true;
    const checkoutData: ICheckout = {
      ...this.checkoutForm.value,
      cartId: this.data.cart.id
    };

    this.orderService.createOrderFromCart(this.data.cart.userId, checkoutData).subscribe({
      next: () => {
        this.notification.success('Buyurtma muvaffaqiyatli qabul qilindi!');
        this.dialogRef.close('success');
      },
      error: (err) => {
        this.notification.error('Buyurtma berishda xatolik yuz berdi');
        this.isLoading = false;
      }
    });
  }

  private markFormAsTouched(): void {
    Object.values(this.checkoutForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  private shakeForm(): void {
    this.shake = !this.shake;
  }

  getPaymentMethodIcon(method: PaymentMethod): string {
    switch (method) {
      case PaymentMethod.Payme: return 'payme';
      case PaymentMethod.CreditCard: return 'credit_card';
      case PaymentMethod.Uzumbank: return 'Uzumbank';
      default: return 'payment';
    }
  }
}