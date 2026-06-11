export interface SnapshotData {
  snapshotId: string;
  roomCode: string;
  capturedAt: number;
  score: number;
  participants: number;
  history: { at: number; score: number }[];
  reactionTotals: Record<string, number>;
  moodLabel: string;
  trend: string;
  schemaVersion: number;
}