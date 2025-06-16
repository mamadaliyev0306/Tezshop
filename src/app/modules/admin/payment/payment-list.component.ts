import { Component, OnInit } from '@angular/core';
import { PaymentService } from '@core/services/payment.service';
import {
  IPayment,
  IRefundRequest,
  ICancelPaymentRequest,
} from '@core/models/payment.model';
import { IPaymentFilter } from '@core/models/payment-filter.model';
import { NotificationService } from '@core/services/notification.service';
import { PaymentStatus } from '@core/models/enum/paymentstatus.enum';
import { PaymentMethod } from '@core/models/enum/paymentmetod.enum';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
  imports: [CommonModule,RouterModule],
})
export class PaymentListComponent implements OnInit {
  payments: IPayment[] = [];
  filter: IPaymentFilter = {
    page: 1,
    pageSize: 5,
    userId:0,
    orderId:0,
    status: PaymentStatus.Cancelled,
    paymentMetod:PaymentMethod.Click,
    fromDate: 'null',
    toDate: 'null',
  };
  totalCount = 0;
  loading = false;
  showCancelModal = false;
  cancelReason = '';
  selectedPaymentId: number | null = null;

  constructor(
    private paymentService: PaymentService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.loading = true;
    this.paymentService.filterPayments(this.filter).subscribe({
      next: (res) => {
        this.payments = res.payments;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onFilterChange(): void {
    this.filter.page = 1;
    this.loadPayments();
  }

  onPageChange(page: number): void {
    this.filter.page = page;
    this.loadPayments();
  }

  openCancelModal(paymentId: number): void {
    this.selectedPaymentId = paymentId;
    this.cancelReason = '';
    this.showCancelModal = true;
  }

  confirmCancel(): void {
    if (!this.selectedPaymentId) return;
    const cancelDto: ICancelPaymentRequest = {
      reason: this.cancelReason || 'Bekor qilish sababi ko‘rsatilmagan',
    };
    this.paymentService.cancel(this.selectedPaymentId, cancelDto).subscribe(() => {
      this.notify.success('To‘lov bekor qilindi');
      this.showCancelModal = false;
      this.loadPayments();
    });
  }

  refundPayment(paymentId: number): void {
    const refundDto: IRefundRequest = {
     transactionId:'20',
      amount: 1000,
      reason: 'Mahsulot qaytarildi',
      requestedAt:new Date('2025-05-01T12:00:00Z')
    };
    this.paymentService.refund(paymentId, refundDto).subscribe(() => {
      this.notify.success('To‘lov qaytarildi');
      this.loadPayments();
    });
  }

  closeModal(): void {
    this.showCancelModal = false;
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.filter.pageSize);
  }
}
