export interface ITestimonial {
    id: number;
    authorName: string;
    content: string;
    imageUrl?: string;
    createdAt: string; // ISO format
    updatedAt: string;
  }
  export interface ICreateTestimonial {
    authorName: string;
    content: string;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }