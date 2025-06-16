import { IPayment } from './payment.model';
import { PaymentStatus } from './enum/paymentstatus.enum';
import { PaymentMethod } from './enum/paymentmetod.enum';

describe('Payment Model', () => {
  let payment: IPayment;

  beforeEach(() => {
    payment = {
      id: 1,
      orderId: 123,
      amount: 100.50,
      currency: 'USD',
      paidAt: new Date(),
      status: PaymentStatus.Pending,
      paymentMethod: PaymentMethod.CreditCard,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should create a valid Payment object', () => {
    expect(payment).toBeTruthy();
    expect(payment.id).toBe(1);
    expect(payment.orderId).toBe(123);
    expect(payment.amount).toBe(100.50);
    expect(payment.currency).toBe('USD');
    expect(payment.status).toBe(PaymentStatus.Pending);
    expect(payment.paymentMethod).toBe(PaymentMethod.CreditCard);
    expect(payment.createdAt).toBeDefined();
    expect(payment.updatedAt).toBeDefined();
  });

  it('should allow optional fields', () => {
    payment.transactionId = 'txn_12345';
    payment.notes = 'Test payment';

    expect(payment.transactionId).toBe('txn_12345');
    expect(payment.notes).toBe('Test payment');
  });

  it('should handle the refundedAt property', () => {
    expect(payment.refundedAt).toBeUndefined(); // Initially undefined

    const refundDate = new Date();
    payment.refundedAt = refundDate;

    expect(payment.refundedAt).toBe(refundDate); // After assigning a value
  });

  it('should properly set the payment status and method', () => {
    payment.status = PaymentStatus.Completed;
    payment.paymentMethod = PaymentMethod.PayPal;

    expect(payment.status).toBe(PaymentStatus.Completed);
    expect(payment.paymentMethod).toBe(PaymentMethod.PayPal);
  });
});
