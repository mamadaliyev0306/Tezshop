import { ISlider } from './slider.model';

describe('ISlider model', () => {
  it('should create a valid slider object', () => {
    const slider: ISlider = {
      id: 1,
      imageUrl: 'https://example.com/slider1.jpg',
      title: 'Welcome to Our Store',
      description: 'Check out the latest products and discounts.'
    };

    expect(slider.id).toBe(1);
    expect(slider.imageUrl).toBe('https://example.com/slider1.jpg');
    expect(slider.title).toBeDefined();
    expect(slider.description).toContain('latest');
  });

  it('should allow optional title and description', () => {
    const slider: ISlider = {
      id: 2,
      imageUrl: 'https://example.com/slider2.jpg'
      // title and description are optional
    };

    expect(slider.title).toBeUndefined();
    expect(slider.description).toBeUndefined();
    expect(slider.imageUrl).toMatch(/^https:\/\/example\.com/);
  });
});
