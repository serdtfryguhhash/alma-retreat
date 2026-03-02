'use client';

import { motion } from 'framer-motion';
import { useAlmaStore } from '@/stores';
import { getCurrentLevel, getProgressToNextLevel, levels } from '@/lib/gamification';

export default function XPBar() {
  const xp = useAlmaStore((s) => s.xp);
  const level = getCurrentLevel(xp);
  const { percent, xpToNext } = getProgressToNextLevel(xp);
  const levelIndex = levels.indexOf(level);
  const isMaxLevel = levelIndex === levels.length - 1;

  return (
    <div className="rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-4 backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: level.color }}
          >
            {levelIndex + 1}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2D2A26]">{level.name}</p>
            <p className="text-xs text-[#2D2A26]/50">{xp} XP total</p>
          </div>
        </div>
        {!isMaxLevel && (
          <p className="text-xs text-[#2D2A26]/40">{xpToNext} XP to next level</p>
        )}
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#F5F2ED]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: level.color }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' as const }}
        />
      </div>
    </div>
  );
}
