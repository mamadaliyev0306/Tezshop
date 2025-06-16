// src/app/models/blog-create.model.ts
export interface IBlogCreate {
    categoryId: number;
    title: string;
    imageUrl?: string;
    content: string;
    publishedAt: Date;
  }
  