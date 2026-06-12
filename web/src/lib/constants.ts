export const APP_NAME = 'PulseRoom';
export const ROOM_CODE_REGEX = /^[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{6}$/;
export const ROOM_CODE_LENGTH = 6;

export const MOOD_MIN = -100;
export const MOOD_MAX = +100;
export const MOOD_HISTORY_WINDOW_MS = 60_000;
export const MOOD_HISTORY_MAX_POINTS = 240;

export const CONNECT_COLD_START_HINT_MS = 3_000;
export const HYDRATE_TIMEOUT_MS = 10_000;

export const REACTION_COOLDOWN_MS = 500;
export const REACTION_REJECTED_TOAST_THRESHOLD = 3;
export const REACTION_REJECTED_TOAST_WINDOW_MS = 5_000;

export const TOAST_DURATION_DEFAULT_MS = 3_000;
export const TOAST_DURATION_ERROR_MS = 5_000;

export const AUDIO_PARAM_RAMP_MS = 1_500;
export const AUDIO_MUTE_FADE_MS = 400;
export const AUDIO_VISIBILITY_FADE_MS = 600;
export const AUDIO_DISCONNECT_FADE_MS = 800;
export const AUDIO_MASTER_GAIN_MAX = 0.28;

export const PARTICLE_MAX_COUNT = 300;

export const PULSE_PERIOD_MIN_MS = 2400;
export const PULSE_PERIOD_MAX_MS = 3200;
export const PULSE_AMPLITUDE_MIN = 0.02;
export const PULSE_AMPLITUDE_MAX = 0.08;