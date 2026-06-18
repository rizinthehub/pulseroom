import { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomConnection } from '../lib/hooks/useRoomConnection';
import { useRoomState } from '../lib/state/RoomStateContext';
import { useSocket } from '../lib/hooks/useSocket';
import { formatRoomCode } from '../lib/utils';
import { useInterval } from '../lib/hooks/useInterval';
import { LoadingState } from '../components/feedback/LoadingState';
import { ErrorState } from '../components/feedback/ErrorState';
import { AmbientBackground } from '../components/room/AmbientBackground';
import { ParticleField } from '../components/room/ParticleField';
import { PulseCircle } from '../components/room/PulseCircle';
import { MoodGraph } from '../components/room/MoodGraph';
import { ConnectionBadge } from '../components/room/ConnectionBadge';
import { RoomCodeChip } from '../components/room/RoomCodeChip';
import { ReactionRow } from '../components/room/ReactionRow';
import { LeaveButton } from '../components/room/LeaveButton';
import { MuteToggle } from '../components/room/MuteToggle';
import { AudioBridge } from '../components/room/AudioBridge';
import { SnapshotButton } from '../components/room/SnapshotButton';
import { useToast } from '../components/feedback/ToastProvider';
import { COPY } from '../lib/copy';
import { CONNECT_COLD_START_HINT_MS } from '../lib/constants';
import { useSystemNotice } from '../lib/hooks/useSystemNotice';

export default function RoomRoute() {
  const { roomCode = '' } = useParams<{ roomCode: string }>();
  const code = formatRoomCode(roomCode);
  useRoomConnection(code);
  useSystemNotice();

  const state = useRoomState();
  const { socket } = useSocket();
  const toast = useToast();
  const [nowMs, setNowMs] = useState(Date.now());
  const [muted, setMuted] = useState(true);
  const [coldStart, setColdStart] = useState(false);

  const toggleMute = useCallback(() => setMuted((m) => !m), []);

  useInterval(() => setNowMs(Date.now()), 500);

  useEffect(() => {
    document.title = `PulseRoom — ${code}`;
    return () => { document.title = 'PulseRoom'; };
  }, [code]);

  useEffect(() => {
    if (state.connection === 'connecting') {
      const timer = setTimeout(() => setColdStart(true), CONNECT_COLD_START_HINT_MS);
      return () => clearTimeout(timer);
    }
    setColdStart(false);
  }, [state.connection]);

  useEffect(() => {
    if (state.connection === 'reconnecting') {
      toast.push({ kind: 'info', message: 'Connection lost. Reconnecting…' });
    }
  }, [state.connection]);

  const history = useMemo(() => state.history, [state.history]);

  if (state.connection === 'disconnected') {
    return (
      <ErrorState
        title={COPY['room.error.lost.title']}
        message={COPY['room.error.lost.message']}
        action={{ label: COPY['action.refresh'], onClick: () => window.location.reload() }}
      />
    );
  }

  if (state.connection === 'connecting' || state.connection === 'idle') {
    return (
      <LoadingState
        title={coldStart ? COPY['room.loading.coldStart'] : COPY['room.loading.title']}
        message={coldStart ? 'This may take up to 30 seconds on first connection.' : undefined}
      />
    );
  }

  return (
    <>
      <AudioBridge score={state.mood.score} muted={muted} />
      <AmbientBackground mood={state.mood.score} />
      <ParticleField mood={state.mood.score} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-6">
        <div className="flex items-center gap-3 mt-4">
          <RoomCodeChip code={code} />
          <ConnectionBadge status={state.connection} />
        </div>

        <PulseCircle participantCount={state.participants} />
        <MoodGraph history={history} nowMs={nowMs} />

        <div className="text-text-secondary text-xs">
          mood: {state.mood.score}
        </div>

        <div className="flex items-center gap-3 mt-auto mb-8 flex-col">
          <ReactionRow
            disabled={state.connection !== 'connected'}
            onReact={(key) => socket.emit('reaction:send', { reactionKey: key })}
          />
          <div className="flex items-center gap-2">
            <SnapshotButton roomCode={code} />
            <MuteToggle muted={muted} onToggle={toggleMute} />
            <LeaveButton />
          </div>
        </div>
      </div>
    </>
  );
}