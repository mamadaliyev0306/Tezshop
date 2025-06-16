import { ICart } from './cart.model';
import { ICartItem } from './cart-item-model';

describe('Cart Model', () => {

  it('should create a CartItem correctly', () => {
    const cartItem: ICartItem = {
      cartItemId: 1,
      productId: 456,
      productName: 'Product 1',
      productImageUrl: 'https://example.com/image.jpg',
      productPrice: 100,
      cartId: 789,
      quantity: 2,
      createdAt: new Date('2025-05-01T00:00:00Z'),
      updatedAt: new Date('2025-05-01T00:00:00Z')
    };

    expect(cartItem.cartItemId).toEqual(1);
    expect(cartItem.productName).toEqual('Product 1');
    expect(cartItem.productPrice).toEqual(100);
    expect(cartItem.quantity).toEqual(2);
    expect(cartItem.createdAt).toEqual(new Date('2025-05-01T00:00:00Z'));
    expect(cartItem.updatedAt).toEqual(new Date('2025-05-01T00:00:00Z'));
  });

  it('should create a Cart correctly', () => {
    const cart: ICart = {
      id: 1,
      userId: 123,
      userName: 'John Doe',
      items: [],
      createdAt: new Date('2025-05-01T00:00:00Z'),
      updatedAt: new Date('2025-05-01T00:00:00Z'),
      totalPrice: 0,
      totalItems: 0
    };

    expect(cart.id).toEqual(1);
    expect(cart.userId).toEqual(123);
    expect(cart.userName).toEqual('John Doe');
    expect(cart.items).toEqual([]);
    expect(cart.createdAt).toEqual(new Date('2025-05-01T00:00:00Z'));
    expect(cart.updatedAt).toEqual(new Date('2025-05-01T00:00:00Z'));
    expect(cart.totalPrice).toEqual(0);
    expect(cart.totalItems).toEqual(0);
  });

  it('should correctly calculate totalPrice in Cart', () => {
    const cart: ICart = {
      id: 1,
      userId: 123,
      userName: 'John Doe',
      items: [
        {
          cartItemId: 1,
          productId: 456,
          productName: 'Product 1',
          productImageUrl: 'https://example.com/image.jpg',
          productPrice: 100,
          cartId: 789,
          quantity: 2,
          createdAt: new Date('2025-05-01T00:00:00Z'),
          updatedAt: new Date('2025-05-01T00:00:00Z')
        },
        {
          cartItemId: 2,
          productId: 789,
          productName: 'Product 2',
          productImageUrl: 'https://example.com/image2.jpg',
          productPrice: 50,
          cartId: 789,
          quantity: 1,
          createdAt: new Date('2025-05-01T00:00:00Z'),
          updatedAt: new Date('2025-05-01T00:00:00Z')
        }
      ],
      createdAt: new Date('2025-05-01T00:00:00Z'),
      updatedAt: new Date('2025-05-01T00:00:00Z'),
      totalPrice: 0,
      totalItems: 0
    };

    // Updating totalPrice and totalItems based on cart items
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    expect(cart.totalPrice).toEqual(250);  // (100*2) + (50*1) = 250
    expect(cart.totalItems).toEqual(3);   // 2 + 1 = 3
  });

  it('should correctly calculate totalItems in Cart', () => {
    const cart: ICart = {
      id: 1,
      userId: 123,
      userName: 'John Doe',
      items: [
        {
          cartItemId: 1,
          productId: 456,
          productName: 'Product 1',
          productImageUrl: 'https://example.com/image.jpg',
          productPrice: 100,
          cartId: 789,
          quantity: 2,
          createdAt: new Date('2025-05-01T00:00:00Z'),
          updatedAt: new Date('2025-05-01T00:00:00Z')
        },
        {
          cartItemId: 2,
          productId: 789,
          productName: 'Product 2',
          productImageUrl: 'https://example.com/image2.jpg',
          productPrice: 50,
          cartId: 789,
          quantity: 1,
          createdAt: new Date('2025-05-01T00:00:00Z'),
          updatedAt: new Date('2025-05-01T00:00:00Z')
        }
      ],
      createdAt: new Date('2025-05-01T00:00:00Z'),
      updatedAt: new Date('2025-05-01T00:00:00Z'),
      totalPrice: 0,
      totalItems: 0
    };

    // Updating totalPrice and totalItems based on cart items
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    expect(cart.totalItems).toEqual(3);   // 2 + 1 = 3
  });

});


