import { WellnessArchetype } from '@/stores';

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: Partial<Record<WellnessArchetype, number>>;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'When you wake up, what draws you first?',
    options: [
      { text: 'An intense workout or run to energize my body', scores: { Warrior: 3, Explorer: 1 } },
      { text: 'A quiet moment of meditation or journaling', scores: { Sage: 3, Healer: 1 } },
      { text: 'Preparing a nourishing breakfast for myself and loved ones', scores: { Nurturer: 3, Healer: 1 } },
      { text: 'Checking what adventures or plans await for the day', scores: { Explorer: 3, Warrior: 1 } },
    ],
  },
  {
    id: 2,
    question: 'In a group retreat setting, you naturally gravitate toward...',
    options: [
      { text: 'Leading the most challenging hike or yoga flow', scores: { Warrior: 3, Explorer: 1 } },
      { text: 'The healing circle or sound bath session', scores: { Healer: 3, Sage: 1 } },
      { text: 'The philosophy discussion or silent meditation', scores: { Sage: 3, Healer: 1 } },
      { text: 'Helping newcomers feel welcome and comfortable', scores: { Nurturer: 3, Healer: 1 } },
    ],
  },
  {
    id: 3,
    question: 'Your ideal retreat day includes...',
    options: [
      { text: 'Pushing my limits with advanced poses and cold plunges', scores: { Warrior: 3, Explorer: 1 } },
      { text: 'Exploring hidden coves and local villages nearby', scores: { Explorer: 3, Warrior: 1 } },
      { text: 'Deep tissue massage and energy healing sessions', scores: { Healer: 3, Nurturer: 1 } },
      { text: 'Reading by the pool and contemplating life\'s mysteries', scores: { Sage: 3, Nurturer: 1 } },
    ],
  },
  {
    id: 4,
    question: 'When you feel stressed, you typically...',
    options: [
      { text: 'Channel it into physical movement or exercise', scores: { Warrior: 3, Explorer: 1 } },
      { text: 'Seek solitude and reflect on the root cause', scores: { Sage: 3, Healer: 1 } },
      { text: 'Reach out to comfort or be comforted by others', scores: { Nurturer: 3, Healer: 1 } },
      { text: 'Try something new — a class, a recipe, a place', scores: { Explorer: 3, Warrior: 1 } },
    ],
  },
  {
    id: 5,
    question: 'What matters most to you on a wellness journey?',
    options: [
      { text: 'Building strength, discipline, and resilience', scores: { Warrior: 3, Sage: 1 } },
      { text: 'Restoring balance and healing from within', scores: { Healer: 3, Nurturer: 1 } },
      { text: 'Gaining wisdom and deeper self-understanding', scores: { Sage: 3, Healer: 1 } },
      { text: 'Discovering new practices and experiences', scores: { Explorer: 3, Warrior: 1 } },
    ],
  },
];

export const archetypeDescriptions: Record<WellnessArchetype, {
  title: string;
  emoji: string;
  description: string;
  strengths: string[];
  recommendations: string[];
  color: string;
}> = {
  Warrior: {
    title: 'The Warrior',
    emoji: '🔥',
    description: 'You thrive on challenge and growth. Your energy is fierce and focused, drawing strength from pushing boundaries and building resilience.',
    strengths: ['Discipline', 'Physical strength', 'Determination', 'Leadership'],
    recommendations: [
      'Power Vinyasa flow sequences',
      'Cold water immersion therapy',
      'High-intensity interval training',
      'Wim Hof breathing technique',
      'Warrior pose variations & arm balances',
    ],
    color: '#E85D3A',
  },
  Healer: {
    title: 'The Healer',
    emoji: '💚',
    description: 'You are deeply attuned to energy, both your own and that of others. Your path is one of restoration, compassion, and gentle transformation.',
    strengths: ['Empathy', 'Intuition', 'Compassion', 'Emotional intelligence'],
    recommendations: [
      'Restorative yoga with long holds',
      'Reiki and energy healing sessions',
      'Herbal tea ceremonies',
      '4-7-8 calming breathwork',
      'Heart-opening backbend sequences',
    ],
    color: '#5B7B5E',
  },
  Sage: {
    title: 'The Sage',
    emoji: '🧘',
    description: 'You seek wisdom and inner truth. Your journey is contemplative, driven by a desire to understand the deeper currents of life and consciousness.',
    strengths: ['Mindfulness', 'Clarity', 'Patience', 'Inner peace'],
    recommendations: [
      'Vipassana-style seated meditation',
      'Yoga Nidra deep relaxation',
      'Philosophical reading & discussion',
      'Box breathing for mental clarity',
      'Yin yoga with meditation integration',
    ],
    color: '#6B5B8E',
  },
  Explorer: {
    title: 'The Explorer',
    emoji: '🌍',
    description: 'You are fueled by curiosity and wonder. Every new horizon, practice, or perspective is an invitation to expand your understanding of what\'s possible.',
    strengths: ['Curiosity', 'Adaptability', 'Open-mindedness', 'Spontaneity'],
    recommendations: [
      'Outdoor yoga in new environments',
      'Eclectic class variety — try everything',
      'Nature hikes with mindful walking',
      'Fusion practices (yoga + dance, etc.)',
      'Cultural immersion experiences',
    ],
    color: '#C8A96E',
  },
  Nurturer: {
    title: 'The Nurturer',
    emoji: '🌸',
    description: 'You find your deepest fulfillment in caring for others and creating harmony. Your warm presence makes every space feel like home.',
    strengths: ['Generosity', 'Warmth', 'Community building', 'Nurturing energy'],
    recommendations: [
      'Partner and group yoga sessions',
      'Cooking nourishing plant-based meals',
      'Metta (loving-kindness) meditation',
      'Community circle facilitation',
      'Gentle flow with emphasis on self-care',
    ],
    color: '#D4849A',
  },
};

export function calculateArchetype(
  answers: Record<number, number>
): { archetype: WellnessArchetype; scores: Record<WellnessArchetype, number> } {
  const scores: Record<WellnessArchetype, number> = {
    Warrior: 0,
    Healer: 0,
    Sage: 0,
    Explorer: 0,
    Nurturer: 0,
  };

  for (const [questionId, optionIndex] of Object.entries(answers)) {
    const question = quizQuestions.find((q) => q.id === Number(questionId));
    if (!question) continue;
    const option = question.options[optionIndex];
    if (!option) continue;
    for (const [arch, score] of Object.entries(option.scores)) {
      scores[arch as WellnessArchetype] += score;
    }
  }

  const archetype = (Object.entries(scores) as [WellnessArchetype, number][])
    .sort((a, b) => b[1] - a[1])[0][0];

  return { archetype, scores };
}
