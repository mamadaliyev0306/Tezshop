export interface INewsletterSubscription {
    id: number;
    email: string;
    subscribedAt: Date;
    isActive: boolean;
  }
  export interface INewsletterSubscriptionCreate {
    email: string;
    subscribedAt: Date;
  }