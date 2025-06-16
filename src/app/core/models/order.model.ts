import { OrderStatus} from './enum/orderstuts.enum';
import { PaymentMethod} from './enum/paymentmetod.enum';
import { IOrderItem } from './order-item.model';
import { OrderStatusHistory} from './order-status-history.model';
export interface IOrder {
  id: number;
  createdAt: string;
  updatedAt?: string;
  userId: number;
  userFullName: string;
  shippingAddressId: number;
  shippingAddressText: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  orderItems: IOrderItem[];
  payments: PaymentResponse[];
  statusHistories: OrderStatusHistory[];
  cancelledAt?: string;
  totalAmount: number;
  isDeleted: boolean;
}


