import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { createRoom } from '../../lib/api/rooms';
import { COPY } from '../../lib/copy';

export function CreateRoomButton() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await createRoom();
      navigate(`/r/${res.roomCode}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      size="lg"
      loading={loading}
      onClick={handleClick}
    >
      {loading ? COPY['landing.create.loading'] : COPY['landing.create']}
    </Button>
  );
}