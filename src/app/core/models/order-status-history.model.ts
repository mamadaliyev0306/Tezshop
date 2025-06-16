import { OrderStatus} from './enum/orderstuts.enum';
export interface OrderStatusHistory {
    id: number;
    orderId: number;
    status: string;
    changedAt: Date;
    changedBy: string;
    notes?: string;
    previousStatus: OrderStatus;
  }