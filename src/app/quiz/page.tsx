'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { quizQuestions, calculateArchetype, archetypeDescriptions } from '@/lib/wellness-profile';
import { XP_REWARDS } from '@/lib/gamification';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const setWellnessProfile = useAlmaStore((s) => s.setWellnessProfile);
  const wellnessProfile = useAlmaStore((s) => s.wellnessProfile);
  const addXP = useAlmaStore((s) => s.addXP);
  const updateDailyStreak = useAlmaStore((s) => s.updateDailyStreak);

  const question = quizQuestions[currentStep];
  const totalSteps = quizQuestions.length;
  const hasExistingProfile = wellnessProfile.archetype !== null;

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate result
      const result = calculateArchetype(answers);
      setWellnessProfile({
        archetype: result.archetype,
        scores: result.scores,
        completedAt: new Date().toISOString(),
      });
      addXP(XP_REWARDS.QUIZ_COMPLETE);
      updateDailyStreak();
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const archetype = wellnessProfile.archetype;
  const archetypeInfo = archetype ? archetypeDescriptions[archetype] : null;

  if (showResult && archetypeInfo && archetype) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <div className="mb-6 text-6xl">{archetypeInfo.emoji}</div>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
              You are {archetypeInfo.title}
            </h1>
            <div className="mx-auto mt-4 h-px w-16 bg-[#C8A96E]" />
            <p className="mt-6 text-lg leading-relaxed text-[#2D2A26]/70">
              {archetypeInfo.description}
            </p>

            <div className="mt-8 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 text-left">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
                Your Strengths
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {archetypeInfo.strengths.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-1 text-sm font-medium text-white"
                    style={{ backgroundColor: archetypeInfo.color }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 text-left">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
                Personalized Recommendations
              </h3>
              <ul className="mt-3 space-y-2">
                {archetypeInfo.recommendations.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-[#2D2A26]/70">
                    <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C8A96E]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/practice"
                className="rounded-full bg-[#5B7B5E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4A6A4D]"
              >
                Start Practicing
              </Link>
              <Link
                href="/guide"
                className="rounded-full bg-[#C8A96E] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B89A5E]"
              >
                Get AI Guidance
              </Link>
            </div>

            <p className="mt-6 text-sm text-[#2D2A26]/40">
              +{XP_REWARDS.QUIZ_COMPLETE} XP earned for completing the quiz
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (hasExistingProfile && !showResult) {
    const existingInfo = archetypeDescriptions[wellnessProfile.archetype!];
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="mb-4 text-5xl">{existingInfo.emoji}</div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold text-[#2D2A26]">
              Welcome back, {existingInfo.title}
            </h1>
            <p className="mt-4 text-[#2D2A26]/60">
              You completed the wellness quiz on{' '}
              {new Date(wellnessProfile.completedAt!).toLocaleDateString()}.
            </p>

            <div className="mt-8 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 text-left">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
                Your Recommendations
              </h3>
              <ul className="mt-3 space-y-2">
                {existingInfo.recommendations.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-[#2D2A26]/70">
                    <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C8A96E]" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                setCurrentStep(0);
                setAnswers({});
                setShowResult(false);
                setWellnessProfile({
                  archetype: null,
                  scores: { Warrior: 0, Healer: 0, Sage: 0, Explorer: 0, Nurturer: 0 },
                  completedAt: null,
                });
              }}
              className="mt-8 rounded-full bg-[#F5F2ED] px-6 py-3 text-sm font-medium text-[#2D2A26] transition-colors hover:bg-[#C8A96E]/10"
            >
              Retake Quiz
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="mx-auto max-w-2xl px-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex justify-between text-xs text-[#2D2A26]/40">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#F5F2ED]">
            <motion.div
              className="h-full rounded-full bg-[#C8A96E]"
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26] md:text-3xl">
              {question.question}
            </h1>

            <div className="mt-8 space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full rounded-xl border p-4 text-left text-sm transition-all duration-300 ${
                    answers[question.id] === index
                      ? 'border-[#C8A96E] bg-[#C8A96E]/10 text-[#2D2A26]'
                      : 'border-[#C8A96E]/10 bg-white/60 text-[#2D2A26]/70 hover:border-[#C8A96E]/30 hover:bg-white'
                  }`}
                >
                  <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#C8A96E]/20 text-xs font-medium text-[#C8A96E]">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[#2D2A26]/60 transition-colors hover:text-[#2D2A26] disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <button
            onClick={handleNext}
            disabled={answers[question.id] === undefined}
            className="flex items-center gap-2 rounded-full bg-[#5B7B5E] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A6A4D] disabled:opacity-30"
          >
            {currentStep === totalSteps - 1 ? 'See My Archetype' : 'Next'}{' '}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
