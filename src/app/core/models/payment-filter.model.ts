import { PaymentMethod } from "./enum/paymentmetod.enum";
import { PaymentStatus } from "./enum/paymentstatus.enum";

export interface IPaymentFilter {
    page: number;
    pageSize: number;
    fromDate?: string;
    toDate?: string;
    userId?: number;
    orderId?: number;
    status: PaymentStatus;
    paymentMetod:PaymentMethod;
  }
  