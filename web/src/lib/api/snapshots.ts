import { apiFetch } from './client';
import type { GetSnapshotResponse } from '../../types/api';

export async function getSnapshot(id: string): Promise<GetSnapshotResponse> {
  return apiFetch<GetSnapshotResponse>(`/api/snapshots/${id}`);
}