export interface Level {
  name: string;
  minXP: number;
  maxXP: number;
  color: string;
}

export const levels: Level[] = [
  { name: 'Newcomer', minXP: 0, maxXP: 99, color: '#A0AEC0' },
  { name: 'Practitioner', minXP: 100, maxXP: 299, color: '#5B7B5E' },
  { name: 'Devotee', minXP: 300, maxXP: 599, color: '#C8A96E' },
  { name: 'Yogi', minXP: 600, maxXP: 999, color: '#6B5B8E' },
  { name: 'Enlightened', minXP: 1000, maxXP: Infinity, color: '#E8D5A8' },
];

export function getCurrentLevel(xp: number): Level {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].minXP) return levels[i];
  }
  return levels[0];
}

export function getProgressToNextLevel(xp: number): { percent: number; xpToNext: number } {
  const currentLevel = getCurrentLevel(xp);
  const currentIndex = levels.indexOf(currentLevel);
  if (currentIndex === levels.length - 1) {
    return { percent: 100, xpToNext: 0 };
  }
  const nextLevel = levels[currentIndex + 1];
  const xpInLevel = xp - currentLevel.minXP;
  const xpNeeded = nextLevel.minXP - currentLevel.minXP;
  return {
    percent: Math.round((xpInLevel / xpNeeded) * 100),
    xpToNext: nextLevel.minXP - xp,
  };
}

// XP rewards
export const XP_REWARDS = {
  MEDITATION_SESSION: 15,
  JOURNAL_ENTRY: 10,
  QUIZ_COMPLETE: 25,
  CHALLENGE_DAY: 10,
  CHALLENGE_COMPLETE: 100,
  POSE_MASTERED: 5,
  COMMUNITY_POST: 8,
  PREP_DAY: 10,
  STREAK_BONUS_7: 50,
  STREAK_BONUS_30: 200,
} as const;
