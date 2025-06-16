export interface IContactMessage {
    id: number;
    fullName: string;
    email: string;
    message: string;
    sentAt: Date;
    isRead: boolean;
    isResponded: boolean;
    phoneNumber?: string;
  }
  