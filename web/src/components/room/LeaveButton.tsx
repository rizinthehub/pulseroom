import { useNavigate } from 'react-router-dom';
import { IconButton } from '../ui/IconButton';
import { LogOut } from 'lucide-react';
import { useRoomDispatch } from '../../lib/state/RoomStateContext';
import { destroySocket } from '../../lib/socket/client';
import { COPY } from '../../lib/copy';

export function LeaveButton() {
  const navigate = useNavigate();
  const dispatch = useRoomDispatch();

  const handleLeave = () => {
    destroySocket();
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <IconButton
      icon={<LogOut size={18} />}
      label={COPY['action.leave']}
      onClick={handleLeave}
    />
  );
}