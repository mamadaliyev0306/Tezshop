export interface IProduct {
  id: number;
  userId:number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  categoryName: string;
  stockQuantity: number;
  userPhone?: string;
  userEmail?: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt?: Date;
  discountedPrice: number;  
  discountPercent: number; 
  averageRating: number;    
  totalOrders: number;
  isLiked?:boolean;  
}
export interface PaginatedProductsResponse {
  products: IProduct[];
  totalPages: number;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}



  
