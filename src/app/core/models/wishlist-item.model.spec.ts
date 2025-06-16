import { IWishlistItem } from './wishlist-Item.model';

describe('IWishlistItem Model', () => {
  
  let wishlistItem: IWishlistItem;

  beforeEach(() => {
    wishlistItem = {
      Id: 1,
      userId: 101,
      productId: 202,
      productName: 'Modern Chair',
      productImage: 'https://example.com/images/chair.jpg',
      productPrice: 129.99,
      addedAt: new Date().toISOString(), // ISO string format
    };
  });

  it('should create a WishlistItem with valid data', () => {
    expect(wishlistItem).toBeDefined();
    expect(wishlistItem.Id).toBe(1);
    expect(wishlistItem.userId).toBe(101);
    expect(wishlistItem.productId).toBe(202);
    expect(wishlistItem.productName).toBe('Modern Chair');
    expect(wishlistItem.productImage).toBe('https://example.com/images/chair.jpg');
    expect(wishlistItem.productPrice).toBe(129.99);
    expect(wishlistItem.addedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/); // ISO string format
  });

  it('should have a valid price', () => {
    expect(wishlistItem.productPrice).toBeGreaterThan(0);
  });

  it('should have a valid addedAt date string', () => {
    expect(new Date(wishlistItem.addedAt).getTime()).toBeGreaterThan(0);
  });
});
