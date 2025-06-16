export interface RefreshToken {
    id: number;
    token: string;
    createdAt: string; // DateTime
    expiresAt: string; // DateTime
    isRevoked: boolean;
    revokedAt?: string; // DateTime | null
    replacedByToken?: string;
    reasonRevoked?: string;
    userId: number;
    isExpired: boolean;
    isActive: boolean;
    resetPasswordToken?: string;
    resetPasswordTokenExpires: string; // DateTime
  }
  