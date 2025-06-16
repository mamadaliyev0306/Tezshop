export interface ICreateOrderItem {
    orderId: number;
    productId: number;
    quantity: number;
    unitPrice: number;
  }
  export interface IUpdateOrderItem {
    id: number;
    quantity: number;
    unitPrice: number;
  }