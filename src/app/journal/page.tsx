'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, BookOpen, TrendingUp } from 'lucide-react';
import { useAlmaStore } from '@/stores';
import { XP_REWARDS } from '@/lib/gamification';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const moodLabels = ['', 'Very Low', 'Low', 'Neutral', 'Good', 'Excellent'];

export default function JournalPage() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [gratitude, setGratitude] = useState<[string, string, string]>(['', '', '']);
  const [mood, setMood] = useState(3);
  const [energy, setEnergy] = useState(3);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [reflection, setReflection] = useState('');

  const journalEntries = useAlmaStore((s) => s.journalEntries);
  const addJournalEntry = useAlmaStore((s) => s.addJournalEntry);
  const addXP = useAlmaStore((s) => s.addXP);
  const updateDailyStreak = useAlmaStore((s) => s.updateDailyStreak);

  const chartData = useMemo(() => {
    return journalEntries.slice(-14).map((entry) => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      Mood: entry.mood,
      Energy: entry.energy,
      Sleep: entry.sleepQuality,
    }));
  }, [journalEntries]);

  const handleSubmit = () => {
    if (!gratitude[0] && !reflection) return;
    addJournalEntry({
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      gratitude,
      mood,
      energy,
      sleepQuality,
      reflection,
    });
    addXP(XP_REWARDS.JOURNAL_ENTRY);
    updateDailyStreak();
    // Reset form
    setGratitude(['', '', '']);
    setMood(3);
    setEnergy(3);
    setSleepQuality(3);
    setReflection('');
    setShowNewEntry(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#2D2A26]">
            Wellness Journal
          </h1>
          <p className="mt-3 text-[#2D2A26]/60">
            Track your mood, energy, and gratitude daily.
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C8A96E]" />
        </motion.div>

        {/* Trends Chart */}
        {chartData.length >= 2 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mt-8 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#C8A96E]" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
                Wellness Trends
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F5F2ED" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#2D2A26' }} tickLine={false} />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontSize: 11, fill: '#2D2A26' }} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #C8A96E20', fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="Mood" stroke="#5B7B5E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Energy" stroke="#C8A96E" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="Sleep" stroke="#6B5B8E" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* New Entry Button */}
        {!showNewEntry && (
          <motion.button
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            onClick={() => setShowNewEntry(true)}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#C8A96E]/30 bg-white/40 p-6 text-sm font-medium text-[#C8A96E] transition-all hover:border-[#C8A96E]/60 hover:bg-white/60"
          >
            <Plus className="h-4 w-4" /> New Journal Entry
          </motion.button>
        )}

        {/* New Entry Form */}
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-[#C8A96E]/10 bg-white/80 p-6 backdrop-blur-sm"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
              Today&apos;s Entry
            </h3>

            {/* Gratitude */}
            <div className="mt-6">
              <label className="text-sm font-medium text-[#2D2A26]">
                Three things I am grateful for:
              </label>
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  type="text"
                  value={gratitude[i]}
                  onChange={(e) => {
                    const newG = [...gratitude] as [string, string, string];
                    newG[i] = e.target.value;
                    setGratitude(newG);
                  }}
                  placeholder={`Gratitude ${i + 1}`}
                  className="mt-2 w-full rounded-xl border border-[#C8A96E]/15 bg-[#FAF8F5] px-4 py-2.5 text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none focus:border-[#C8A96E]/40"
                />
              ))}
            </div>

            {/* Sliders */}
            {[
              { label: 'Mood', value: mood, setValue: setMood, color: '#5B7B5E' },
              { label: 'Energy Level', value: energy, setValue: setEnergy, color: '#C8A96E' },
              { label: 'Sleep Quality', value: sleepQuality, setValue: setSleepQuality, color: '#6B5B8E' },
            ].map((item) => (
              <div key={item.label} className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#2D2A26]">{item.label}</label>
                  <span className="text-sm text-[#2D2A26]/50">
                    {moodLabels[item.value]} ({item.value}/5)
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => item.setValue(n)}
                      className={`flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        item.value >= n
                          ? 'text-white'
                          : 'bg-[#F5F2ED] text-[#2D2A26]/40'
                      }`}
                      style={item.value >= n ? { backgroundColor: item.color } : {}}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Reflection */}
            <div className="mt-6">
              <label className="text-sm font-medium text-[#2D2A26]">Free Reflection</label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="How are you feeling today? What is on your mind?"
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-[#C8A96E]/15 bg-[#FAF8F5] px-4 py-3 text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none focus:border-[#C8A96E]/40"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSubmit}
                className="rounded-full bg-[#5B7B5E] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4A6A4D]"
              >
                Save Entry
              </button>
              <button
                onClick={() => setShowNewEntry(false)}
                className="rounded-full bg-[#F5F2ED] px-6 py-2.5 text-sm font-medium text-[#2D2A26]/60 transition-colors hover:bg-[#C8A96E]/10"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Past Entries */}
        {journalEntries.length > 0 && (
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#C8A96E]" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-[#C8A96E]">
                Past Entries
              </h2>
            </div>
            <div className="space-y-3">
              {journalEntries
                .slice()
                .reverse()
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-[#C8A96E]/10 bg-white/60 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-[#2D2A26]">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <div className="flex gap-3 text-xs text-[#2D2A26]/40">
                        <span>Mood: {entry.mood}/5</span>
                        <span>Energy: {entry.energy}/5</span>
                        <span>Sleep: {entry.sleepQuality}/5</span>
                      </div>
                    </div>
                    {entry.gratitude.filter(Boolean).length > 0 && (
                      <div className="mt-2">
                        {entry.gratitude.filter(Boolean).map((g, i) => (
                          <p key={i} className="text-xs text-[#5B7B5E]">
                            + {g}
                          </p>
                        ))}
                      </div>
                    )}
                    {entry.reflection && (
                      <p className="mt-2 text-sm text-[#2D2A26]/60">{entry.reflection}</p>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
