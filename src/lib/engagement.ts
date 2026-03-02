export function getStreakStatus(lastActiveDate: string | null, currentStreak: number): {
  isActive: boolean;
  streakText: string;
  motivationalMessage: string;
} {
  if (!lastActiveDate) {
    return {
      isActive: false,
      streakText: '0 days',
      motivationalMessage: 'Begin your journey today — every practice starts with a single breath.',
    };
  }

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const isActive = lastActiveDate === today || lastActiveDate === yesterday;

  const streakText = `${currentStreak} day${currentStreak !== 1 ? 's' : ''}`;

  let motivationalMessage: string;
  if (currentStreak >= 30) {
    motivationalMessage = 'You are a beacon of dedication. Your practice has become part of who you are.';
  } else if (currentStreak >= 14) {
    motivationalMessage = 'Two weeks of commitment — you are building something beautiful.';
  } else if (currentStreak >= 7) {
    motivationalMessage = 'One full week! Your consistency is inspiring. Keep going.';
  } else if (currentStreak >= 3) {
    motivationalMessage = 'Momentum is building. Three days in a row shows true intention.';
  } else if (currentStreak >= 1) {
    motivationalMessage = 'Every journey begins with a single step. You have taken yours.';
  } else {
    motivationalMessage = 'Return to your practice — your mat is always waiting for you.';
  }

  return { isActive, streakText, motivationalMessage };
}

export function calculateMindfulnessScore(
  meditationCount: number,
  journalCount: number,
  practiceDays: number,
  streak: number
): number {
  // Weighted composite score 0-100
  const meditationScore = Math.min(meditationCount * 3, 30); // max 30
  const journalScore = Math.min(journalCount * 4, 25);       // max 25
  const practiceScore = Math.min(practiceDays * 2, 25);      // max 25
  const streakScore = Math.min(streak * 2, 20);              // max 20

  return Math.min(Math.round(meditationScore + journalScore + practiceScore + streakScore), 100);
}
