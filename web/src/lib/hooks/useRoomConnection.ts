import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../socket/client';
import { useRoomDispatch } from '../state/RoomStateContext';
import { setConnectionStatus } from '../socket/connectionState';
import type { Socket } from 'socket.io-client';
import type { RoomErrorPayload } from '../../types/socket-events';

export function useRoomConnection(roomCode: string) {
  const dispatch = useRoomDispatch();
  const navigate = useNavigate();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    const onConnect = () => {
      setConnectionStatus('connected');
      socket.emit('room:join', { roomCode });
    };

    const onDisconnect = () => {
      dispatch({ type: 'CONNECTION', status: 'reconnecting' });
    };

    const onHydrate = (payload: any) => {
      dispatch({ type: 'HYDRATE', payload });
    };

    const onMood = (payload: any) => {
      dispatch({ type: 'MOOD_UPDATE', payload });
    };

    const onCount = (payload: any) => {
      dispatch({ type: 'PARTICIPANT_COUNT', payload });
    };

    const onError = (payload: RoomErrorPayload) => {
      dispatch({ type: 'ERROR', payload });
      if (payload.code === 'ROOM_NOT_FOUND' || payload.code === 'ROOM_EXPIRED') {
        navigate('/');
      }
      if (payload.code === 'ROOM_FULL') {
        navigate('/');
      }
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('room:hydrate', onHydrate);
    socket.on('mood:update', onMood);
    socket.on('room:participant_count', onCount);
    socket.on('room:error', onError);

    dispatch({ type: 'CONNECTION', status: 'connecting' });

    if (!socket.connected) {
      socket.connect();
    } else {
      onConnect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('room:hydrate', onHydrate);
      socket.off('mood:update', onMood);
      socket.off('room:participant_count', onCount);
      socket.off('room:error', onError);
      socket.emit('room:leave', {});
    };
  }, [roomCode, dispatch, navigate]);
}