import { createOscillator, createFilter, createGain, createNoiseBuffer } from './oscillators';
import { moodToAudio, type AudioParams } from './moodToAudio';
import { AUDIO_PARAM_RAMP_MS, AUDIO_MUTE_FADE_MS, AUDIO_MASTER_GAIN_MAX, AUDIO_DISCONNECT_FADE_MS } from '../constants';

export class AudioEngine {
  private ctx?: AudioContext;
  private master?: GainNode;
  private oscA?: OscillatorNode;
  private oscB?: OscillatorNode;
  private filter?: BiquadFilterNode;
  private noiseSource?: AudioBufferSourceNode;
  private noiseGain?: GainNode;
  private lfo?: OscillatorNode;
  private lfoGain?: GainNode;
  private started = false;
  private muted = true;
  private currentParams: AudioParams | null = null;

  async ensureStarted(): Promise<void> {
    if (this.started) return;
    this.ctx = new AudioContext();

    this.master = createGain(this.ctx, 0);

    this.filter = createFilter(this.ctx, 400, 1);

    this.oscA = createOscillator(this.ctx, 120, 'sawtooth');
    this.oscB = createOscillator(this.ctx, 100, 'triangle');

    const oscMix = createGain(this.ctx, 0.3);
    this.oscA.connect(oscMix);
    this.oscB.connect(oscMix);
    oscMix.connect(this.filter);
    this.filter.connect(this.master);

    const noiseBuffer = createNoiseBuffer(this.ctx, 2);
    this.noiseSource = this.ctx.createBufferSource();
    this.noiseSource.buffer = noiseBuffer;
    this.noiseSource.loop = true;
    this.noiseGain = createGain(this.ctx, 0.02);
    this.noiseSource.connect(this.noiseGain);
    this.noiseGain.connect(this.master);

    this.lfo = createOscillator(this.ctx, 0.5, 'sine');
    this.lfoGain = createGain(this.ctx, 10);
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.oscA.detune);
    this.lfoGain.connect(this.oscB.detune);

    this.master.connect(this.ctx.destination);

    this.oscA.start();
    this.oscB.start();
    this.lfo.start();
    this.noiseSource.start();

    this.started = true;
  }

  async setMuted(m: boolean): Promise<void> {
    if (!this.ctx || !this.master) return;
    this.muted = m;
    const target = m ? 0 : Math.min(this.currentParams?.masterGain ?? 0.15, AUDIO_MASTER_GAIN_MAX);
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(target, this.ctx.currentTime + AUDIO_MUTE_FADE_MS / 1000);
  }

  updateMood(score: number): void {
    if (!this.ctx || !this.master || !this.oscA || !this.oscB || !this.filter || !this.lfo || !this.lfoGain || !this.noiseGain) return;
    const params = moodToAudio(score);
    this.currentParams = params;
    const now = this.ctx.currentTime;
    const rampEnd = now + AUDIO_PARAM_RAMP_MS / 1000;

    this.oscA.frequency.linearRampToValueAtTime(params.oscAFreq, rampEnd);
    this.oscB.frequency.linearRampToValueAtTime(params.oscBFreq, rampEnd);
    this.filter.frequency.linearRampToValueAtTime(params.filterCutoff, rampEnd);
    this.filter.Q.linearRampToValueAtTime(params.filterResonance, rampEnd);
    this.lfo.frequency.linearRampToValueAtTime(params.lfoRate, rampEnd);
    this.lfoGain.gain.linearRampToValueAtTime(params.lfoDepth, rampEnd);
    this.noiseGain.gain.linearRampToValueAtTime(params.noiseGain, rampEnd);

    if (!this.muted) {
      const targetGain = Math.min(params.masterGain, AUDIO_MASTER_GAIN_MAX);
      this.master.gain.linearRampToValueAtTime(targetGain, rampEnd);
    }
  }

  async resumeIfSuspended(): Promise<void> {
    if (this.ctx?.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  async destroy(): Promise<void> {
    if (!this.ctx) return;
    if (this.master) {
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.linearRampToValueAtTime(0, now + AUDIO_DISCONNECT_FADE_MS / 1000);
    }
    await new Promise((r) => setTimeout(r, AUDIO_DISCONNECT_FADE_MS + 100));
    await this.ctx.close();
    this.started = false;
    this.muted = true;
  }

  get isMuted(): boolean {
    return this.muted;
  }
}

export const audioEngine = new AudioEngine();