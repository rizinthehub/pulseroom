import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSnapshot } from '../lib/api/snapshots';
import { SnapshotCard } from '../components/snapshot/SnapshotCard';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { Button } from '../components/ui/Button';
import { COPY } from '../lib/copy';
import type { SnapshotData } from '../types/snapshot';

export default function SnapshotRoute() {
  const { snapshotId = '' } = useParams<{ snapshotId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<SnapshotData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSnapshot(snapshotId)
      .then(setData)
      .catch(() => setError(true));
  }, [snapshotId]);

  if (error) {
    return (
      <ErrorState
        title={COPY['snapshot.error.notFound.title']}
        message={COPY['snapshot.error.notFound.message']}
        action={{ label: COPY['action.create'], onClick: () => navigate('/') }}
      />
    );
  }

  if (!data) {
    return <LoadingState title="Loading snapshot…" />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 gap-6">
      <SnapshotCard data={data} />
      <p className="text-xs text-text-tertiary">
        Captured {new Date(data.capturedAt).toLocaleString()} in room {data.roomCode}. This snapshot doesn't update.
      </p>
      <Button onClick={() => navigate('/')}>{COPY['action.create']}</Button>
    </div>
  );
}