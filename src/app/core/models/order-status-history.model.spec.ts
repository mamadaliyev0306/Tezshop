import { OrderStatusHistory } from './order-status-history.model';
import { OrderStatus} from './enum/orderstuts.enum';
describe('OrderStatusHistory Model', () => {
  it('should create a valid OrderStatusHistory object', () => {
    const history: OrderStatusHistory = {
      id: 1,
      orderId: 123,
      status: OrderStatus.Processing,
      changedAt: new Date(),
      changedBy: 'Admin',
      notes: 'Status updated by admin',
      previousStatus: OrderStatus.Created
    };

    expect(history.id).toBe(1);
    expect(history.status).toBe(OrderStatus.Processing);
    expect(history.previousStatus).toBe(OrderStatus.Created);
  });

  it('should allow optional notes field', () => {
    const history: OrderStatusHistory = {
      id: 2,
      orderId: 456,
      status: OrderStatus.Shipped,
      changedAt: new Date(),
      changedBy: 'System',
      previousStatus: OrderStatus.Processing
    };

    expect(history.notes).toBeUndefined();
  });
});
