'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { getStreakStatus } from '@/lib/engagement';

export default function StreakBadge() {
  const dailyStreak = useAlmaStore((s) => s.dailyStreak);
  const lastActiveDate = useAlmaStore((s) => s.lastActiveDate);
  const { streakText, motivationalMessage } = getStreakStatus(lastActiveDate, dailyStreak);

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-4 backdrop-blur-sm">
      <motion.div
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500"
        animate={{ scale: dailyStreak > 0 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <Flame className="h-6 w-6 text-white" />
      </motion.div>
      <div className="flex-1">
        <p className="text-lg font-bold text-[#2D2A26]">{streakText}</p>
        <p className="text-xs text-[#2D2A26]/50">{motivationalMessage}</p>
      </div>
    </div>
  );
}
