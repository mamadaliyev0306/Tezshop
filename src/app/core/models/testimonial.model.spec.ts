import { ITestimonial } from './testimonial.model';

describe('ITestimonial Model', () => {
  it('should create a valid testimonial object', () => {
    const testimonial: ITestimonial = {
      id: 1,
      authorName: 'Ali Valiyev',
      content: 'Bu juda yaxshi xizmat!',
      imageUrl: 'https://example.com/image.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(testimonial).toBeDefined();
    expect(testimonial.id).toBe(1);
    expect(testimonial.authorName).toBe('Ali Valiyev');
    expect(testimonial.content).toContain('yaxshi');
    expect(testimonial.imageUrl).toMatch(/^https?:\/\//);
    expect(new Date(testimonial.createdAt)).toBeInstanceOf(Date);
    expect(new Date(testimonial.updatedAt)).toBeInstanceOf(Date);
  });

  it('should allow optional imageUrl', () => {
    const testimonial: ITestimonial = {
      id: 2,
      authorName: 'Laylo Karimova',
      content: 'Men mamnunman.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    expect(testimonial.imageUrl).toBeUndefined();
  });
});
