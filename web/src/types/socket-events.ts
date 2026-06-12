import type { ReactionKey } from './reaction';
import type { MoodPoint, MoodState } from './room';

// Client → Server
export interface RoomJoinPayload {
  roomCode: string;
}

export interface RoomLeavePayload {
  // empty
}

export interface ReactionSendPayload {
  reactionKey: ReactionKey;
}

export interface SnapshotRequestPayload {
  // empty
}

export interface PingClientPayload {
  sentAt: number;
}

// Server → Client
export interface RoomHydratePayload {
  roomCode: string;
  mood: MoodState;
  participants: number;
  history: MoodPoint[];
}

export interface RoomParticipantCountPayload {
  participants: number;
}

export interface MoodUpdatePayload {
  score: number;
  at: number;
}

export interface ReactionRejectedPayload {
  reason: 'RATE_LIMIT' | 'ROOM_NOT_JOINED';
}

export interface SnapshotCreatedPayload {
  snapshotId: string;
  url: string;
}

export interface RoomErrorPayload {
  code: string;
  message: string;
}

export interface PongServerPayload {
  sentAt: number;
  serverAt: number;
}

export interface SystemNoticePayload {
  kind: 'SERVER_SHUTDOWN' | 'ROOM_EXPIRED';
  message: string;
}

// Socket.io type maps
export interface ClientToServerEvents {
  'room:join': (payload: RoomJoinPayload) => void;
  'room:leave': (payload: RoomLeavePayload) => void;
  'reaction:send': (payload: ReactionSendPayload) => void;
  'snapshot:request': (payload: SnapshotRequestPayload) => void;
  'ping:client': (payload: PingClientPayload) => void;
}

export interface ServerToClientEvents {
  'room:hydrate': (payload: RoomHydratePayload) => void;
  'room:participant_count': (payload: RoomParticipantCountPayload) => void;
  'mood:update': (payload: MoodUpdatePayload) => void;
  'reaction:rejected': (payload: ReactionRejectedPayload) => void;
  'snapshot:created': (payload: SnapshotCreatedPayload) => void;
  'room:error': (payload: RoomErrorPayload) => void;
  'pong:server': (payload: PongServerPayload) => void;
  'system:notice': (payload: SystemNoticePayload) => void;
}