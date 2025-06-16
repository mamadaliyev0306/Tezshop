import { IUserRegister } from './user-register.model';
function validatePasswordMatch(user: IUserRegister): boolean {
  return user.password === user.confirmPassword;}
describe('IUserRegister Interface and validatePasswordMatch function', () => {
  it('should validate matching passwords', () => {
    const user: IUserRegister = {
      username: 'john_doe',
      firstName: 'John ',
      lastName:'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    expect(user.username).toBe('john_doe');
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.phoneNumber).toBe('1234567890');
    expect(user.email).toBe('john.doe@example.com');
    expect(validatePasswordMatch(user)).toBeTrue();
  });
});



