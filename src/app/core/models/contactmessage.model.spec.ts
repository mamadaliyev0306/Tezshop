import { IContactMessage } from './contactmessage.model';  // IContactMessage interfeysini import qilish

describe('IContactMessage', () => {
  let contactMessage: IContactMessage;

  // Har bir testdan oldin contactMessage obyektini yaratish
  beforeEach(() => {
    contactMessage = {
      id: 1,
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      message: 'This is a test message',
      sentAt: new Date('2025-05-01T10:00:00Z'),
      isRead: false,
      isResponded: false,
      phoneNumber: '123-456-7890'  // Telefon raqami optional
    };
  });

  it('should have phoneNumber as optional', () => {
    // Telefon raqami mavjud bo‘lsa
    expect(contactMessage.phoneNumber).toBe('123-456-7890');

    // Telefon raqami yo‘q bo‘lsa ham obyekt ishlashini tekshirish
    const contactMessageWithoutPhone: IContactMessage = {
      ...contactMessage,
      phoneNumber: undefined
    };

    expect(contactMessageWithoutPhone.phoneNumber).toBeUndefined();
  });

  it('should store sentAt as Date type', () => {
    expect(contactMessage.sentAt).toBeInstanceOf(Date);
  });

  it('should have default values for isRead and isResponded', () => {
    expect(contactMessage.isRead).toBe(false);
    expect(contactMessage.isResponded).toBe(false);
  });

  it('should correctly set and get all properties', () => {
    expect(contactMessage.id).toBe(1);
    expect(contactMessage.fullName).toBe('John Doe');
    expect(contactMessage.email).toBe('johndoe@example.com');
    expect(contactMessage.message).toBe('This is a test message');
    expect(contactMessage.sentAt).toEqual(new Date('2025-05-01T10:00:00Z'));
    expect(contactMessage.isRead).toBe(false);
    expect(contactMessage.isResponded).toBe(false);
    expect(contactMessage.phoneNumber).toBe('123-456-7890');
  });
});


