export const REACTION_KEYS = ['confused', 'hot', 'love', 'laugh', 'dead'] as const;
export type ReactionKey = (typeof REACTION_KEYS)[number];

export const REACTION_WEIGHTS: Record<ReactionKey, number> = {
  confused: -8,
  hot: 12,
  love: 10,
  laugh: 8,
  dead: -15,
};

export const REACTION_EMOJI: Record<ReactionKey, string> = {
  confused: '😕',
  hot: '🔥',
  love: '❤️',
  laugh: '😂',
  dead: '💀',
};