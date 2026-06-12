import { apiFetch } from './client';
import type { CreateRoomResponse, ValidateRoomResponse } from '../../types/api';

export async function createRoom(): Promise<CreateRoomResponse> {
  return apiFetch<CreateRoomResponse>('/api/rooms', {
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export async function validateRoom(code: string): Promise<ValidateRoomResponse> {
  return apiFetch<ValidateRoomResponse>(`/api/rooms/${code}`);
}