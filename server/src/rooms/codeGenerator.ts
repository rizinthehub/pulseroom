import { randomInt } from 'node:crypto';

const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
const CODE_LENGTH = 6;
const MAX_GENERATION_ATTEMPTS = 5;

function randomCode(): string {
  let s = '';
  for (let i = 0; i < CODE_LENGTH; i++) {
    s += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return s;
}

export async function generateRoomCode(
  existsFn: (code: string) => Promise<boolean>,
): Promise<string> {
  for (let i = 0; i < MAX_GENERATION_ATTEMPTS; i++) {
    const candidate = randomCode();
    const exists = await existsFn(candidate);
    if (!exists) return candidate;
  }
  throw new Error('Failed to generate unique room code after maximum attempts');
}

export function isValidRoomCode(code: string): boolean {
  return /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/.test(code);
}

export function normalizeRoomCode(input: string): string {
  return input.trim().toUpperCase();
}