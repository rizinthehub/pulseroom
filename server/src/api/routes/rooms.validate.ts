import type { RequestHandler } from 'express';
import { readRoomState } from '@/redis/roomStore';
import { ValidateRoomParamsSchema } from '@/api/validators/zod-schemas';
import { AppError } from '@/lib/errors';

export const validateRoomRoute: RequestHandler = async (req, res, next) => {
  try {
    const { code } = ValidateRoomParamsSchema.parse(req.params);

    const state = await readRoomState(code);
    if (!state) throw new AppError('ROOM_NOT_FOUND', 404);

    res.json({
      roomCode: code,
      exists: true,
      expiresAt: state.updatedAt + 7200_000,
      participants: 0,
    });
  } catch (err) {
    next(err);
  }
};