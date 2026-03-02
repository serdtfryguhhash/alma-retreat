'use client';

import { motion } from 'framer-motion';
import { Share2, Heart } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { getCurrentLevel } from '@/lib/gamification';
import { calculateMindfulnessScore } from '@/lib/engagement';

export default function ShareCard() {
  const meditationSessions = useAlmaStore((s) => s.meditationSessions);
  const journalEntries = useAlmaStore((s) => s.journalEntries);
  const dailyStreak = useAlmaStore((s) => s.dailyStreak);
  const xp = useAlmaStore((s) => s.xp);
  const poseProgress = useAlmaStore((s) => s.poseProgress);

  const totalMinutes = meditationSessions.reduce((sum, s) => sum + s.durationMinutes, 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const masteredPoses = poseProgress.filter((p) => p.mastered).length;
  const level = getCurrentLevel(xp);

  const practiceDays = new Set(
    meditationSessions.map((s) => s.completedAt.split('T')[0])
  ).size;
  const mindfulnessScore = calculateMindfulnessScore(
    meditationSessions.length,
    journalEntries.length,
    practiceDays,
    dailyStreak
  );

  const handleShare = async () => {
    const text = `My Alma Retreat Journey:\n\n🧘 ${totalHours} hours of meditation\n📝 ${journalEntries.length} journal entries\n🔥 ${dailyStreak} day streak\n💫 Mindfulness Score: ${mindfulnessScore}/100\n✨ Level: ${level.name}\n\nJoin me at almaretreat.com`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My Alma Retreat Journey', text });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D2A26] to-[#4A4540] p-8 text-white"
    >
      {/* Decorative elements */}
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#C8A96E]/10" />
      <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[#5B7B5E]/10" />

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold">
              My Wellness Journey
            </h3>
            <p className="text-xs text-white/50">Alma Retreat Mallorca</p>
          </div>
          <Heart className="h-5 w-5 text-[#C8A96E]" />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-2xl font-bold text-[#C8A96E]">{totalHours}h</p>
            <p className="text-xs text-white/50">Meditation</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-2xl font-bold text-[#5B7B5E]">{dailyStreak}</p>
            <p className="text-xs text-white/50">Day Streak</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-2xl font-bold text-[#6B5B8E]">{mindfulnessScore}</p>
            <p className="text-xs text-white/50">Mindfulness</p>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <p className="text-2xl font-bold text-[#D4849A]">{masteredPoses}</p>
            <p className="text-xs text-white/50">Poses Mastered</p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-2">
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ backgroundColor: level.color }}
          >
            {level.name[0]}
          </div>
          <span className="text-sm font-medium">{level.name}</span>
          <span className="text-xs text-white/40">· {xp} XP</span>
        </div>

        <button
          onClick={handleShare}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C8A96E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B89A5E]"
        >
          <Share2 className="h-4 w-4" /> Share My Journey
        </button>
      </div>
    </motion.div>
  );
}
