import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRoomConnection } from '../lib/hooks/useRoomConnection';
import { useRoomState } from '../lib/state/RoomStateContext';
import { useSocket } from '../lib/hooks/useSocket';
import { formatRoomCode } from '../lib/utils';
import { useInterval } from '../lib/hooks/useInterval';
import { LoadingState } from '../components/feedback/LoadingState';
import { AmbientBackground } from '../components/room/AmbientBackground';
import { ParticleField } from '../components/room/ParticleField';
import { PulseCircle } from '../components/room/PulseCircle';
import { MoodGraph } from '../components/room/MoodGraph';
import { ConnectionBadge } from '../components/room/ConnectionBadge';
import { RoomCodeChip } from '../components/room/RoomCodeChip';
import { ReactionRow } from '../components/room/ReactionRow';
import { LeaveButton } from '../components/room/LeaveButton';
import { COPY } from '../lib/copy';

export default function RoomRoute() {
  const { roomCode = '' } = useParams<{ roomCode: string }>();
  const code = formatRoomCode(roomCode);
  useRoomConnection(code);

  const state = useRoomState();
  const { socket } = useSocket();
  const [nowMs, setNowMs] = useState(Date.now());

  useInterval(() => setNowMs(Date.now()), 500);

  useEffect(() => {
    document.title = `PulseRoom — ${code}`;
    return () => { document.title = 'PulseRoom'; };
  }, [code]);

  const history = useMemo(() => state.history, [state.history]);

  if (state.connection === 'connecting' || state.connection === 'idle') {
    return <LoadingState title={COPY['room.loading.title']} />;
  }

  return (
    <>
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

        <div className="mt-auto mb-8">
          <ReactionRow
            disabled={state.connection !== 'connected'}
            onReact={(key) => socket.emit('reaction:send', { reactionKey: key })}
          />
        </div>

        <div className="absolute bottom-4 right-4">
          <LeaveButton />
        </div>
      </div>
    </>
  );
}