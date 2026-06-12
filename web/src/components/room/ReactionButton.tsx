import { motion } from 'framer-motion';
import { useReducedMotion } from '../../lib/hooks/useReducedMotion';

interface ReactionButtonProps {
  emoji: string;
  reactionKey: string;
  disabled?: boolean;
  onClick: () => void;
}

export function ReactionButton({ emoji, disabled, onClick }: ReactionButtonProps) {
  const reduced = useReducedMotion();

  return (
    <motion.button
      className="w-12 h-12 flex items-center justify-center text-2xl rounded-full bg-surface-1 border border-border-default hover:bg-surface-2 active:scale-90 disabled:opacity-30 transition-colors duration-150"
      disabled={disabled}
      onClick={onClick}
      whileTap={reduced ? {} : { scale: 0.92 }}
      aria-label={emoji}
    >
      {emoji}
    </motion.button>
  );
}