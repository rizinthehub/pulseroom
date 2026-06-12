import { useClipboard } from '../../lib/hooks/useClipboard';
import { Chip } from '../ui/Chip';
import { COPY } from '../../lib/copy';

interface RoomCodeChipProps {
  code: string;
}

export function RoomCodeChip({ code }: RoomCodeChipProps) {
  const { copied, copy } = useClipboard();

  return (
    <Chip onClick={() => copy(code)} copied={copied}>
      {copied ? COPY['action.copied'] : code}
    </Chip>
  );
}