import { useEffect, useRef } from 'react';
import { audioEngine } from '../../lib/audio/AudioEngine';
import { useVisibility } from '../../lib/hooks/useVisibility';

interface AudioBridgeProps {
  score: number;
  muted: boolean;
}

export function AudioBridge({ score, muted }: AudioBridgeProps) {
  const visible = useVisibility();
  const prevMuted = useRef(muted);

  useEffect(() => {
    if (!muted) {
      audioEngine.ensureStarted().then(() => {
        audioEngine.setMuted(false);
        audioEngine.updateMood(score);
      });
    } else {
      audioEngine.setMuted(true);
    }
    prevMuted.current = muted;
  }, [muted, score]);

  useEffect(() => {
    audioEngine.updateMood(score);
  }, [score]);

  useEffect(() => {
    if (visible && !audioEngine.isMuted) {
      audioEngine.resumeIfSuspended();
      audioEngine.setMuted(false);
    } else if (!visible && !audioEngine.isMuted) {
      audioEngine.setMuted(true);
    }
  }, [visible]);

  useEffect(() => {
    return () => {
      audioEngine.destroy();
    };
  }, []);

  return null;
}