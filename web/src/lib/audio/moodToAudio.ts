export interface AudioParams {
  oscAFreq: number;
  oscBFreq: number;
  filterCutoff: number;
  filterResonance: number;
  masterGain: number;
  noiseGain: number;
  lfoRate: number;
  lfoDepth: number;
}

export function moodToAudio(score: number): AudioParams {
  const normalized = (score + 100) / 200;

  return {
    oscAFreq: 80 + normalized * 250,
    oscBFreq: 65 + normalized * 200,
    filterCutoff: 200 + normalized * 2800,
    filterResonance: 0.5 + normalized * 3.5,
    masterGain: 0.08 + normalized * 0.20,
    noiseGain: 0.01 + normalized * 0.06,
    lfoRate: 0.3 + normalized * 2.5,
    lfoDepth: 5 + normalized * 40,
  };
}