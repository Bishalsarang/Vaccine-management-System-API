import * as crypto from 'crypto';

/**
 * Calculates the SHA-256 hash of a file.
 *
 * @param {Express.Multer.File} file - The file to hash.
 * @return {string} The hexadecimal representation of the hash.
 */
export function calculateHash(file: Express.Multer.File): string {
  const hash = crypto.createHash('sha256');
  hash.update(file.buffer);

  return hash.digest('hex');
}
