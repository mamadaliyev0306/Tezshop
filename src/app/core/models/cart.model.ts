import { ICartItem } from './cart-item-model';
export interface ICart {
  id: number;
  userId: number;
  userName: string;  // Optional, agar kerak bo'lsa
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
  totalPrice: number;
  totalItems: number;
}