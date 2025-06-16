export interface IProductFilter {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    searchQuery?: string;
    sortBy?: 'price' | 'name'; // faqat "price" yoki "name" bo'lishi mumkin
    isAscending?: boolean;
    minStockQuantity?: number;
  }
  