'use client';

import { motion } from 'framer-motion';
import { useAlmaStore } from '@/stores';
import { calculateMindfulnessScore } from '@/lib/engagement';

export default function MindfulnessScore() {
  const meditationSessions = useAlmaStore((s) => s.meditationSessions);
  const journalEntries = useAlmaStore((s) => s.journalEntries);
  const dailyStreak = useAlmaStore((s) => s.dailyStreak);

  // Calculate unique practice days from meditation sessions
  const practiceDays = new Set(
    meditationSessions.map((s) => s.completedAt.split('T')[0])
  ).size;

  const score = calculateMindfulnessScore(
    meditationSessions.length,
    journalEntries.length,
    practiceDays,
    dailyStreak
  );

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreLabel = (s: number): string => {
    if (s >= 80) return 'Flourishing';
    if (s >= 60) return 'Thriving';
    if (s >= 40) return 'Growing';
    if (s >= 20) return 'Awakening';
    return 'Beginning';
  };

  const getScoreColor = (s: number): string => {
    if (s >= 80) return '#C8A96E';
    if (s >= 60) return '#5B7B5E';
    if (s >= 40) return '#6B5B8E';
    if (s >= 20) return '#D4849A';
    return '#A0AEC0';
  };

  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 backdrop-blur-sm">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="#F5F2ED"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            stroke={getScoreColor(score)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' as const }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold text-[#2D2A26]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-[#2D2A26]/50">/ 100</span>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold" style={{ color: getScoreColor(score) }}>
        {getScoreLabel(score)}
      </p>
      <p className="mt-1 text-center text-xs text-[#2D2A26]/40">Mindfulness Score</p>
      <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-bold text-[#2D2A26]">{meditationSessions.length}</p>
          <p className="text-[10px] text-[#2D2A26]/40">Sessions</p>
        </div>
        <div>
          <p className="text-lg font-bold text-[#2D2A26]">{journalEntries.length}</p>
          <p className="text-[10px] text-[#2D2A26]/40">Entries</p>
        </div>
        <div>
          <p className="text-lg font-bold text-[#2D2A26]">{dailyStreak}</p>
          <p className="text-[10px] text-[#2D2A26]/40">Streak</p>
        </div>
      </div>
    </div>
  );
}
