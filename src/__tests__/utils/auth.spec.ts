import * as bcrypt from 'bcrypt';
import { generatePasswordHash, comparePassword } from '../../utils/auth.utils';

describe('generatePasswordHash', () => {
  it('should generate the hash which is different from original password', async () => {
    const plainPassword = 'password123';
    const hashedPassword = await generatePasswordHash(plainPassword);

    expect(hashedPassword).not.toEqual(plainPassword);
  });
});

describe('comparePassword', () => {
  it('should return true if the provided password matches the hashed password', async () => {
    const password = 'secret-password';
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await comparePassword(password, hashedPassword);

    expect(result).toBe(true);
  });

  it('should return false if the provided password does not match the hashed password', async () => {
    const password = 'secret-password';
    const hashedPassword = await bcrypt.hash('not-the-same-password', 10);

    const result = await comparePassword(password, hashedPassword);

    expect(result).toBe(false);
  });

  it('should return false if an error is thrown', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
      throw new Error('error');
    });

    const result = await comparePassword('password', 'hashedPassword');
    expect(result).toBe(false);
  });
});
