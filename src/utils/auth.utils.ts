import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

const configService = new ConfigService();

/**
 * Generate hashedPassword from plainPassword.
 *
 * @param plainPassword
 */
export async function generatePasswordHash(
  plainPassword: string,
): Promise<string> {
  const hashedPassword = await bcrypt.hash(
    plainPassword,
    parseInt(configService.get('SALT_ROUNDS', '10')),
  );

  return hashedPassword;
}

/**
 * Compare hash and password.
 *
 * @param {String} password
 * @param {String} hashedPassword
 * @returns {Boolean}
 */
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (err) {
    return false;
  }
}
