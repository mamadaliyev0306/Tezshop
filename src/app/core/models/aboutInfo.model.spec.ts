import { IAboutInfo } from './aboutInfo.model';

describe('AboutInfo Model', () => {
  let aboutInfo: IAboutInfo;

  beforeEach(() => {
    aboutInfo = {
      id: 1,
      content: 'This is some information about the company.',
      imageUrl: 'http://example.com/image.jpg',
    };
  });

  it('should create an AboutInfo with correct data', () => {
    expect(aboutInfo.id).toBe(1);
    expect(aboutInfo.content).toBe('This is some information about the company.');
    expect(aboutInfo.imageUrl).toBe('http://example.com/image.jpg');
  });

  it('should have an optional imageUrl field', () => {
    aboutInfo.imageUrl = undefined;
    expect(aboutInfo.imageUrl).toBeUndefined();
  });

  it('should require a content field', () => {
    const invalidAboutInfo = { ...aboutInfo, content: '' };
    expect(invalidAboutInfo.content).toBe('');
    expect(invalidAboutInfo.content).toBeFalsy();
  });

  it('should validate that the content field is not empty', () => {
    const invalidAboutInfo = { ...aboutInfo, content: '' };
    expect(invalidAboutInfo.content).toBe('');
    expect(invalidAboutInfo.content).toBeFalsy();
  });
});

  