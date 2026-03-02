'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Trash2, Sparkles } from 'lucide-react';
import { useAlmaStore, ChatMessage } from '@/stores';

const suggestions = [
  'Suggest a morning yoga sequence for energy',
  'What should I eat before a yoga session?',
  'Guide me through a 5-minute mindfulness practice',
  'How can I improve my sleep quality naturally?',
  'Recommend breathing exercises for anxiety',
];

export default function GuidePage() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatHistory = useAlmaStore((s) => s.chatHistory);
  const addChatMessage = useAlmaStore((s) => s.addChatMessage);
  const clearChatHistory = useAlmaStore((s) => s.clearChatHistory);
  const wellnessProfile = useAlmaStore((s) => s.wellnessProfile);
  const meditationSessions = useAlmaStore((s) => s.meditationSessions);
  const dailyStreak = useAlmaStore((s) => s.dailyStreak);

  const totalMinutes = meditationSessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text.trim() };
    addChatMessage(userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/wellness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          archetype: wellnessProfile.archetype,
          meditationMinutes: totalMinutes,
          streak: dailyStreak,
          message: text.trim(),
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      addChatMessage({ role: 'assistant', content: data.response });
    } catch {
      addChatMessage({
        role: 'assistant',
        content: 'I apologize — I was unable to process your request right now. Please try again in a moment.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F5] pt-20">
      {/* Header */}
      <div className="border-b border-[#C8A96E]/10 bg-white/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#2D2A26]">
              AI Wellness Guide
            </h1>
            <p className="text-xs text-[#2D2A26]/50">
              Personalized yoga, nutrition, and mindfulness guidance
            </p>
          </div>
          {chatHistory.length > 0 && (
            <button
              onClick={clearChatHistory}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-[#2D2A26]/40 transition-colors hover:bg-[#C8A96E]/10 hover:text-[#2D2A26]"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {chatHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-12 text-center"
            >
              <Sparkles className="mx-auto mb-4 h-10 w-10 text-[#C8A96E]" />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2D2A26]">
                How can I guide you today?
              </h2>
              <p className="mt-2 text-sm text-[#2D2A26]/50">
                Ask about yoga sequences, nutrition, breathwork, or mindfulness practices.
              </p>

              {/* Suggestion chips */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="rounded-full border border-[#C8A96E]/20 bg-white/60 px-4 py-2 text-xs text-[#2D2A26]/60 transition-all hover:border-[#C8A96E]/40 hover:bg-white hover:text-[#2D2A26]"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {chatHistory.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#5B7B5E] text-white'
                      : 'border border-[#C8A96E]/10 bg-white text-[#2D2A26]/80'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-[#C8A96E]/10 bg-white px-4 py-3 text-sm text-[#2D2A26]/50">
                <Loader2 className="h-4 w-4 animate-spin" /> Reflecting...
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#C8A96E]/10 bg-white/80 px-6 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
            placeholder="Ask about yoga, nutrition, meditation..."
            className="flex-1 rounded-full border border-[#C8A96E]/20 bg-[#FAF8F5] px-5 py-3 text-sm text-[#2D2A26] placeholder-[#2D2A26]/30 outline-none transition-colors focus:border-[#C8A96E]/40"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5B7B5E] text-white transition-colors hover:bg-[#4A6A4D] disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
