import { z } from 'zod';
import { REACTION_KEYS } from '@/types/reaction';

const RoomCodeSchema = z
  .string()
  .regex(/^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/, 'Invalid room code format');

const SnapshotIdSchema = z
  .string()
  .regex(/^[A-Za-z0-9]{12}$/, 'Invalid snapshot id format');

// ─── REST ───

export const CreateRoomBodySchema = z.object({}).strict();

export const ValidateRoomParamsSchema = z.object({
  code: RoomCodeSchema,
});

export const CreateSnapshotBodySchema = z.object({
  roomCode: RoomCodeSchema,
  capturedAt: z.number().int().positive().optional(),
});

export const GetSnapshotParamsSchema = z.object({
  id: SnapshotIdSchema,
});

// ─── Socket payloads ───

export const RoomJoinPayloadSchema = z.object({
  roomCode: RoomCodeSchema,
}).strict();

export const RoomLeavePayloadSchema = z.object({}).strict();

export const ReactionSendPayloadSchema = z.object({
  reactionKey: z.enum(REACTION_KEYS),
}).strict();

export const SnapshotRequestPayloadSchema = z.object({}).strict();

export const PingClientPayloadSchema = z.object({
  sentAt: z.number().int().positive(),
}).strict();