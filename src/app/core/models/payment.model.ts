import {PaymentMethod} from './enum/paymentmetod.enum';
import {PaymentStatus} from './enum/paymentstatus.enum';
export interface IPayment {
    id: number;
    orderId: number;
    amount: number;
    currency: string;
    paidAt: Date;
    status: PaymentStatus;
    transactionId?: string;
    paymentMethod: PaymentMethod;
    notes?: string;
    createdAt: Date;
    updatedAt?: Date;
    refundedAt?: Date;
  }
  export interface IPaymentCreate {
    orderId: number;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    transactionId?: string;
    notes?: string;
  }
  
  export interface IPaymentStatistics {
    totalMonthlyAmount: number;
    totalDailyAmount: number;
    totalWeeklyAmount: number;
    completedPayments: number;
    failedPayments: number;
    refundedPayments: number;
    pendingPayments: number;
    popularPaymentMethod?: string;
    fromDate: Date;
    toDate: Date;
  }
  
  export interface IPaginatedPaymentResponse {
    payments: IPayment[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
  }
  
  export interface IRefundRequest {
    transactionId: string;
    amount: number;
    reason: string;
    requestedAt: Date;
  }
  
  export interface ICancelPaymentRequest {
    reason: string;
  }
  
  export interface IPaymentDetailsUpdate {
    amount: number;
    currency: string;
    notes?: string;
    paymentMethod: PaymentMethod;
    expiryDate?: Date;
    estimatedDeliveryDate?: Date;
    sourceUrl: string;
    metadata: string;
  }
  
  export interface IPaymentCallback {
    paymentId: number;
    success: boolean;
    transactionId?: string;
    message?: string;
  }