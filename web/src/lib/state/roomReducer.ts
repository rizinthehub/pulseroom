import type { MoodPoint } from '../../types/room';
import type {
  RoomHydratePayload,
  MoodUpdatePayload,
  RoomParticipantCountPayload,
  RoomErrorPayload,
} from '../../types/socket-events';
import type { ErrorCode } from '../../types/api';
import { MOOD_HISTORY_MAX_POINTS } from '../constants';

export interface RoomState {
  connection: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';
  roomCode: string | null;
  mood: { score: number; at: number };
  participants: number;
  history: MoodPoint[];
  lastError: { code: ErrorCode; message: string } | null;
}

export const initialState: RoomState = {
  connection: 'idle',
  roomCode: null,
  mood: { score: 0, at: 0 },
  participants: 0,
  history: [],
  lastError: null,
};

export type Action =
  | { type: 'CONNECTION'; status: RoomState['connection'] }
  | { type: 'HYDRATE'; payload: RoomHydratePayload }
  | { type: 'MOOD_UPDATE'; payload: MoodUpdatePayload }
  | { type: 'PARTICIPANT_COUNT'; payload: RoomParticipantCountPayload }
  | { type: 'ERROR'; payload: RoomErrorPayload }
  | { type: 'RESET' };

export function roomReducer(state: RoomState, action: Action): RoomState {
  switch (action.type) {
    case 'CONNECTION':
      return { ...state, connection: action.status };

    case 'HYDRATE':
      return {
        ...state,
        roomCode: action.payload.roomCode,
        mood: action.payload.mood,
        participants: action.payload.participants,
        history: action.payload.history,
        connection: 'connected',
        lastError: null,
      };

    case 'MOOD_UPDATE': {
      const newPoint: MoodPoint = {
        score: action.payload.score,
        at: action.payload.at,
      };
      const history = [...state.history, newPoint];
      while (history.length > MOOD_HISTORY_MAX_POINTS) {
        history.shift();
      }
      return {
        ...state,
        mood: { score: action.payload.score, at: action.payload.at },
        history,
      };
    }

    case 'PARTICIPANT_COUNT':
      return { ...state, participants: action.payload.participants };

    case 'ERROR':
      return { ...state, lastError: { code: action.payload.code as ErrorCode, message: action.payload.message } };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}