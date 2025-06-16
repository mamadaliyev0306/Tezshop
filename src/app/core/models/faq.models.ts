
   export interface IFaqCreate {
    title: string;
    answer: string;
    categoryId: number;
    categoryName?: string; // optional
    createdAt: Date;
  }
  
  export interface IFaqUpdate {
    title: string;
    answer: string;
    categoryId: number;
    categoryName?: string; 
  }
  