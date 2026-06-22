import bcrypt from 'bcryptjs';
import { AUTH } from '@yene/shared';
import { logError } from '../../config/logger';
import { InternalServerError } from '../errors/AppError';

// ─── Hash Password ────────────────────────────────────────────────────────────
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(AUTH.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    logError('Failed to hash password', error);
    throw new InternalServerError('Failed to process password.');
  }
};

// ─── Compare Password ─────────────────────────────────────────────────────────
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    logError('Failed to compare password', error);
    throw new InternalServerError('Failed to verify password.');
  }
};

// ─── Generate Random Password ─────────────────────────────────────────────────
export const generateRandomPassword = (length: number = 12): string => {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()_+-=[]{}';
  const allChars = uppercase + lowercase + numbers + special;

  let password = '';

  // Ensure at least one of each required character type
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill remaining length with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to avoid predictable patterns
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

// ─── Is Password Strong ───────────────────────────────────────────────────────
export const isPasswordStrong = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar
  );
};

// ─── Get Password Strength Score ──────────────────────────────────────────────
export const getPasswordStrengthScore = (
  password: string,
): { score: number; label: 'weak' | 'fair' | 'good' | 'strong' } => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  if (password.length >= 16) score++;

  let label: 'weak' | 'fair' | 'good' | 'strong';
  if (score <= 2) label = 'weak';
  else if (score <= 4) label = 'fair';
  else if (score <= 6) label = 'good';
  else label = 'strong';

  return { score, label };
};

// ─── Hash Any String ──────────────────────────────────────────────────────────
// Used for hashing tokens, OTPs, etc.
export const hashString = async (value: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(value, salt);
  } catch (error) {
    logError('Failed to hash string', error);
    throw new InternalServerError('Failed to hash value.');
  }
};

// ─── Compare Hash ─────────────────────────────────────────────────────────────
export const compareHash = async (plainValue: string, hashedValue: string): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainValue, hashedValue);
  } catch (error) {
    logError('Failed to compare hash', error);
    throw new InternalServerError('Failed to verify value.');
  }
};
