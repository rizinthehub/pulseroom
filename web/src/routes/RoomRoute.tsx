import { useParams } from 'react-router-dom';
import { useRoomConnection } from '../lib/hooks/useRoomConnection';
import { useRoomState } from '../lib/state/RoomStateContext';
import { useSocket } from '../lib/hooks/useSocket';
import { formatRoomCode } from '../lib/utils';
import { LoadingState } from '../components/feedback/LoadingState';
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

  if (state.connection === 'connecting' || state.connection === 'idle') {
    return <LoadingState title={COPY['room.loading.title']} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 gap-6">
      <div className="flex items-center gap-3">
        <RoomCodeChip code={code} />
        <ConnectionBadge status={state.connection} />
      </div>

      <div className="text-center">
        <div className="text-6xl font-bold text-text-primary">
          {state.participants}
        </div>
        <p className="text-xs text-text-tertiary mt-1">PEOPLE TUNED IN</p>
      </div>

      <div className="text-text-secondary text-sm">
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
  );
}