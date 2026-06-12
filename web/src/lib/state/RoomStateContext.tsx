import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { roomReducer, initialState, type RoomState, type Action } from './roomReducer';

interface RoomStateContextValue {
  state: RoomState;
  dispatch: React.Dispatch<Action>;
}

const RoomStateContext = createContext<RoomStateContextValue | null>(null);

export function RoomStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(roomReducer, initialState);
  return (
    <RoomStateContext.Provider value={{ state, dispatch }}>
      {children}
    </RoomStateContext.Provider>
  );
}

export function useRoomState() {
  const ctx = useContext(RoomStateContext);
  if (!ctx) throw new Error('useRoomState must be used within RoomStateProvider');
  return ctx.state;
}

export function useRoomDispatch() {
  const ctx = useContext(RoomStateContext);
  if (!ctx) throw new Error('useRoomDispatch must be used within RoomStateProvider');
  return ctx.dispatch;
}