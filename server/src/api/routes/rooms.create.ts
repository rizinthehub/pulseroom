import type { RequestHandler } from 'express';
import { generateRoomCode } from '@/rooms/codeGenerator';
import { createRoom, readRoomState } from '@/redis/roomStore';
import { CreateRoomBodySchema } from '@/api/validators/zod-schemas';
import type { CreateRoomResponse } from '@/types/api';

export const createRoomRoute: RequestHandler = async (req, res, next) => {
  try {
    CreateRoomBodySchema.parse(req.body ?? {});

    const code = await generateRoomCode(async (c) => {
      const state = await readRoomState(c);
      return state !== null;
    });

    const now = Date.now();
    await createRoom(code, now);

    const response: CreateRoomResponse = {
      roomCode: code,
      createdAt: now,
      expiresAt: now + 7_200_000,
      joinUrl: `${req.protocol}://${req.get('host')}/r/${code}`,
      socketUrl: `${req.protocol}://${req.get('host')}`,
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};