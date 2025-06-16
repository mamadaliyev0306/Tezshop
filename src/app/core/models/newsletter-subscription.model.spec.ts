import { INewsletterSubscription } from './newsletter-subscription.model';

describe('INewsletterSubscription', () => {
  let subscription: INewsletterSubscription;

  beforeEach(() => {
    subscription = {
      id: 1,
      email: 'test@example.com',
      subscribedAt: new Date('2025-05-01T12:00:00Z'),
      isActive: true
    };
  });

  it('should have correct email format', () => {
    expect(subscription.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it('should store subscribedAt as a Date instance', () => {
    expect(subscription.subscribedAt).toBeInstanceOf(Date);
  });

  it('should have isActive true by default', () => {
    expect(subscription.isActive).toBe(true);
  });

  it('should allow all fields to be read correctly', () => {
    expect(subscription.id).toBe(1);
    expect(subscription.email).toBe('test@example.com');
    expect(subscription.subscribedAt.toISOString()).toBe('2025-05-01T12:00:00.000Z');
    expect(subscription.isActive).toBeTrue();
  });
});
