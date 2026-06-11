import type { RequestHandler } from 'express';
import { GetSnapshotParamsSchema } from '@/api/validators/zod-schemas';
import { readSnapshot } from '@/snapshots/snapshotStore';
import { AppError } from '@/lib/errors';

export const getSnapshotRoute: RequestHandler = async (req, res, next) => {
  try {
    const { id } = GetSnapshotParamsSchema.parse(req.params);

    const data = await readSnapshot(id);
    if (!data) throw new AppError('SNAPSHOT_NOT_FOUND', 404);

    res.json(data);
  } catch (err) {
    next(err);
  }
};