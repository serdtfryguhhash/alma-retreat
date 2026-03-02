'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { prepProgram } from '@/lib/prep-program';
import { XP_REWARDS } from '@/lib/gamification';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function PrepPage() {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const prepProgress = useAlmaStore((s) => s.prepProgress);
  const startPrepProgram = useAlmaStore((s) => s.startPrepProgram);
  const completePrepDay = useAlmaStore((s) => s.completePrepDay);
  const addXP = useAlmaStore((s) => s.addXP);
  const updateDailyStreak = useAlmaStore((s) => s.updateDailyStreak);

  const isStarted = prepProgress.startedAt !== null;
  const completedDayNumbers = prepProgress.completedDays.map((d) => d.day);
  const totalCompleted = completedDayNumbers.length;
  const percent = Math.round((totalCompleted / 30) * 100);

  const handleStart = () => {
    startPrepProgram();
  };

  const handleCompleteDay = (day: number) => {
    if (!completedDayNumbers.includes(day)) {
      completePrepDay(day);
      addXP(XP_REWARDS.PREP_DAY);
      updateDailyStreak();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
            30-Day Retreat Prep
          </h1>
          <p className="mt-3 text-[#2D2A26]/60">
            Prepare your body, mind, and spirit for an unforgettable retreat experience.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C8A96E]" />
        </motion.div>

        {/* Progress */}
        {isStarted && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2D2A26]">
                  Day {totalCompleted} of 30
                </p>
                <p className="text-xs text-[#2D2A26]/40">
                  Started {new Date(prepProgress.startedAt!).toLocaleDateString()}
                </p>
              </div>
              <p className="text-2xl font-bold text-[#C8A96E]">{percent}%</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F5F2ED]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#5B7B5E] to-[#C8A96E]"
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' as const }}
              />
            </div>
          </motion.div>
        )}

        {!isStarted && (
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="mt-8 text-center">
            <button
              onClick={handleStart}
              className="flex items-center gap-2 mx-auto rounded-full bg-[#5B7B5E] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4A6A4D]"
            >
              <Play className="h-4 w-4" /> Begin Your 30-Day Journey
            </button>
          </motion.div>
        )}

        {/* Days List */}
        <div className="mt-8 space-y-3">
          {prepProgram.map((day) => {
            const isCompleted = completedDayNumbers.includes(day.day);
            const isUnlocked = isStarted;
            const isExpanded = expandedDay === day.day;

            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: day.day * 0.02 }}
                className={`rounded-xl border transition-all ${
                  isCompleted
                    ? 'border-[#5B7B5E]/20 bg-[#5B7B5E]/5'
                    : 'border-[#C8A96E]/10 bg-white/60'
                }`}
              >
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                  className="flex w-full items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        isCompleted
                          ? 'bg-[#5B7B5E] text-white'
                          : isUnlocked
                            ? 'bg-[#C8A96E]/10 text-[#C8A96E]'
                            : 'bg-[#F5F2ED] text-[#2D2A26]/30'
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : isUnlocked ? day.day : <Lock className="h-3 w-3" />}
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-medium ${isCompleted ? 'text-[#5B7B5E]' : 'text-[#2D2A26]'}`}>
                        Day {day.day}: {day.title}
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-[#2D2A26]/30" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#2D2A26]/30" />
                  )}
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-[#C8A96E]/10 px-4 pb-4 pt-3"
                  >
                    <div className="space-y-3">
                      <div className="rounded-lg bg-[#FAF8F5] p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#5B7B5E]">
                          Yoga Pose
                        </p>
                        <p className="mt-1 text-sm text-[#2D2A26]/70">{day.yogaPose}</p>
                      </div>
                      <div className="rounded-lg bg-[#FAF8F5] p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#C8A96E]">
                          Dietary Tip
                        </p>
                        <p className="mt-1 text-sm text-[#2D2A26]/70">{day.dietaryTip}</p>
                      </div>
                      <div className="rounded-lg bg-[#FAF8F5] p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B5B8E]">
                          Mindfulness Exercise
                        </p>
                        <p className="mt-1 text-sm text-[#2D2A26]/70">{day.mindfulnessExercise}</p>
                      </div>
                      <div className="rounded-lg bg-[#FAF8F5] p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#D4849A]">
                          Packing Item
                        </p>
                        <p className="mt-1 text-sm text-[#2D2A26]/70">{day.packingItem}</p>
                      </div>
                    </div>
                    {isUnlocked && !isCompleted && (
                      <button
                        onClick={() => handleCompleteDay(day.day)}
                        className="mt-4 flex items-center gap-2 rounded-full bg-[#5B7B5E] px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#4A6A4D]"
                      >
                        <Check className="h-3 w-3" /> Mark as Complete
                      </button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
