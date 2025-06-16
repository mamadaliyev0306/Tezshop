export interface IBlog {
    id: number;
    categoryId: number;
    categoryName: string;  // Category nomi (foydali bo'lsa)
    title: string;
    imageUrl?: string;  // Rasm URLi (ixtiyoriy)
    content: string;
    publishedAt: Date;
  }
  