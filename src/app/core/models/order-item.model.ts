export interface IOrderItem {
    id: number;
    productId: number;
    productName: string;
    productImageUrl?: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  