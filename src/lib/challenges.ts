export interface Challenge {
  id: string;
  title: string;
  season: 'Spring' | 'Summer' | 'Autumn' | 'Winter';
  description: string;
  durationDays: number;
  dailyTask: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const challenges: Challenge[] = [
  {
    id: 'spring-awakening',
    title: 'Spring Awakening',
    season: 'Spring',
    description: 'Welcome the season of renewal with 21 days of morning yoga. Rise with the sun and greet each day with intention, movement, and gratitude.',
    durationDays: 21,
    dailyTask: 'Complete a morning yoga session (minimum 15 minutes)',
    icon: '🌱',
    color: '#5B7B5E',
    bgColor: '#5B7B5E10',
  },
  {
    id: 'summer-solstice',
    title: 'Summer Solstice',
    season: 'Summer',
    description: 'Harness the longest days of the year with 30 days of sunset meditation. As the sun sets, find stillness, presence, and deep inner peace.',
    durationDays: 30,
    dailyTask: 'Complete a sunset meditation session (minimum 10 minutes)',
    icon: '☀️',
    color: '#C8A96E',
    bgColor: '#C8A96E10',
  },
  {
    id: 'autumn-reset',
    title: 'Autumn Reset',
    season: 'Autumn',
    description: 'As nature sheds what no longer serves, join this 14-day digital detox. Reconnect with yourself, reduce screen time, and find clarity.',
    durationDays: 14,
    dailyTask: 'Limit screen time to essential use only - no social media',
    icon: '🍂',
    color: '#B87333',
    bgColor: '#B8733310',
  },
  {
    id: 'winter-warmth',
    title: 'Winter Warmth',
    season: 'Winter',
    description: 'Embrace the cozy season with 21 days of gratitude practice. Each day, write three things you are thankful for and share warmth with others.',
    durationDays: 21,
    dailyTask: 'Write 3 things you are grateful for in your journal',
    icon: '❄️',
    color: '#6B5B8E',
    bgColor: '#6B5B8E10',
  },
];
