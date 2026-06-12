export interface MoodPoint {
  at: number;
  score: number;
}

export interface MoodState {
  score: number;
  at: number;
}

export interface RoomMeta {
  roomCode: string;
  createdAt: number;
  expiresAt: number;
  joinUrl: string;
  socketUrl: string;
}