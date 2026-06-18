import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../socket/client';
import type { SystemNoticePayload } from '../../types/socket-events';

export function useSystemNotice() {
  const navigate = useNavigate();

  useEffect(() => {
    const socket = getSocket();

    const handler = (payload: SystemNoticePayload) => {
      if (payload.kind === 'ROOM_EXPIRED') {
        navigate('/');
      }
    };

    socket.on('system:notice', handler);
    return () => {
      socket.off('system:notice', handler);
    };
  }, [navigate]);
}