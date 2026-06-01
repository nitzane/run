export const MOCK_USER = {
  name: 'Sophia',
  maxHR: 185,
  weight: 62,
  goals: ['Build aerobic base', 'Run 5K under 30min'],
  fitnessLevel: 'intermediate',
  weeklyGoalKm: 25,
  currentPlanId: 'zone2-cardio',
  currentPlanWeek: 3,
};

export const MOCK_RUNS = [
  {
    id: 'r1',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    distanceKm: 6.4,
    durationSec: 2340,
    avgPace: 365,
    avgHR: 142,
    calories: 462,
    zones: { 1: 5, 2: 68, 3: 20, 4: 7, 5: 0 },
    planId: 'zone2-cardio',
  },
  {
    id: 'r2',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    distanceKm: 5.1,
    durationSec: 1920,
    avgPace: 376,
    avgHR: 138,
    calories: 368,
    zones: { 1: 8, 2: 72, 3: 15, 4: 5, 5: 0 },
    planId: 'zone2-cardio',
  },
  {
    id: 'r3',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    distanceKm: 8.2,
    durationSec: 3180,
    avgPace: 387,
    avgHR: 140,
    calories: 591,
    zones: { 1: 3, 2: 74, 3: 18, 4: 5, 5: 0 },
    planId: 'zone2-cardio',
  },
  {
    id: 'r4',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    distanceKm: 4.8,
    durationSec: 1740,
    avgPace: 362,
    avgHR: 145,
    calories: 346,
    zones: { 1: 4, 2: 60, 3: 28, 4: 8, 5: 0 },
    planId: 'zone2-cardio',
  },
];

export const MOCK_STATS = {
  weeklyDistanceKm: 24.5,
  weeklyRuns: 4,
  weeklyTimeMin: 134,
  weeklyCalories: 1767,
  totalDistanceKm: 342.8,
  totalRuns: 47,
  currentStreak: 4,
  bestPaceSec: 318,
  avgWeeklyKm: 22.1,
};

export const MOCK_UNLOCKED_BADGES = [
  'first-run', 'runs-5', 'runs-10', 'dist-10', 'dist-50', 'streak-3', 'early-bird', 'long-5k', 'zone2-master'
];

export const MOTIVATIONAL_QUOTES = [
  "Every run begins with a single step. ✨",
  "Your only competition is who you were yesterday. 💪",
  "Run the day, or the day runs you. 🌟",
  "Strong is the new beautiful. 🌸",
  "One run at a time. One day at a time. 💜",
  "The miracle isn't that I finished — it's that I had the courage to start. 🔥",
  "Your legs are not giving out. Your head is giving up. Keep going! 🚀",
  "She believed she could, so she ran. 💖",
];
