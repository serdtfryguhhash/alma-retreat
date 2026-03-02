'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Search, Filter } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { allPoses, PoseDifficulty, PoseType } from '@/data/poses';
import { XP_REWARDS } from '@/lib/gamification';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const difficultyColors: Record<PoseDifficulty, string> = {
  Beginner: '#5B7B5E',
  Intermediate: '#C8A96E',
  Advanced: '#E85D3A',
};

const typeIcons: Record<PoseType, string> = {
  Standing: '🧍',
  Seated: '🧘',
  Balance: '⚖️',
  Inversion: '🤸',
  Backbend: '🌈',
};

export default function PosesPage() {
  const [search, setSearch] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<PoseDifficulty | 'All'>('All');
  const [filterType, setFilterType] = useState<PoseType | 'All'>('All');
  const [expandedPose, setExpandedPose] = useState<string | null>(null);
  const [showMasteredOnly, setShowMasteredOnly] = useState(false);

  const poseProgress = useAlmaStore((s) => s.poseProgress);
  const togglePoseMastered = useAlmaStore((s) => s.togglePoseMastered);
  const addXP = useAlmaStore((s) => s.addXP);
  const updateDailyStreak = useAlmaStore((s) => s.updateDailyStreak);

  const masteredIds = new Set(poseProgress.filter((p) => p.mastered).map((p) => p.poseId));

  const filteredPoses = useMemo(() => {
    return allPoses.filter((pose) => {
      if (filterDifficulty !== 'All' && pose.difficulty !== filterDifficulty) return false;
      if (filterType !== 'All' && pose.type !== filterType) return false;
      if (showMasteredOnly && !masteredIds.has(pose.id)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          pose.name.toLowerCase().includes(q) ||
          pose.sanskritName.toLowerCase().includes(q) ||
          pose.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, filterDifficulty, filterType, showMasteredOnly, masteredIds]);

  const handleToggleMastered = (poseId: string) => {
    const wasMastered = masteredIds.has(poseId);
    togglePoseMastered(poseId);
    if (!wasMastered) {
      addXP(XP_REWARDS.POSE_MASTERED);
      updateDailyStreak();
    }
  };

  const totalMastered = masteredIds.size;
  const totalPoses = allPoses.length;
  const masteredPercent = Math.round((totalMastered / totalPoses) * 100);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
            Yoga Pose Library
          </h1>
          <p className="mt-3 text-[#2D2A26]/60">
            Explore {totalPoses} poses across all levels. Track your mastery journey.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C8A96E]" />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-8 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-5 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#2D2A26]">
                {totalMastered} of {totalPoses} poses mastered
              </p>
              <p className="text-xs text-[#2D2A26]/40">Keep practicing to unlock more</p>
            </div>
            <p className="text-2xl font-bold text-[#C8A96E]">{masteredPercent}%</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F5F2ED]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#5B7B5E] to-[#C8A96E]"
              animate={{ width: `${masteredPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' as const }}
            />
          </div>
        </motion.div>

        {/* Search & Filters */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2D2A26]/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search poses by name or Sanskrit..."
              className="w-full rounded-xl border border-[#C8A96E]/15 bg-white/60 py-3 pl-11 pr-4 text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none focus:border-[#C8A96E]/40"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-[#2D2A26]/30" />
            {/* Difficulty */}
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setFilterDifficulty(d)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  filterDifficulty === d
                    ? 'text-white'
                    : 'bg-[#F5F2ED] text-[#2D2A26]/50 hover:bg-[#C8A96E]/10'
                }`}
                style={
                  filterDifficulty === d
                    ? { backgroundColor: d === 'All' ? '#2D2A26' : difficultyColors[d as PoseDifficulty] }
                    : {}
                }
              >
                {d}
              </button>
            ))}
            <span className="mx-1 h-4 w-px bg-[#C8A96E]/10" />
            {/* Type */}
            {(['All', 'Standing', 'Seated', 'Balance', 'Inversion', 'Backbend'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  filterType === t
                    ? 'bg-[#2D2A26] text-white'
                    : 'bg-[#F5F2ED] text-[#2D2A26]/50 hover:bg-[#C8A96E]/10'
                }`}
              >
                {t !== 'All' && typeIcons[t as PoseType]} {t}
              </button>
            ))}
            <span className="mx-1 h-4 w-px bg-[#C8A96E]/10" />
            <button
              onClick={() => setShowMasteredOnly(!showMasteredOnly)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                showMasteredOnly
                  ? 'bg-[#5B7B5E] text-white'
                  : 'bg-[#F5F2ED] text-[#2D2A26]/50 hover:bg-[#C8A96E]/10'
              }`}
            >
              Mastered Only
            </button>
          </div>
        </div>

        {/* Poses Grid */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <AnimatePresence>
            {filteredPoses.map((pose) => {
              const isMastered = masteredIds.has(pose.id);
              const isExpanded = expandedPose === pose.id;

              return (
                <motion.div
                  key={pose.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`rounded-xl border transition-all ${
                    isMastered
                      ? 'border-[#5B7B5E]/20 bg-[#5B7B5E]/5'
                      : 'border-[#C8A96E]/10 bg-white/60'
                  }`}
                >
                  <button
                    onClick={() => setExpandedPose(isExpanded ? null : pose.id)}
                    className="w-full p-4 text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{typeIcons[pose.type]}</span>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                            style={{ backgroundColor: difficultyColors[pose.difficulty] }}
                          >
                            {pose.difficulty}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-sm font-semibold text-[#2D2A26]">
                          {pose.name}
                        </h3>
                        <p className="text-xs italic text-[#C8A96E]">{pose.sanskritName}</p>
                      </div>
                      {isMastered && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5B7B5E]">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-[#C8A96E]/10 px-4 pb-4 pt-3"
                      >
                        <p className="text-sm leading-relaxed text-[#2D2A26]/60">
                          {pose.description}
                        </p>

                        <div className="mt-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#C8A96E]">
                            Benefits
                          </p>
                          <ul className="mt-1 space-y-1">
                            {pose.benefits.map((b) => (
                              <li key={b} className="text-xs text-[#2D2A26]/50">
                                · {b}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#C8A96E]">
                            Muscles Targeted
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {pose.musclesTargeted.map((m) => (
                              <span
                                key={m}
                                className="rounded-full bg-[#F5F2ED] px-2 py-0.5 text-[10px] text-[#2D2A26]/50"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleMastered(pose.id);
                          }}
                          className={`mt-4 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                            isMastered
                              ? 'bg-[#5B7B5E]/10 text-[#5B7B5E] hover:bg-[#5B7B5E]/20'
                              : 'bg-[#5B7B5E] text-white hover:bg-[#4A6A4D]'
                          }`}
                        >
                          <Check className="h-3 w-3" />
                          {isMastered ? 'Mastered' : 'Mark as Mastered'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredPoses.length === 0 && (
          <div className="mt-12 text-center text-sm text-[#2D2A26]/40">
            No poses match your filters. Try adjusting your search.
          </div>
        )}
      </div>
    </div>
  );
}
