import { useReducedMotion } from '../../lib/hooks/useReducedMotion';
import { PULSE_PERIOD_MIN_MS, PULSE_PERIOD_MAX_MS, PULSE_AMPLITUDE_MIN, PULSE_AMPLITUDE_MAX } from '../../lib/constants';

interface PulseCircleProps {
  participantCount: number;
}

function pulseParams(count: number) {
  const normalized = Math.min(1, count / 80);
  const periodMs = PULSE_PERIOD_MAX_MS - normalized * (PULSE_PERIOD_MAX_MS - PULSE_PERIOD_MIN_MS);
  const amplitude = PULSE_AMPLITUDE_MIN + normalized * (PULSE_AMPLITUDE_MAX - PULSE_AMPLITUDE_MIN);
  return { periodMs, amplitude };
}

export function PulseCircle({ participantCount }: PulseCircleProps) {
  const reduced = useReducedMotion();
  const { periodMs, amplitude } = pulseParams(participantCount);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="rounded-full bg-white/5 border border-white/10"
        style={{
          width: 160,
          height: 160,
          animation: reduced
            ? 'none'
            : `pulse ${periodMs}ms ease-in-out infinite`,
          transform: reduced ? `scale(${1 + amplitude})` : undefined,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-bold text-text-primary tabular-nums">
          {participantCount}
        </span>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          45% { transform: scale(${1 + amplitude}); }
          50% { transform: scale(${1 + amplitude}); }
        }
      `}</style>
    </div>
  );
}