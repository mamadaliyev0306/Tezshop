export interface SendEmailVerificationRequest {
    email: string;
  }
  
  export interface SendPasswordResetRequest {
    email: string;
    name: string;
    token?: string;
  }
  
  export interface SendWelcomeEmailRequest {
    email: string;
    name: string;
  }
  
  export interface SendAccountLockedEmailRequest {
    email: string;
    name: string;
  }
  
  export interface SendAccountUnlockedEmailRequest {
    email: string;
    name: string;
  }
  
  export interface SendOrderConfirmationRequest {
    email: string;
    name: string;
    orderId: string;
  }
  
  export interface SendPasswordChangedNotificationRequest {
    email: string;
    name: string;
  }
  
  export interface SendNewUserNotificationToAdminRequest {
    adminEmail: string;
    newUserEmail: string;
  }
  