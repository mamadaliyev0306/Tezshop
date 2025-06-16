import { RefreshToken } from './refresh-token.model';

describe('RefreshToken Model', () => {
  let refreshToken: RefreshToken;

  beforeEach(() => {
    refreshToken = {
      id: 1,
      token: 'sample-token',
      createdAt: '2025-05-01T00:00:00Z',
      expiresAt: '2025-05-02T00:00:00Z',
      isRevoked: false,
      revokedAt: null!,
      replacedByToken: null!,
      reasonRevoked: null!,
      userId: 123,
      isExpired: false,
      isActive: true,
      resetPasswordToken: null!,
      resetPasswordTokenExpires: '2025-06-01T00:00:00Z',
    };
  });

  it('should create a valid RefreshToken object', () => {
    expect(refreshToken).toBeTruthy();
    expect(refreshToken.token).toBe('sample-token');
    expect(refreshToken.userId).toBe(123);
    expect(refreshToken.isActive).toBe(true);
  });

  it('should calculate isExpired correctly', () => {
    refreshToken.expiresAt = '2025-04-01T00:00:00Z';
    expect(refreshToken.isExpired).toBe(true);
  });

  it('should calculate isActive correctly', () => {
    refreshToken.isRevoked = true;
    expect(refreshToken.isActive).toBe(false);
  });

  it('should handle optional properties like revokedAt and replacedByToken', () => {
    expect(refreshToken.revokedAt).toBeNull();
    expect(refreshToken.replacedByToken).toBeNull();
  });
});
