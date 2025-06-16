export interface ICreateProduct {
    name: string;
    description?: string;
    price: number;
    stockquantity :number;
    ImageUrl:string;
    categoryId: number;
    userPhone?: string;
    userEmail?: string;
    discountedPrice: number;  
  }