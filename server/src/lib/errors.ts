import type { ErrorCode } from '@/types/api';

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    public status: number,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'AppError';
  }
}