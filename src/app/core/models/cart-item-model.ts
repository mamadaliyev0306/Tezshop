import { IProduct } from "./product.model";

export interface ICartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  cartId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}




