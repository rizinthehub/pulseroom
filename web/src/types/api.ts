import type { SnapshotData } from './snapshot';

export const ERROR_CODES = {
  ROOM_NOT_FOUND: 'ROOM_NOT_FOUND',
  ROOM_EXPIRED: 'ROOM_EXPIRED',
  ROOM_FULL: 'ROOM_FULL',
  INVALID_PAYLOAD: 'INVALID_PAYLOAD',
  RATE_LIMIT: 'RATE_LIMIT',
  REDIS_UNAVAILABLE: 'REDIS_UNAVAILABLE',
  SNAPSHOT_NOT_FOUND: 'SNAPSHOT_NOT_FOUND',
  INTERNAL: 'INTERNAL',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface ApiErrorBody {
  error: {
    code: ErrorCode;
    message: string;
  };
}

export interface CreateRoomResponse {
  roomCode: string;
  createdAt: number;
  expiresAt: number;
  joinUrl: string;
  socketUrl: string;
}

export interface ValidateRoomResponse {
  roomCode: string;
  exists: true;
  expiresAt: number;
  participants: number;
}

export interface CreateSnapshotResponse {
  snapshotId: string;
  url: string;
  data: SnapshotData;
}

export type GetSnapshotResponse = SnapshotData;

export interface HealthResponse {
  status: 'ok' | 'degraded';
  uptime: number;
  redis: 'ok' | 'degraded';
}