export const COPY = {
  // ─── Landing ───
  'landing.headline': 'Feel the room.',
  'landing.subheading': 'An anonymous, real-time vibe meter. No accounts. Just energy.',
  'landing.create': 'Create Room',
  'landing.create.loading': 'Creating…',
  'landing.join': 'Join',
  'landing.code.placeholder': 'Enter room code',
  'landing.code.invalid': 'Code must be 6 characters',
  'landing.how.title': 'How it works',
  'landing.how.step1': 'Create a room in one click',
  'landing.how.step2': 'Share the code or link',
  'landing.how.step3': 'Feel the room come alive',

  // ─── Room ───
  'room.loading.title': 'Connecting…',
  'room.loading.coldStart': 'Waking server…',
  'room.error.expired.title': 'This room has ended',
  'room.error.expired.message': 'Rooms expire after 2 hours of inactivity.',
  'room.error.notFound.title': 'Room not found',
  'room.error.notFound.message': 'This room does not exist or has expired.',
  'room.error.full.title': 'Room is full',
  'room.error.full.message': 'This room has reached its maximum capacity.',
  'room.error.lost.title': 'Lost connection',
  'room.error.lost.message': 'Refresh to try again.',
  'room.reaction.tooFast': "You're reacting too fast — slow down",
  'room.reconnected': 'Reconnected',

  // ─── Snapshot ───
  'snapshot.button': 'Snapshot',
  'snapshot.loading': 'Capturing…',
  'snapshot.success': 'Snapshot saved! Link copied to clipboard.',
  'snapshot.error.create': 'Snapshot failed. Try again.',
  'snapshot.error.notFound.title': 'Snapshot not found',
  'snapshot.error.notFound.message': 'This snapshot may have expired.',
  'snapshot.caption': 'Captured {ago} in room {code}. This snapshot does not update.',

  // ─── Connection ───
  'connection.connected': 'Connected',
  'connection.reconnecting': 'Reconnecting…',
  'connection.disconnected': 'Disconnected',

  // ─── Audio ───
  'audio.mute': 'Mute',
  'audio.unmute': 'Unmute',
  'audio.unavailable': 'Audio unavailable on this device',

  // ─── Actions ───
  'action.leave': 'Leave',
  'action.create': 'Create a new room',
  'action.refresh': 'Refresh',
  'action.copy': 'Copy code',
  'action.copied': 'Copied!',

  // ─── Misc ───
  'toast.serverShutdown': 'Server restarting — reconnecting shortly.',
  'room.code.copied': 'Room code copied',
  'graph.empty': 'Waiting for the first reaction…',
} as const;