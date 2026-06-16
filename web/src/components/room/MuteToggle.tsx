import { Volume2, VolumeX } from 'lucide-react';
import { IconButton } from '../ui/IconButton';
import { COPY } from '../../lib/copy';

interface MuteToggleProps {
  muted: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function MuteToggle({ muted, onToggle, disabled }: MuteToggleProps) {
  return (
    <IconButton
      icon={muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      label={muted ? COPY['audio.unmute'] : COPY['audio.mute']}
      onClick={onToggle}
      disabled={disabled}
    />
  );
}