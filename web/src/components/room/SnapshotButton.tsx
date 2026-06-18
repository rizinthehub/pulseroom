import { useState } from 'react';
import { IconButton } from '../ui/IconButton';
import { Camera } from 'lucide-react';
import { useToast } from '../feedback/ToastProvider';
import { createSnapshot } from '../../lib/snapshot/createSnapshot';
import { COPY } from '../../lib/copy';

interface SnapshotButtonProps {
  roomCode: string;
}

export function SnapshotButton({ roomCode }: SnapshotButtonProps) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await createSnapshot(roomCode);
      toast.push({ kind: 'success', message: COPY['snapshot.success'] });
      navigator.clipboard.writeText(res.url).catch(() => {});
    } catch {
      toast.push({ kind: 'error', message: COPY['snapshot.error.create'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IconButton
      icon={loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Camera size={18} />}
      label={loading ? COPY['snapshot.loading'] : COPY['snapshot.button']}
      onClick={handleClick}
      disabled={loading}
    />
  );
}