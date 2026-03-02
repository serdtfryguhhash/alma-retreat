'use client';

import { motion } from 'framer-motion';
import MeditationTimer from '@/components/features/meditation-timer';
import { useAlmaStore } from '@/stores';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

export default function PracticePage() {
  const meditationSessions = useAlmaStore((s) => s.meditationSessions);
  const calmStreak = useAlmaStore((s) => s.calmStreak);

  const totalMinutes = meditationSessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
            Breathwork Practice
          </h1>
          <p className="mt-3 text-[#2D2A26]/60">
            Choose a breathing pattern and find your calm.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C8A96E]" />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-8 flex justify-center gap-8 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-4 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2D2A26]">{meditationSessions.length}</p>
            <p className="text-xs text-[#2D2A26]/40">Total Sessions</p>
          </div>
          <div className="h-12 w-px bg-[#C8A96E]/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2D2A26]">{totalMinutes}</p>
            <p className="text-xs text-[#2D2A26]/40">Minutes</p>
          </div>
          <div className="h-12 w-px bg-[#C8A96E]/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-[#2D2A26]">{calmStreak}</p>
            <p className="text-xs text-[#2D2A26]/40">Calm Streak</p>
          </div>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mt-12"
        >
          <MeditationTimer />
        </motion.div>

        {/* Recent Sessions */}
        {meditationSessions.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-12"
          >
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
              Recent Sessions
            </h2>
            <div className="space-y-2">
              {meditationSessions
                .slice(-5)
                .reverse()
                .map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-xl border border-[#C8A96E]/10 bg-white/60 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#2D2A26]">
                        {session.pattern === 'fourSevenEight'
                          ? '4-7-8 Breathing'
                          : session.pattern === 'box'
                            ? 'Box Breathing'
                            : 'Wim Hof'}
                      </p>
                      <p className="text-xs text-[#2D2A26]/40">
                        {new Date(session.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-[#5B7B5E]">
                      {session.durationMinutes} min
                    </p>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
