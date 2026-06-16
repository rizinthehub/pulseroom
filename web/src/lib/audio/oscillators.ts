export function createOscillator(
  ctx: AudioContext,
  frequency: number,
  type: OscillatorType = 'sawtooth',
): OscillatorNode {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = frequency;
  return osc;
}

export function createFilter(
  ctx: AudioContext,
  cutoff: number,
  resonance: number,
  type: BiquadFilterType = 'lowpass',
): BiquadFilterNode {
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = cutoff;
  filter.Q.value = resonance;
  return filter;
}

export function createGain(ctx: AudioContext, value: number): GainNode {
  const gain = ctx.createGain();
  gain.gain.value = value;
  return gain;
}

export function createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * duration;
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}