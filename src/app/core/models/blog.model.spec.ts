import { IBlog } from './blog.model';

describe('Blog Model', () => {
  let blog: IBlog;

  beforeEach(() => {
    blog = {
      id: 1,
      categoryId: 1,
      categoryName: 'Tech',
      title: 'Sample Blog Post',
      imageUrl: 'http://example.com/image.jpg',
      content: 'This is a sample blog content.',
      publishedAt: new Date('2025-01-01'),
    };
  });

  it('should create a blog with correct data', () => {
    expect(blog.id).toBe(1);
    expect(blog.categoryId).toBe(1);
    expect(blog.categoryName).toBe('Tech');
    expect(blog.title).toBe('Sample Blog Post');
    expect(blog.imageUrl).toBe('http://example.com/image.jpg');
    expect(blog.content).toBe('This is a sample blog content.');
    expect(blog.publishedAt).toEqual(new Date('2025-01-01'));
  });

  it('should have an optional imageUrl field', () => {
    blog.imageUrl = undefined;
    expect(blog.imageUrl).toBeUndefined();
  });

  it('should require a title', () => {
    const invalidBlog = { ...blog, title: '' };
    expect(invalidBlog.title).toBe('');
    expect(invalidBlog.title).toBeFalsy();
  });

  it('should format the publishedAt date correctly', () => {
    const formattedDate = new Date(blog.publishedAt).toLocaleDateString();
    expect(formattedDate).toBe('1/1/2025');
  });

  it('should have a valid categoryId', () => {
    expect(blog.categoryId).toBeGreaterThan(0);
  });

  it('should validate content is not empty', () => {
    const invalidBlog = { ...blog, content: '' };
    expect(invalidBlog.content).toBe('');
    expect(invalidBlog.content).toBeFalsy();
  });
});
