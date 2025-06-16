export interface IWishlistItem {
    Id: number;
    userId: number;
    productId: number;
    productName: string;
    productImage: string;
    productPrice: number;
    addedAt: string; // ISO string format
  }

export interface IWishlistItemCreate {
  userId: number;
  productId: number;
}