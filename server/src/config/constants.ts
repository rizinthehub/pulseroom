// ─── Room lifecycle ───
export const ROOM_TTL_SECONDS = 7200;
export const ROOM_IDLE_TICK_STOP_MS = 30_000;
export const ROOM_IDLE_DROP_MS = 5 * 60 * 1000;
export const ROOM_CLEANUP_SCAN_INTERVAL_MS = 60_000;

// ─── Capacity ───
export const SOFT_CAP_PER_ROOM = 80;
export const HARD_CAP_PER_ROOM = 150;

// ─── Mood engine ───
export const MOOD_MIN = -100;
export const MOOD_MAX = +100;
export const DECAY_PER_SEC = 0.03;
export const QUIET_GRACE_MS = 2000;
export const ZERO_SNAP_THRESHOLD = 0.5;
export const PER_SOCKET_CONTRIBUTION_CAP = 80;
export const PER_SOCKET_CONTRIBUTION_WINDOW_MS = 60_000;

// ─── Broadcast / tick ───
export const TICK_INTERVAL_MS = 250;
export const DECAY_TICK_INTERVAL_MS = 1000;
export const MIN_DELTA_FOR_BROADCAST = 0.5;
export const MAX_QUIET_INTERVAL_MS = 1500;
export const MOOD_HISTORY_WINDOW_MS = 60_000;
export const MOOD_HISTORY_MAX_POINTS = 240;

// ─── Redis persistence ───
export const REDIS_PERSIST_MIN_DELTA = 5;
export const REDIS_PERSIST_MAX_INTERVAL_MS = 10_000;

// ─── Rate limiting ───
export const REACTION_RATE_BUCKET_CAPACITY = 4;
export const REACTION_RATE_REFILL_PER_SEC = 2;
export const HTTP_RATE_LIMIT_PER_MIN = 30;

// ─── Snapshots ───
export const SNAPSHOT_ID_LENGTH = 12;
export const SNAPSHOT_TTL_SECONDS = 604800;

// ─── Socket.io ───
export const SOCKET_PING_INTERVAL_MS = 25_000;
export const SOCKET_PING_TIMEOUT_MS = 20_000;

// ─── Keep-alive ───
export const KEEPALIVE_DEFAULT_INTERVAL_MS = 10 * 60_000;