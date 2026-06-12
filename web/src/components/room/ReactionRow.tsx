import { REACTION_EMOJI, type ReactionKey } from '../../types/reaction';
import { ReactionButton } from './ReactionButton';

interface ReactionRowProps {
  disabled?: boolean;
  onReact: (key: ReactionKey) => void;
}

export function ReactionRow({ disabled, onReact }: ReactionRowProps) {
  const keys = Object.keys(REACTION_EMOJI) as ReactionKey[];

  return (
    <div className="flex gap-2">
      {keys.map((key) => (
        <ReactionButton
          key={key}
          emoji={REACTION_EMOJI[key]}
          reactionKey={key}
          disabled={disabled}
          onClick={() => onReact(key)}
        />
      ))}
    </div>
  );
}