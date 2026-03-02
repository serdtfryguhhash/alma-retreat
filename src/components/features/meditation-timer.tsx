'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { XP_REWARDS } from '@/lib/gamification';

type BreathPattern = 'fourSevenEight' | 'box' | 'wimHof';

interface PatternConfig {
  name: string;
  description: string;
  phases: { name: string; duration: number }[];
  color: string;
}

const patterns: Record<BreathPattern, PatternConfig> = {
  fourSevenEight: {
    name: '4-7-8 Breathing',
    description: 'Calming breath: Inhale 4s, Hold 7s, Exhale 8s',
    phases: [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 7 },
      { name: 'Exhale', duration: 8 },
    ],
    color: '#5B7B5E',
  },
  box: {
    name: 'Box Breathing',
    description: 'Balanced breath: 4s each — Inhale, Hold, Exhale, Hold',
    phases: [
      { name: 'Inhale', duration: 4 },
      { name: 'Hold', duration: 4 },
      { name: 'Exhale', duration: 4 },
      { name: 'Hold', duration: 4 },
    ],
    color: '#6B5B8E',
  },
  wimHof: {
    name: 'Wim Hof',
    description: '30 quick breaths, then hold. Power breathing method.',
    phases: [
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Quick Breath', duration: 1 },
      { name: 'Hold', duration: 30 },
    ],
    color: '#E85D3A',
  },
};

export default function MeditationTimer() {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>('fourSevenEight');
  const [isRunning, setIsRunning] = useState(false);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const addMeditationSession = useAlmaStore((s) => s.addMeditationSession);
  const updateCalmStreak = useAlmaStore((s) => s.updateCalmStreak);
  const updateDailyStreak = useAlmaStore((s) => s.updateDailyStreak);
  const addXP = useAlmaStore((s) => s.addXP);

  const pattern = patterns[selectedPattern];
  const currentPhase = pattern.phases[currentPhaseIndex];

  const getScaleForPhase = useCallback((phaseName: string): number => {
    if (phaseName === 'Inhale' || phaseName === 'Quick Breath') return 1.4;
    if (phaseName === 'Hold') return 1.2;
    return 0.8; // Exhale
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setPhaseTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setCurrentPhaseIndex((pi) => {
            const nextIndex = pi + 1;
            if (nextIndex >= pattern.phases.length) {
              setCycleCount((c) => c + 1);
              // Start next cycle
              const firstPhase = pattern.phases[0];
              setPhaseTimeLeft(firstPhase.duration);
              return 0;
            }
            const nextPhase = pattern.phases[nextIndex];
            setPhaseTimeLeft(nextPhase.duration);
            return nextIndex;
          });
          return 0;
        }
        return prev - 1;
      });
      setTotalElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, pattern.phases]);

  const startSession = () => {
    setIsRunning(true);
    setIsComplete(false);
    setCurrentPhaseIndex(0);
    setPhaseTimeLeft(pattern.phases[0].duration);
    setTotalElapsed(0);
    setCycleCount(0);
  };

  const togglePause = () => {
    setIsRunning((prev) => !prev);
  };

  const completeSession = () => {
    setIsRunning(false);
    setIsComplete(true);
    const durationMinutes = Math.max(1, Math.round(totalElapsed / 60));
    addMeditationSession({
      id: crypto.randomUUID(),
      pattern: selectedPattern,
      durationMinutes,
      completedAt: new Date().toISOString(),
    });
    updateCalmStreak();
    updateDailyStreak();
    addXP(XP_REWARDS.MEDITATION_SESSION);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentPhaseIndex(0);
    setPhaseTimeLeft(0);
    setTotalElapsed(0);
    setCycleCount(0);
    setIsComplete(false);
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Pattern Selector */}
      {!isRunning && !isComplete && (
        <div className="flex flex-wrap justify-center gap-3">
          {(Object.keys(patterns) as BreathPattern[]).map((key) => (
            <button
              key={key}
              onClick={() => { setSelectedPattern(key); reset(); }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedPattern === key
                  ? 'text-white shadow-md'
                  : 'bg-[#F5F2ED] text-[#2D2A26]/60 hover:bg-[#C8A96E]/10'
              }`}
              style={selectedPattern === key ? { backgroundColor: patterns[key].color } : {}}
            >
              {patterns[key].name}
            </button>
          ))}
        </div>
      )}

      {/* Description */}
      {!isRunning && !isComplete && (
        <p className="text-center text-sm text-[#2D2A26]/50">{pattern.description}</p>
      )}

      {/* Breathing Circle */}
      <div className="relative flex h-64 w-64 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full opacity-20"
          style={{ backgroundColor: pattern.color }}
          animate={
            isRunning
              ? { scale: getScaleForPhase(currentPhase?.name || 'Hold') }
              : { scale: 1 }
          }
          transition={{
            duration: currentPhase?.duration || 1,
            ease: 'easeInOut' as const,
          }}
        />
        <motion.div
          className="absolute inset-4 rounded-full opacity-40"
          style={{ backgroundColor: pattern.color }}
          animate={
            isRunning
              ? { scale: getScaleForPhase(currentPhase?.name || 'Hold') }
              : { scale: 1 }
          }
          transition={{
            duration: currentPhase?.duration || 1,
            ease: 'easeInOut' as const,
            delay: 0.1,
          }}
        />
        <motion.div
          className="relative z-10 flex h-40 w-40 flex-col items-center justify-center rounded-full text-white"
          style={{ backgroundColor: pattern.color }}
          animate={
            isRunning
              ? { scale: getScaleForPhase(currentPhase?.name || 'Hold') }
              : { scale: 1 }
          }
          transition={{
            duration: currentPhase?.duration || 1,
            ease: 'easeInOut' as const,
            delay: 0.2,
          }}
        >
          {isRunning ? (
            <>
              <span className="text-lg font-medium">{currentPhase?.name}</span>
              <span className="text-3xl font-bold">{phaseTimeLeft}</span>
            </>
          ) : isComplete ? (
            <>
              <span className="text-lg font-medium">Complete</span>
              <span className="text-2xl font-bold">{formatTime(totalElapsed)}</span>
            </>
          ) : (
            <span className="text-lg font-medium">Ready</span>
          )}
        </motion.div>
      </div>

      {/* Timer Info */}
      {isRunning && (
        <div className="flex gap-6 text-center">
          <div>
            <p className="text-2xl font-bold text-[#2D2A26]">{formatTime(totalElapsed)}</p>
            <p className="text-xs text-[#2D2A26]/40">Elapsed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[#2D2A26]">{cycleCount}</p>
            <p className="text-xs text-[#2D2A26]/40">Cycles</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-4">
        <AnimatePresence mode="wait">
          {!isRunning && !isComplete && totalElapsed === 0 && (
            <motion.button
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={startSession}
              className="flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: pattern.color }}
            >
              <Play className="h-4 w-4" /> Begin
            </motion.button>
          )}
          {isRunning && (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <button
                onClick={togglePause}
                className="flex items-center gap-2 rounded-full bg-[#F5F2ED] px-6 py-3 text-sm font-medium text-[#2D2A26] transition-colors hover:bg-[#C8A96E]/10"
              >
                <Pause className="h-4 w-4" /> Pause
              </button>
              <button
                onClick={completeSession}
                className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: pattern.color }}
              >
                Finish Session
              </button>
            </motion.div>
          )}
          {!isRunning && (isComplete || totalElapsed > 0) && (
            <motion.div
              key="paused"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              {!isComplete && (
                <button
                  onClick={togglePause}
                  className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: pattern.color }}
                >
                  <Play className="h-4 w-4" /> Resume
                </button>
              )}
              {!isComplete && (
                <button
                  onClick={completeSession}
                  className="flex items-center gap-2 rounded-full bg-[#C8A96E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B89A5E]"
                >
                  Finish
                </button>
              )}
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-full bg-[#F5F2ED] px-6 py-3 text-sm font-medium text-[#2D2A26] transition-colors hover:bg-[#C8A96E]/10"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Completion message */}
      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg font-semibold text-[#5B7B5E]">
            Beautiful session — +{XP_REWARDS.MEDITATION_SESSION} XP earned
          </p>
          <p className="mt-1 text-sm text-[#2D2A26]/50">
            {cycleCount} cycle{cycleCount !== 1 ? 's' : ''} completed in {formatTime(totalElapsed)}
          </p>
        </motion.div>
      )}
    </div>
  );
}
