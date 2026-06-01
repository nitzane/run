export const BADGES = [
  // First Run
  { id: 'first-run', title: 'First Step', description: 'Complete your very first run', icon: '👟', xp: 50, category: 'milestone', requirement: { type: 'runs', value: 1 } },
  // Run count
  { id: 'runs-5', title: '5 Runs Club', description: 'Complete 5 runs', icon: '🌟', xp: 100, category: 'milestone', requirement: { type: 'runs', value: 5 } },
  { id: 'runs-10', title: 'Double Digits', description: 'Complete 10 runs', icon: '🔥', xp: 200, category: 'milestone', requirement: { type: 'runs', value: 10 } },
  { id: 'runs-25', title: 'Quarter Century', description: 'Complete 25 runs', icon: '💪', xp: 400, category: 'milestone', requirement: { type: 'runs', value: 25 } },
  { id: 'runs-50', title: 'Half Century Runner', description: 'Complete 50 runs', icon: '🏅', xp: 750, category: 'milestone', requirement: { type: 'runs', value: 50 } },
  { id: 'runs-100', title: 'Century Club', description: 'Complete 100 runs', icon: '🏆', xp: 1500, category: 'milestone', requirement: { type: 'runs', value: 100 } },
  // Distance
  { id: 'dist-10', title: '10K Explorer', description: 'Run a total of 10km', icon: '🗺️', xp: 100, category: 'distance', requirement: { type: 'totalDistance', value: 10 } },
  { id: 'dist-50', title: '50K Adventurer', description: 'Run a total of 50km', icon: '🌄', xp: 250, category: 'distance', requirement: { type: 'totalDistance', value: 50 } },
  { id: 'dist-100', title: '100K Champion', description: 'Run a total of 100km', icon: '💯', xp: 500, category: 'distance', requirement: { type: 'totalDistance', value: 100 } },
  { id: 'dist-500', title: '500K Legend', description: 'Run a total of 500km', icon: '🌍', xp: 2000, category: 'distance', requirement: { type: 'totalDistance', value: 500 } },
  // Speed
  { id: 'pace-6', title: 'Quick Feet', description: 'Run at a 6:00/km pace or faster', icon: '⚡', xp: 300, category: 'speed', requirement: { type: 'bestPace', value: 360 } },
  { id: 'pace-5', title: 'Speed Demon', description: 'Run at a 5:00/km pace or faster', icon: '🚀', xp: 600, category: 'speed', requirement: { type: 'bestPace', value: 300 } },
  // Zone mastery
  { id: 'zone2-master', title: 'Zone 2 Master', description: 'Complete 10 runs entirely in Zone 2', icon: '💚', xp: 400, category: 'zone', requirement: { type: 'zone2Runs', value: 10 } },
  { id: 'hrv-hero', title: 'HRV Hero', description: 'Complete the HRV improvement plan', icon: '💜', xp: 500, category: 'zone', requirement: { type: 'planComplete', value: 'hrv-improvement' } },
  // Streaks
  { id: 'streak-3', title: '3-Day Streak', description: 'Run 3 days in a row', icon: '🔥', xp: 150, category: 'streak', requirement: { type: 'streak', value: 3 } },
  { id: 'streak-7', title: 'Week Warrior', description: 'Run 7 days in a row', icon: '🌈', xp: 400, category: 'streak', requirement: { type: 'streak', value: 7 } },
  { id: 'streak-30', title: 'Monthly Master', description: 'Run 30 days in a row', icon: '🎯', xp: 2000, category: 'streak', requirement: { type: 'streak', value: 30 } },
  // Time of day
  { id: 'early-bird', title: 'Early Bird', description: 'Complete a run before 7am', icon: '🌅', xp: 200, category: 'special', requirement: { type: 'earlyRun', value: 7 } },
  { id: 'night-owl', title: 'Night Owl', description: 'Complete a run after 9pm', icon: '🦉', xp: 200, category: 'special', requirement: { type: 'nightRun', value: 21 } },
  // Long runs
  { id: 'long-5k', title: '5K Finisher', description: 'Complete a single 5km run', icon: '🌸', xp: 200, category: 'distance', requirement: { type: 'singleRun', value: 5 } },
  { id: 'long-10k', title: '10K Warrior', description: 'Complete a single 10km run', icon: '🎖️', xp: 400, category: 'distance', requirement: { type: 'singleRun', value: 10 } },
  { id: 'long-half', title: 'Half Marathon Hero', description: 'Complete a single 21.1km run', icon: '👑', xp: 1000, category: 'distance', requirement: { type: 'singleRun', value: 21.1 } },
];

export function getXPLevel(xp) {
  const thresholds = [0, 500, 1200, 2500, 5000, 10000, 20000, 50000];
  const titles = ['Newcomer', 'Jogger', 'Runner', 'Athlete', 'Champion', 'Elite', 'Legend', 'GOD'];
  let level = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i;
  }
  const nextThreshold = thresholds[level + 1] || thresholds[thresholds.length - 1];
  const progress = level < thresholds.length - 1
    ? (xp - thresholds[level]) / (nextThreshold - thresholds[level])
    : 1;
  return { level: level + 1, title: titles[level], progress, nextXP: nextThreshold };
}
