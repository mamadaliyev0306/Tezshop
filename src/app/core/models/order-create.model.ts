import { ICreateOrderItem } from "./order-item-create.model";
export interface ICreateOrder {
    userId: number;
    shippingAddressId: number;
    paymentMethod: string;
    orderItems: ICreateOrderItem[];
  }