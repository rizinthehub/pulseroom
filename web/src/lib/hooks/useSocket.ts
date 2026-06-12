import { useEffect, useState } from 'react';
import { getSocket } from '../socket/client';
import { subscribe, getConnectionStatus, type ConnectionStatus } from '../socket/connectionState';

export function useSocket() {
  const [status, setStatus] = useState<ConnectionStatus>(getConnectionStatus());
  const socket = getSocket();

  useEffect(() => {
    const unsub = subscribe(setStatus);
    return unsub;
  }, []);

  return { socket, status };
}