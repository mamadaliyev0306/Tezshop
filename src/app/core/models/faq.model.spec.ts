import { IFaq } from './faq.model';

describe('Faq model', () => {
  let faq: IFaq;

  beforeEach(() => {
    faq = {
      id: 1,
      title: 'Payment Issues',
      answer: 'Please contact support for billing-related questions.',
      categoryId: 2,
      categoryName: 'Billing',
      createdAt: new Date('2025-05-01T12:00:00Z'),
    };
  });

  it('should create a Faq with all required properties', () => {
    expect(faq.id).toBe(1);
    expect(faq.title).toBe('Payment Issues');
    expect(faq.answer).toContain('billing-related');
    expect(faq.categoryId).toBe(2);
    expect(faq.createdAt).toBeInstanceOf(Date);
  });

  it('should have optional categoryName', () => {
    expect(faq.categoryName).toBe('Billing');

    const faqWithoutCategoryName: IFaq = {
      ...faq,
      categoryName: undefined
    };

    expect(faqWithoutCategoryName.categoryName).toBeUndefined();
  });
});
