import { ICartItem } from './cart-item-model';

describe('CartItem Model', () => {

  let cartItem: ICartItem;

  beforeEach(() => {
    // Test uchun yangi cart item yaratish
    cartItem = {
      cartItemId: 1,
      userId: 101,
      userName: 'John Doe',
      productId: 201,
      productName: 'Product 1',
      productImageUrl: 'http://example.com/product1.jpg',
      productPrice: 100,
      cartId: 301,
      quantity: 2,
      createdAt: new Date('2025-05-01T12:00:00Z'),
      updatedAt: new Date('2025-05-01T12:30:00Z')
    };
  });

  it('should create a valid cart item', () => {
    expect(cartItem.cartItemId).toBe(1);
    expect(cartItem.userId).toBe(101);
    expect(cartItem.userName).toBe('John Doe');
    expect(cartItem.productId).toBe(201);
    expect(cartItem.productName).toBe('Product 1');
    expect(cartItem.productImageUrl).toBe('http://example.com/product1.jpg');
    expect(cartItem.productPrice).toBe(100);
    expect(cartItem.cartId).toBe(301);
    expect(cartItem.quantity).toBe(2);
    expect(cartItem.createdAt).toEqual(new Date('2025-05-01T12:00:00Z'));
    expect(cartItem.updatedAt).toEqual(new Date('2025-05-01T12:30:00Z'));
  });

  it('should handle optional userName correctly', () => {
    const cartItemWithoutUserName: ICartItem = {
      cartItemId: 2,
      userId: 102,
      productId: 202,
      productName: 'Product 2',
      productImageUrl: 'http://example.com/product2.jpg',
      productPrice: 150,
      cartId: 302,
      quantity: 1,
      createdAt: new Date('2025-05-01T12:00:00Z'),
      updatedAt: new Date('2025-05-01T12:30:00Z'),
      userName: undefined
    };

    expect(cartItemWithoutUserName.userName).toBeUndefined();
  });

  it('should correctly calculate total price for cart item', () => {
    const totalPrice = cartItem.productPrice * cartItem.quantity;
    expect(totalPrice).toBe(200);  // 100 * 2 = 200
  });

});





