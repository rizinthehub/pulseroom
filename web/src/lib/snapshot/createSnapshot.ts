import { apiFetch } from '../api/client';
import type { CreateSnapshotResponse } from '../../types/api';

export async function createSnapshot(roomCode: string): Promise<CreateSnapshotResponse> {
  return apiFetch<CreateSnapshotResponse>('/api/snapshots', {
    method: 'POST',
    body: JSON.stringify({ roomCode }),
  });
}