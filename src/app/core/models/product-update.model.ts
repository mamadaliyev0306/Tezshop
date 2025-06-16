export interface IUpdateProduct {
    id: number;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId: number;
    stockQuantity: number;
    isDeleted: boolean;
    userPhone?: string;
    userEmail?: string;
    discountedPrice: number;  
  }
  