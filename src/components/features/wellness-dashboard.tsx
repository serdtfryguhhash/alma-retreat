'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Sparkles, Target, BookOpen } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { calculateMindfulnessScore } from '@/lib/engagement';
import { getCurrentLevel, getProgressToNextLevel } from '@/lib/gamification';
import { challenges } from '@/lib/challenges';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function WellnessDashboard() {
  const meditationSessions = useAlmaStore((s) => s.meditationSessions);
  const journalEntries = useAlmaStore((s) => s.journalEntries);
  const dailyStreak = useAlmaStore((s) => s.dailyStreak);
  const xp = useAlmaStore((s) => s.xp);
  const wellnessProfile = useAlmaStore((s) => s.wellnessProfile);
  const challengeProgress = useAlmaStore((s) => s.challengeProgress);

  const practiceDays = new Set(
    meditationSessions.map((s) => s.completedAt.split('T')[0])
  ).size;

  const mindfulnessScore = calculateMindfulnessScore(
    meditationSessions.length,
    journalEntries.length,
    practiceDays,
    dailyStreak
  );

  const level = getCurrentLevel(xp);
  const { percent } = getProgressToNextLevel(xp);

  // Find active challenge
  const activeChallenge = challengeProgress.length > 0
    ? challenges.find((c) => {
        const progress = challengeProgress.find((p) => p.challengeId === c.id);
        return progress && progress.completedDays.length < c.durationDays;
      })
    : null;

  const activeChallengeProgress = activeChallenge
    ? challengeProgress.find((p) => p.challengeId === activeChallenge.id)
    : null;

  const hasActivity = xp > 0 || meditationSessions.length > 0 || journalEntries.length > 0;

  // Don't render anything if user has no activity - show a quick start instead
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (mindfulnessScore / 100) * circumference;

  return (
    <section className="bg-gradient-to-b from-[#FAF8F5] to-white py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C8A96E]">
              Your Wellness Journey
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26]">
              {hasActivity ? 'Welcome Back' : 'Begin Your Journey'}
            </h2>
            <div className="mx-auto mt-4 h-px w-12 bg-[#C8A96E]" />
          </motion.div>

          {hasActivity ? (
            <motion.div variants={fadeInUp} className="mt-10 grid gap-4 md:grid-cols-4">
              {/* Mindfulness Score */}
              <div className="flex flex-col items-center rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-5 backdrop-blur-sm">
                <div className="relative h-24 w-24">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 96 96">
                    <circle cx="48" cy="48" r="40" stroke="#F5F2ED" strokeWidth="6" fill="none" />
                    <motion.circle
                      cx="48" cy="48" r="40"
                      stroke="#5B7B5E"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ duration: 1.5, ease: 'easeOut' as const }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#2D2A26]">{mindfulnessScore}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs font-semibold text-[#5B7B5E]">Mindfulness Score</p>
              </div>

              {/* Daily Streak */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-5 backdrop-blur-sm">
                <motion.div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500"
                  animate={dailyStreak > 0 ? { scale: [1, 1.08, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
                >
                  <Flame className="h-7 w-7 text-white" />
                </motion.div>
                <p className="mt-3 text-2xl font-bold text-[#2D2A26]">{dailyStreak}</p>
                <p className="text-xs text-[#2D2A26]/50">Day Streak</p>
              </div>

              {/* Level / XP */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-5 backdrop-blur-sm">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: level.color }}
                >
                  {level.name[0]}
                </div>
                <p className="mt-2 text-sm font-semibold text-[#2D2A26]">{level.name}</p>
                <p className="text-xs text-[#2D2A26]/40">{xp} XP</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#F5F2ED]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: level.color }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              {/* Current Challenge or Quick Actions */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-5 backdrop-blur-sm">
                {activeChallenge && activeChallengeProgress ? (
                  <>
                    <span className="text-2xl">{activeChallenge.icon}</span>
                    <p className="mt-2 text-sm font-semibold text-[#2D2A26]">{activeChallenge.title}</p>
                    <p className="text-xs text-[#2D2A26]/40">
                      {activeChallengeProgress.completedDays.length} / {activeChallenge.durationDays} days
                    </p>
                    <Link href="/challenges" className="mt-2 text-xs font-medium text-[#C8A96E] hover:underline">
                      Continue
                    </Link>
                  </>
                ) : (
                  <>
                    <Target className="h-7 w-7 text-[#C8A96E]" />
                    <p className="mt-2 text-sm font-semibold text-[#2D2A26]">No Active Challenge</p>
                    <Link href="/challenges" className="mt-1 text-xs font-medium text-[#C8A96E] hover:underline">
                      Start one
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {[
                { href: '/quiz', icon: Sparkles, label: 'Discover Your Archetype', desc: 'Take the wellness quiz' },
                { href: '/practice', icon: Flame, label: 'Start Breathing', desc: 'Guided breathwork timer' },
                { href: '/journal', icon: BookOpen, label: 'Begin Journaling', desc: 'Track mood & gratitude' },
                { href: '/challenges', icon: Target, label: 'Join a Challenge', desc: 'Seasonal wellness goals' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex flex-col items-center rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 text-center transition-all hover:border-[#C8A96E]/30 hover:shadow-md"
                >
                  <item.icon className="h-8 w-8 text-[#C8A96E] transition-transform group-hover:scale-110" />
                  <p className="mt-3 text-sm font-semibold text-[#2D2A26]">{item.label}</p>
                  <p className="mt-1 text-xs text-[#2D2A26]/40">{item.desc}</p>
                  <ArrowRight className="mt-3 h-4 w-4 text-[#C8A96E] transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
