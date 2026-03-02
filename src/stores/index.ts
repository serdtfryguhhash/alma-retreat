'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type WellnessArchetype = 'Warrior' | 'Healer' | 'Sage' | 'Explorer' | 'Nurturer';

export interface WellnessProfile {
  archetype: WellnessArchetype | null;
  scores: Record<WellnessArchetype, number>;
  completedAt: string | null;
}

export interface MeditationSession {
  id: string;
  pattern: 'fourSevenEight' | 'box' | 'wimHof';
  durationMinutes: number;
  completedAt: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  gratitude: [string, string, string];
  mood: number;
  energy: number;
  sleepQuality: number;
  reflection: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  category: 'Yoga' | 'Meditation' | 'Nutrition' | 'Travel' | 'General';
  title: string;
  content: string;
  createdAt: string;
  comments: CommunityComment[];
  likes: number;
}

export interface CommunityComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface ChallengeProgress {
  challengeId: string;
  startedAt: string;
  completedDays: string[]; // ISO date strings
}

export interface DayCompletion {
  day: number;
  completedAt: string;
}

export interface PrepProgress {
  startedAt: string | null;
  completedDays: DayCompletion[];
}

export interface YogaPoseProgress {
  poseId: string;
  mastered: boolean;
  masteredAt: string | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/* ------------------------------------------------------------------ */
/*  Store interface                                                     */
/* ------------------------------------------------------------------ */

interface AlmaStore {
  // Wellness Profile
  wellnessProfile: WellnessProfile;
  setWellnessProfile: (profile: WellnessProfile) => void;

  // Meditation
  meditationSessions: MeditationSession[];
  addMeditationSession: (session: MeditationSession) => void;
  calmStreak: number;
  lastMeditationDate: string | null;
  updateCalmStreak: () => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void;

  // Community
  communityPosts: CommunityPost[];
  addCommunityPost: (post: CommunityPost) => void;
  addCommentToPost: (postId: string, comment: CommunityComment) => void;
  likePost: (postId: string) => void;

  // Challenges
  challengeProgress: ChallengeProgress[];
  startChallenge: (challengeId: string) => void;
  completeDay: (challengeId: string, date: string) => void;

  // Prep Program
  prepProgress: PrepProgress;
  startPrepProgram: () => void;
  completePrepDay: (day: number) => void;

  // Yoga Poses
  poseProgress: YogaPoseProgress[];
  togglePoseMastered: (poseId: string) => void;

  // Gamification
  xp: number;
  addXP: (amount: number) => void;

  // AI Chat
  chatHistory: ChatMessage[];
  addChatMessage: (message: ChatMessage) => void;
  clearChatHistory: () => void;

  // Daily streak
  dailyStreak: number;
  lastActiveDate: string | null;
  updateDailyStreak: () => void;
}

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */

export const useAlmaStore = create<AlmaStore>()(
  persist(
    (set, get) => ({
      // Wellness Profile
      wellnessProfile: {
        archetype: null,
        scores: { Warrior: 0, Healer: 0, Sage: 0, Explorer: 0, Nurturer: 0 },
        completedAt: null,
      },
      setWellnessProfile: (profile) => set({ wellnessProfile: profile }),

      // Meditation
      meditationSessions: [],
      addMeditationSession: (session) =>
        set((state) => ({
          meditationSessions: [...state.meditationSessions, session],
        })),
      calmStreak: 0,
      lastMeditationDate: null,
      updateCalmStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastMeditationDate, calmStreak } = get();
        if (lastMeditationDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastMeditationDate === yesterday) {
          set({ calmStreak: calmStreak + 1, lastMeditationDate: today });
        } else {
          set({ calmStreak: 1, lastMeditationDate: today });
        }
      },

      // Journal
      journalEntries: [],
      addJournalEntry: (entry) =>
        set((state) => ({ journalEntries: [...state.journalEntries, entry] })),
      updateJournalEntry: (id, updates) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((e) =>
            e.id === id ? { ...e, ...updates } : e
          ),
        })),

      // Community
      communityPosts: [],
      addCommunityPost: (post) =>
        set((state) => ({ communityPosts: [post, ...state.communityPosts] })),
      addCommentToPost: (postId, comment) =>
        set((state) => ({
          communityPosts: state.communityPosts.map((p) =>
            p.id === postId ? { ...p, comments: [...p.comments, comment] } : p
          ),
        })),
      likePost: (postId) =>
        set((state) => ({
          communityPosts: state.communityPosts.map((p) =>
            p.id === postId ? { ...p, likes: p.likes + 1 } : p
          ),
        })),

      // Challenges
      challengeProgress: [],
      startChallenge: (challengeId) =>
        set((state) => ({
          challengeProgress: [
            ...state.challengeProgress.filter((c) => c.challengeId !== challengeId),
            { challengeId, startedAt: new Date().toISOString(), completedDays: [] },
          ],
        })),
      completeDay: (challengeId, date) =>
        set((state) => ({
          challengeProgress: state.challengeProgress.map((c) =>
            c.challengeId === challengeId && !c.completedDays.includes(date)
              ? { ...c, completedDays: [...c.completedDays, date] }
              : c
          ),
        })),

      // Prep Program
      prepProgress: { startedAt: null, completedDays: [] },
      startPrepProgram: () =>
        set({ prepProgress: { startedAt: new Date().toISOString(), completedDays: [] } }),
      completePrepDay: (day) =>
        set((state) => ({
          prepProgress: {
            ...state.prepProgress,
            completedDays: [
              ...state.prepProgress.completedDays.filter((d) => d.day !== day),
              { day, completedAt: new Date().toISOString() },
            ],
          },
        })),

      // Yoga Poses
      poseProgress: [],
      togglePoseMastered: (poseId) =>
        set((state) => {
          const existing = state.poseProgress.find((p) => p.poseId === poseId);
          if (existing) {
            return {
              poseProgress: state.poseProgress.map((p) =>
                p.poseId === poseId
                  ? { ...p, mastered: !p.mastered, masteredAt: !p.mastered ? new Date().toISOString() : null }
                  : p
              ),
            };
          }
          return {
            poseProgress: [...state.poseProgress, { poseId, mastered: true, masteredAt: new Date().toISOString() }],
          };
        }),

      // Gamification
      xp: 0,
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      // AI Chat
      chatHistory: [],
      addChatMessage: (message) =>
        set((state) => ({ chatHistory: [...state.chatHistory, message] })),
      clearChatHistory: () => set({ chatHistory: [] }),

      // Daily streak
      dailyStreak: 0,
      lastActiveDate: null,
      updateDailyStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastActiveDate, dailyStreak } = get();
        if (lastActiveDate === today) return;
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastActiveDate === yesterday) {
          set({ dailyStreak: dailyStreak + 1, lastActiveDate: today });
        } else {
          set({ dailyStreak: 1, lastActiveDate: today });
        }
      },
    }),
    {
      name: 'alma-retreat-store',
      storage: createJSONStorage(() => {
        if (typeof window !== 'undefined') return localStorage;
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
