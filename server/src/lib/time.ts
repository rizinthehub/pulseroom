export function now(): number {
  return Date.now();
}

export function monotonicMs(): number {
  const [sec, nanosec] = process.hrtime();
  return sec * 1000 + nanosec / 1_000_000;
}