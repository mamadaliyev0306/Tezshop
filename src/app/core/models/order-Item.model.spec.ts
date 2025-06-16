import { IOrderItem } from './order-item.model';

describe('OrderItem model', () => {
  let orderItem: IOrderItem;

  beforeEach(() => {
    orderItem = {
      id: 1,
      productId: 101,
      productName: 'Sample Product',
      productImageUrl: 'https://example.com/product.jpg',
      quantity: 3,
      unitPrice: 50,
      totalPrice: 150
    };
  });

  it('should correctly assign basic properties', () => {
    expect(orderItem.id).toBe(1);
    expect(orderItem.productId).toBe(101);
    expect(orderItem.productName).toBe('Sample Product');
    expect(orderItem.productImageUrl).toBe('https://example.com/product.jpg');
    expect(orderItem.quantity).toBe(3);
    expect(orderItem.unitPrice).toBe(50);
  });

  it('should calculate totalPrice correctly', () => {
    const expectedTotal = orderItem.quantity * orderItem.unitPrice;
    expect(orderItem.totalPrice).toBe(expectedTotal);
  });

  it('should allow optional productImageUrl', () => {
    const itemWithoutImage: IOrderItem = {
      ...orderItem,
      productImageUrl: undefined
    };
    expect(itemWithoutImage.productImageUrl).toBeUndefined();
  });
});
