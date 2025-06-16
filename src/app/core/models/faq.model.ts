export interface IFaq {
    id: number;
    title: string;
    answer: string;
    categoryId: number;
    categoryName?: string; // optional
    createdAt: Date;
  }
  