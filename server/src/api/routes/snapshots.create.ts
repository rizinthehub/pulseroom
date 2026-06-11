import type { RequestHandler } from 'express';
import { CreateSnapshotBodySchema } from '@/api/validators/zod-schemas';
import { AppError } from '@/lib/errors';
import { persistSnapshot } from '@/snapshots/snapshotStore';
import { buildSnapshotData } from '@/snapshots/snapshotPayload';
import type { Server as IOServer } from 'socket.io';
import type { RoomManager } from '@/rooms/RoomManager';
import { readRoomState } from '@/redis/roomStore';
import { Room } from '@/rooms/Room';

export function createSnapshotRoute(io: IOServer, roomManager: RoomManager): RequestHandler {
  return async (req, res, next) => {
    try {
      const { roomCode } = CreateSnapshotBodySchema.parse(req.body);

      let room = roomManager.get(roomCode);
      if (!room) {
        const state = await readRoomState(roomCode);
        if (!state) throw new AppError('ROOM_NOT_FOUND', 404);
        room = new Room(roomCode);
        room.score = state.score;
      }

      const data = await buildSnapshotData(room, io);
      await persistSnapshot(data);

      res.status(201).json({
        snapshotId: data.snapshotId,
        url: `/s/${data.snapshotId}`,
        data,
      });
    } catch (err) {
      next(err);
    }
  };
}