import { IProduct } from './product.model';

describe('IProduct Interface', () => {
  it('should create a product instance with required properties', () => {
    const product: IProduct = {
      id: 1,
      name: 'Smartphone',
      price: 499.99,
      categoryId: 1,
      stockQuantity: 50,
      isDeleted: false,
      createdAt: new Date('2001.12.12'),
      updatedAt:new Date('2001.12.12')
    };

    expect(product.id).toBe(1);
    expect(product.name).toBe('Smartphone');
    expect(product.price).toBe(499.99);
    expect(product.categoryId).toBe(1);
    expect(product.stockQuantity).toBe(50);
    expect(product.isDeleted).toBe(false);
  });

  it('should allow optional description and imageUrl', () => {
    const product: IProduct = {
      id: 2,
      name: 'Laptop',
      price: 999.99,
      categoryId: 2,
      stockQuantity: 30,
      isDeleted: false,
      description: 'High-end laptop with great performance',
      imageUrl: 'https://example.com/laptop.jpg',
      createdAt: new Date('2001.12.12'),
      updatedAt:new Date('2001.12.12')
    };

    expect(product.description).toBe('High-end laptop with great performance');
    expect(product.imageUrl).toBe('https://example.com/laptop.jpg');
  });

  it('should handle missing optional description and imageUrl', () => {
    const product: IProduct = {
      id: 3,
      name: 'Tablet',
      price: 299.99,
      categoryId: 3,
      stockQuantity: 10,
      isDeleted: false,
      createdAt: new Date('2001.12.12'),
      updatedAt:new Date('2001.12.12')
    };

    expect(product.description).toBeUndefined();
    expect(product.imageUrl).toBeUndefined();
  });

  it('should correctly handle product availability based on stockQuantity', () => {
    const inStockProduct: IProduct = {
      id: 4,
      name: 'Headphones',
      price: 79.99,
      categoryId: 4,
      stockQuantity: 100,
      isDeleted: false,
      createdAt: new Date('2001.12.12'),
      updatedAt:new Date('2001.12.12')
    };

    const outOfStockProduct: IProduct = {
      id: 5,
      name: 'Smartwatch',
      price: 199.99,
      categoryId: 5,
      stockQuantity: 0,
      isDeleted: false,
      createdAt: new Date('2001.12.12'),
      updatedAt:new Date('2001.12.12')
    };

    expect(inStockProduct.stockQuantity).toBeGreaterThan(0);
    expect(outOfStockProduct.stockQuantity).toBe(0);
  });

  it('should mark product as deleted correctly', () => {
    const deletedProduct: IProduct = {
      id: 6,
      name: 'Camera',
      price: 599.99,
      categoryId: 6,
      stockQuantity: 5,
      isDeleted: true,
      createdAt: new Date('2001.12.12'),
      updatedAt:new Date('2001.12.12')
    };

    expect(deletedProduct.isDeleted).toBe(true);
  });
});



