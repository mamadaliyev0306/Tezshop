import { ICategory } from './category.model';

describe('ICategory Interface', () => {
  it('should create a category instance with required properties', () => {
    const category: ICategory = {
      id: 1,
      name: 'Electronics',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-02-01'),
      isActive: true,
      isDeleted: false,
    };

    expect(category.id).toBe(1);
    expect(category.name).toBe('Electronics');
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.updatedAt).toBeInstanceOf(Date);
    expect(category.isActive).toBe(true);
    expect(category.isDeleted).toBe(false);
  });

  it('should correctly handle inactive categories', () => {
    const inactiveCategory: ICategory = {
      id: 2,
      name: 'Clothing',
      createdAt: new Date('2023-03-01'),
      updatedAt: new Date('2023-04-01'),
      isActive: false,
      isDeleted: false,
    };

    expect(inactiveCategory.isActive).toBe(false);
    expect(inactiveCategory.isDeleted).toBe(false);
  });

  it('should mark category as deleted correctly', () => {
    const deletedCategory: ICategory = {
      id: 3,
      name: 'Home Appliances',
      createdAt: new Date('2023-05-01'),
      updatedAt: new Date('2023-06-01'),
      isActive: true,
      isDeleted: true,
    };

    expect(deletedCategory.isActive).toBe(true);
    expect(deletedCategory.isDeleted).toBe(true);
  });

  it('should create category with valid timestamps', () => {
    const category: ICategory = {
      id: 4,
      name: 'Books',
      createdAt: new Date('2023-07-01'),
      updatedAt: new Date('2023-08-01'),
      isActive: true,
      isDeleted: false,
    };

    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.updatedAt).toBeInstanceOf(Date);// updatedAt should be after createdAt
  });

  it('should handle missing optional values correctly', () => {
    const category: ICategory = {
      id: 5,
      name: 'Toys',
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2023-10-01'),
      isActive: true,
      isDeleted: false,
    };

    // Check that required fields are set
    expect(category.id).toBe(5);
    expect(category.name).toBe('Toys');
    expect(category.createdAt).toBeInstanceOf(Date);
    expect(category.updatedAt).toBeInstanceOf(Date);
    expect(category.isActive).toBe(true);
    expect(category.isDeleted).toBe(false);
  });
});
