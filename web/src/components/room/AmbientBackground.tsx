import { useReducedMotion } from '../../lib/hooks/useReducedMotion';
import { moodToColor } from '../../lib/mood/moodToColor';

interface AmbientBackgroundProps {
  mood: number;
}

export function AmbientBackground({ mood }: AmbientBackgroundProps) {
  const reduced = useReducedMotion();
  const bg = moodToColor(mood);

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundColor: bg,
        transition: reduced ? 'none' : 'background-color 2000ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-hidden
    />
  );
}