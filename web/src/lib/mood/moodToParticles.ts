export interface ParticleConfig {
  count: number;
  speed: number;
  size: number;
  opacity: number;
}

export function moodToParticles(score: number): ParticleConfig {
  const normalized = (score + 100) / 200; // 0..1 range
  return {
    count: Math.round(40 + normalized * 260),
    speed: 0.2 + normalized * 1.8,
    size: 1 + normalized * 2,
    opacity: 0.15 + normalized * 0.35,
  };
}