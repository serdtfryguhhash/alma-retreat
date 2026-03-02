'use client';

import { motion } from 'framer-motion';
import { Play, Check, Trophy } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { challenges } from '@/lib/challenges';
import { XP_REWARDS } from '@/lib/gamification';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function ChallengesPage() {
  const challengeProgress = useAlmaStore((s) => s.challengeProgress);
  const startChallenge = useAlmaStore((s) => s.startChallenge);
  const completeDay = useAlmaStore((s) => s.completeDay);
  const addXP = useAlmaStore((s) => s.addXP);
  const updateDailyStreak = useAlmaStore((s) => s.updateDailyStreak);

  const today = new Date().toISOString().split('T')[0];

  const handleStart = (challengeId: string) => {
    startChallenge(challengeId);
  };

  const handleCompleteToday = (challengeId: string) => {
    completeDay(challengeId, today);
    addXP(XP_REWARDS.CHALLENGE_DAY);
    updateDailyStreak();

    // Check if challenge is complete
    const progress = challengeProgress.find((c) => c.challengeId === challengeId);
    const challenge = challenges.find((c) => c.id === challengeId);
    if (progress && challenge && progress.completedDays.length + 1 >= challenge.durationDays) {
      addXP(XP_REWARDS.CHALLENGE_COMPLETE);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
            Seasonal Challenges
          </h1>
          <p className="mt-3 text-[#2D2A26]/60">
            Commit to a seasonal wellness challenge and transform your practice.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C8A96E]" />
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {challenges.map((challenge) => {
            const progress = challengeProgress.find((c) => c.challengeId === challenge.id);
            const isStarted = !!progress;
            const completedCount = progress?.completedDays.length || 0;
            const isCompletedToday = progress?.completedDays.includes(today) || false;
            const isFinished = completedCount >= challenge.durationDays;
            const percent = Math.round((completedCount / challenge.durationDays) * 100);

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border p-6 transition-all ${
                  isFinished
                    ? 'border-[#C8A96E]/30 bg-gradient-to-br from-[#C8A96E]/5 to-[#C8A96E]/10'
                    : 'border-[#C8A96E]/10 bg-white/80 backdrop-blur-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{challenge.icon}</span>
                  {isFinished && <Trophy className="h-5 w-5 text-[#C8A96E]" />}
                </div>

                <h3
                  className="mt-3 font-[family-name:var(--font-playfair)] text-xl font-semibold"
                  style={{ color: challenge.color }}
                >
                  {challenge.title}
                </h3>
                <p className="mt-1 text-xs text-[#2D2A26]/40">
                  {challenge.season} · {challenge.durationDays} days
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#2D2A26]/60">
                  {challenge.description}
                </p>

                <div className="mt-3 rounded-lg bg-[#FAF8F5] p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#C8A96E]">
                    Daily Task
                  </p>
                  <p className="mt-1 text-xs text-[#2D2A26]/60">{challenge.dailyTask}</p>
                </div>

                {isStarted && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#2D2A26]/50">
                        {completedCount} / {challenge.durationDays} days
                      </span>
                      <span style={{ color: challenge.color }}>{percent}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#F5F2ED]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: challenge.color }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  {!isStarted && (
                    <button
                      onClick={() => handleStart(challenge.id)}
                      className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium text-white transition-colors"
                      style={{ backgroundColor: challenge.color }}
                    >
                      <Play className="h-3 w-3" /> Start Challenge
                    </button>
                  )}
                  {isStarted && !isFinished && !isCompletedToday && (
                    <button
                      onClick={() => handleCompleteToday(challenge.id)}
                      className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-medium text-white transition-colors"
                      style={{ backgroundColor: challenge.color }}
                    >
                      <Check className="h-3 w-3" /> Complete Today
                    </button>
                  )}
                  {isStarted && !isFinished && isCompletedToday && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#5B7B5E]/10 px-4 py-2 text-xs font-medium text-[#5B7B5E]">
                      <Check className="h-3 w-3" /> Done for today
                    </span>
                  )}
                  {isFinished && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#C8A96E]/10 px-4 py-2 text-xs font-medium text-[#C8A96E]">
                      <Trophy className="h-3 w-3" /> Challenge Complete!
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
