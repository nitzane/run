export const BADGE_CATEGORIES = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'milestone', label: 'Milestones', icon: '🏅' },
  { id: 'distance', label: 'Distance', icon: '📏' },
  { id: 'speed', label: 'Speed', icon: '⚡' },
  { id: 'streak', label: 'Streaks', icon: '🔥' },
  { id: 'zone', label: 'Zones', icon: '💚' },
  { id: 'time', label: 'Time & Day', icon: '🌅' },
  { id: 'fun', label: 'Fun', icon: '🎉' },
  { id: 'plan', label: 'Plans', icon: '📋' },
  { id: 'secret', label: 'Secret 🔮', icon: '🔮' },
];

export const BADGES = [
  // ── MILESTONES ──────────────────────────────────────────────────────────────
  { id: 'first-run', title: 'First Step', description: 'Complete your very first run', icon: '👟', xp: 50, category: 'milestone', rarity: 'common', requirement: { type: 'runs', value: 1 } },
  { id: 'runs-3', title: 'Hat Trick', description: 'Complete 3 runs', icon: '🎩', xp: 75, category: 'milestone', rarity: 'common', requirement: { type: 'runs', value: 3 } },
  { id: 'runs-5', title: '5 Runs Club', description: 'Complete 5 runs', icon: '🌟', xp: 100, category: 'milestone', rarity: 'common', requirement: { type: 'runs', value: 5 } },
  { id: 'runs-10', title: 'Double Digits', description: 'Complete 10 runs', icon: '🔥', xp: 200, category: 'milestone', rarity: 'common', requirement: { type: 'runs', value: 10 } },
  { id: 'runs-15', title: 'On a Roll', description: 'Complete 15 runs', icon: '🎡', xp: 250, category: 'milestone', rarity: 'common', requirement: { type: 'runs', value: 15 } },
  { id: 'runs-20', title: 'Committed', description: 'Complete 20 runs', icon: '💎', xp: 300, category: 'milestone', rarity: 'common', requirement: { type: 'runs', value: 20 } },
  { id: 'runs-25', title: 'Quarter Century', description: 'Complete 25 runs', icon: '💪', xp: 400, category: 'milestone', rarity: 'uncommon', requirement: { type: 'runs', value: 25 } },
  { id: 'runs-30', title: 'Thirty & Thriving', description: 'Complete 30 runs', icon: '🌺', xp: 450, category: 'milestone', rarity: 'uncommon', requirement: { type: 'runs', value: 30 } },
  { id: 'runs-40', title: 'Forty Strong', description: 'Complete 40 runs', icon: '💥', xp: 550, category: 'milestone', rarity: 'uncommon', requirement: { type: 'runs', value: 40 } },
  { id: 'runs-50', title: 'Half Century', description: 'Complete 50 runs', icon: '🏅', xp: 750, category: 'milestone', rarity: 'uncommon', requirement: { type: 'runs', value: 50 } },
  { id: 'runs-75', title: 'Three-Quarter Legend', description: 'Complete 75 runs', icon: '🌙', xp: 1000, category: 'milestone', rarity: 'rare', requirement: { type: 'runs', value: 75 } },
  { id: 'runs-100', title: 'Century Club', description: 'Complete 100 runs', icon: '🏆', xp: 1500, category: 'milestone', rarity: 'rare', requirement: { type: 'runs', value: 100 } },
  { id: 'runs-150', title: 'Unstoppable', description: 'Complete 150 runs', icon: '🦋', xp: 2000, category: 'milestone', rarity: 'rare', requirement: { type: 'runs', value: 150 } },
  { id: 'runs-200', title: 'Run Queen', description: 'Complete 200 runs', icon: '👑', xp: 3000, category: 'milestone', rarity: 'epic', requirement: { type: 'runs', value: 200 } },
  { id: 'runs-300', title: 'The Machine', description: 'Complete 300 runs', icon: '🤖', xp: 4500, category: 'milestone', rarity: 'epic', requirement: { type: 'runs', value: 300 } },
  { id: 'runs-500', title: 'Living Legend', description: 'Complete 500 runs', icon: '🌠', xp: 7500, category: 'milestone', rarity: 'legendary', requirement: { type: 'runs', value: 500 } },
  { id: 'runs-1000', title: 'One in a Million', description: 'Complete 1000 runs', icon: '🔱', xp: 20000, category: 'milestone', rarity: 'legendary', requirement: { type: 'runs', value: 1000 } },

  // ── XP & LEVEL ──────────────────────────────────────────────────────────────
  { id: 'xp-100', title: 'First Points', description: 'Earn 100 XP', icon: '✨', xp: 0, category: 'milestone', rarity: 'common', requirement: { type: 'xp', value: 100 } },
  { id: 'xp-500', title: 'XP Earner', description: 'Earn 500 XP', icon: '💫', xp: 0, category: 'milestone', rarity: 'common', requirement: { type: 'xp', value: 500 } },
  { id: 'xp-1000', title: 'Four Figures', description: 'Earn 1,000 XP', icon: '🌟', xp: 0, category: 'milestone', rarity: 'uncommon', requirement: { type: 'xp', value: 1000 } },
  { id: 'xp-5000', title: 'XP Royalty', description: 'Earn 5,000 XP', icon: '👑', xp: 0, category: 'milestone', rarity: 'rare', requirement: { type: 'xp', value: 5000 } },
  { id: 'xp-10000', title: 'XP God Mode', description: 'Earn 10,000 XP', icon: '🔱', xp: 0, category: 'milestone', rarity: 'epic', requirement: { type: 'xp', value: 10000 } },
  { id: 'level-jogger', title: 'Level Up: Jogger', description: 'Reach Jogger level', icon: '🐇', xp: 0, category: 'milestone', rarity: 'common', requirement: { type: 'level', value: 2 } },
  { id: 'level-runner', title: 'Level Up: Runner', description: 'Reach Runner level', icon: '🏃‍♀️', xp: 0, category: 'milestone', rarity: 'uncommon', requirement: { type: 'level', value: 3 } },
  { id: 'level-athlete', title: 'Level Up: Athlete', description: 'Reach Athlete level', icon: '⚡', xp: 0, category: 'milestone', rarity: 'uncommon', requirement: { type: 'level', value: 4 } },
  { id: 'level-champion', title: 'Level Up: Champion', description: 'Reach Champion level', icon: '🏆', xp: 0, category: 'milestone', rarity: 'rare', requirement: { type: 'level', value: 5 } },
  { id: 'level-elite', title: 'Level Up: Elite', description: 'Reach Elite level', icon: '💎', xp: 0, category: 'milestone', rarity: 'epic', requirement: { type: 'level', value: 6 } },
  { id: 'level-legend', title: 'Level Up: Legend', description: 'Reach Legend level', icon: '🌠', xp: 0, category: 'milestone', rarity: 'legendary', requirement: { type: 'level', value: 7 } },

  // ── CUMULATIVE DISTANCE ─────────────────────────────────────────────────────
  { id: 'dist-1', title: 'First Kilometre', description: 'Run your first 1km ever', icon: '📍', xp: 25, category: 'distance', rarity: 'common', requirement: { type: 'totalDistance', value: 1 } },
  { id: 'dist-5', title: 'Five K Total', description: 'Run a total of 5km', icon: '🌱', xp: 50, category: 'distance', rarity: 'common', requirement: { type: 'totalDistance', value: 5 } },
  { id: 'dist-10', title: '10K Explorer', description: 'Run a total of 10km', icon: '🗺️', xp: 100, category: 'distance', rarity: 'common', requirement: { type: 'totalDistance', value: 10 } },
  { id: 'dist-25', title: 'Quarter Century KM', description: 'Run a total of 25km', icon: '🏃‍♀️', xp: 175, category: 'distance', rarity: 'common', requirement: { type: 'totalDistance', value: 25 } },
  { id: 'dist-50', title: '50K Adventurer', description: 'Run a total of 50km', icon: '🌄', xp: 250, category: 'distance', rarity: 'common', requirement: { type: 'totalDistance', value: 50 } },
  { id: 'dist-100', title: '100K Champion', description: 'Run a total of 100km', icon: '💯', xp: 500, category: 'distance', rarity: 'uncommon', requirement: { type: 'totalDistance', value: 100 } },
  { id: 'dist-250', title: '250K Trailblazer', description: 'Run a total of 250km', icon: '🔭', xp: 1000, category: 'distance', rarity: 'uncommon', requirement: { type: 'totalDistance', value: 250 } },
  { id: 'dist-500', title: '500K Legend', description: 'Run a total of 500km', icon: '🌍', xp: 2000, category: 'distance', rarity: 'rare', requirement: { type: 'totalDistance', value: 500 } },
  { id: 'dist-750', title: '750K Wanderer', description: 'Run a total of 750km', icon: '🌏', xp: 3000, category: 'distance', rarity: 'rare', requirement: { type: 'totalDistance', value: 750 } },
  { id: 'dist-1000', title: 'Thousand K Club', description: 'Run a total of 1000km', icon: '🌐', xp: 5000, category: 'distance', rarity: 'epic', requirement: { type: 'totalDistance', value: 1000 } },
  { id: 'dist-2000', title: 'World Traveller', description: 'Run a total of 2000km', icon: '✈️', xp: 10000, category: 'distance', rarity: 'legendary', requirement: { type: 'totalDistance', value: 2000 } },
  { id: 'dist-5000', title: 'Around the World', description: "Run 5000km — that's ⅛ of Earth!", icon: '🌎', xp: 25000, category: 'distance', rarity: 'legendary', requirement: { type: 'totalDistance', value: 5000 } },

  // ── SINGLE-RUN DISTANCE ─────────────────────────────────────────────────────
  { id: 'single-1k', title: 'Baby Steps', description: 'Run 1km without stopping', icon: '🐣', xp: 30, category: 'distance', rarity: 'common', requirement: { type: 'singleRun', value: 1 } },
  { id: 'single-2k', title: "Two's Company", description: 'Run 2km in one go', icon: '🤸', xp: 50, category: 'distance', rarity: 'common', requirement: { type: 'singleRun', value: 2 } },
  { id: 'single-3k', title: 'Three Amigos', description: 'Run 3km in one go', icon: '🎈', xp: 75, category: 'distance', rarity: 'common', requirement: { type: 'singleRun', value: 3 } },
  { id: 'single-5k', title: '5K Finisher', description: 'Complete a single 5km run', icon: '🌸', xp: 200, category: 'distance', rarity: 'common', requirement: { type: 'singleRun', value: 5 } },
  { id: 'single-8k', title: '8K Star', description: 'Complete a single 8km run', icon: '⭐', xp: 300, category: 'distance', rarity: 'uncommon', requirement: { type: 'singleRun', value: 8 } },
  { id: 'single-10k', title: '10K Warrior', description: 'Complete a single 10km run', icon: '🎖️', xp: 400, category: 'distance', rarity: 'uncommon', requirement: { type: 'singleRun', value: 10 } },
  { id: 'single-12k', title: '12K Crusher', description: 'Complete a single 12km run', icon: '💥', xp: 500, category: 'distance', rarity: 'uncommon', requirement: { type: 'singleRun', value: 12 } },
  { id: 'single-15k', title: '15K Powerhouse', description: 'Complete a single 15km run', icon: '🔥', xp: 600, category: 'distance', rarity: 'uncommon', requirement: { type: 'singleRun', value: 15 } },
  { id: 'single-18k', title: '18K Machine', description: 'Complete a single 18km run', icon: '🦾', xp: 750, category: 'distance', rarity: 'rare', requirement: { type: 'singleRun', value: 18 } },
  { id: 'single-half', title: 'Half Marathon Hero', description: 'Run 21.1km in one go', icon: '👑', xp: 1000, category: 'distance', rarity: 'rare', requirement: { type: 'singleRun', value: 21.1 } },
  { id: 'single-25k', title: '25K Queen', description: 'Run 25km in one go', icon: '💜', xp: 1500, category: 'distance', rarity: 'rare', requirement: { type: 'singleRun', value: 25 } },
  { id: 'single-30k', title: '30K Monster', description: 'Run 30km in one go', icon: '🦅', xp: 2000, category: 'distance', rarity: 'epic', requirement: { type: 'singleRun', value: 30 } },
  { id: 'single-marathon', title: 'Marathon Goddess', description: 'Run the full 42.2km', icon: '🏅', xp: 5000, category: 'distance', rarity: 'legendary', requirement: { type: 'singleRun', value: 42.2 } },

  // ── SPEED & PACE ────────────────────────────────────────────────────────────
  { id: 'pace-7', title: 'Getting There', description: 'Run at a 7:00/km pace', icon: '🐢', xp: 150, category: 'speed', rarity: 'common', requirement: { type: 'bestPace', value: 420 } },
  { id: 'pace-630', title: 'Picking Up', description: 'Run at a 6:30/km pace', icon: '🦊', xp: 200, category: 'speed', rarity: 'common', requirement: { type: 'bestPace', value: 390 } },
  { id: 'pace-6', title: 'Quick Feet', description: 'Run at a 6:00/km pace', icon: '⚡', xp: 300, category: 'speed', rarity: 'uncommon', requirement: { type: 'bestPace', value: 360 } },
  { id: 'pace-530', title: 'Speed Seeker', description: 'Run at a 5:30/km pace', icon: '🌪️', xp: 400, category: 'speed', rarity: 'uncommon', requirement: { type: 'bestPace', value: 330 } },
  { id: 'pace-5', title: 'Speed Demon', description: 'Run at a 5:00/km pace', icon: '🚀', xp: 600, category: 'speed', rarity: 'rare', requirement: { type: 'bestPace', value: 300 } },
  { id: 'pace-430', title: 'Flying', description: 'Run at a 4:30/km pace', icon: '🦅', xp: 900, category: 'speed', rarity: 'rare', requirement: { type: 'bestPace', value: 270 } },
  { id: 'pace-4', title: 'Sonic', description: 'Run at a 4:00/km pace', icon: '💨', xp: 1500, category: 'speed', rarity: 'epic', requirement: { type: 'bestPace', value: 240 } },
  { id: 'pace-330', title: 'Cheetah Mode', description: 'Run at a 3:30/km pace', icon: '🐆', xp: 3000, category: 'speed', rarity: 'legendary', requirement: { type: 'bestPace', value: 210 } },
  { id: 'sub25-5k', title: 'Sub-25 5K', description: 'Run 5K in under 25 minutes', icon: '⏱️', xp: 500, category: 'speed', rarity: 'uncommon', requirement: { type: 'racePB', value: { distance: 5, time: 1500 } } },
  { id: 'sub23-5k', title: 'Sub-23 5K', description: 'Run 5K in under 23 minutes', icon: '🎯', xp: 800, category: 'speed', rarity: 'rare', requirement: { type: 'racePB', value: { distance: 5, time: 1380 } } },
  { id: 'sub20-5k', title: 'Elite 5K', description: 'Run 5K in under 20 minutes', icon: '🌟', xp: 2000, category: 'speed', rarity: 'epic', requirement: { type: 'racePB', value: { distance: 5, time: 1200 } } },
  { id: 'sub55-10k', title: 'Sub-55 10K', description: 'Run 10K in under 55 minutes', icon: '🏃', xp: 700, category: 'speed', rarity: 'uncommon', requirement: { type: 'racePB', value: { distance: 10, time: 3300 } } },
  { id: 'sub50-10k', title: 'Sub-50 10K', description: 'Run 10K in under 50 minutes', icon: '🎖️', xp: 1200, category: 'speed', rarity: 'rare', requirement: { type: 'racePB', value: { distance: 10, time: 3000 } } },
  { id: 'sub45-10k', title: 'Elite 10K', description: 'Run 10K in under 45 minutes', icon: '💫', xp: 2500, category: 'speed', rarity: 'epic', requirement: { type: 'racePB', value: { distance: 10, time: 2700 } } },
  { id: 'sub2-half', title: 'Sub-2hr Half', description: 'Run a half marathon under 2 hours', icon: '⌚', xp: 3000, category: 'speed', rarity: 'epic', requirement: { type: 'racePB', value: { distance: 21.1, time: 7200 } } },
  { id: 'sub4-marathon', title: 'Sub-4hr Marathon', description: 'Run a marathon under 4 hours', icon: '🌈', xp: 7500, category: 'speed', rarity: 'legendary', requirement: { type: 'racePB', value: { distance: 42.2, time: 14400 } } },
  { id: 'negative-split', title: 'Negative Splitter', description: 'Run the second half faster than the first', icon: '📉', xp: 350, category: 'speed', rarity: 'uncommon', requirement: { type: 'negativeSplit', value: true } },
  { id: 'negative-split-5', title: 'Split Master', description: 'Achieve a negative split 5 times', icon: '📊', xp: 1000, category: 'speed', rarity: 'rare', requirement: { type: 'negativeSplits', value: 5 } },
  { id: 'pace-improve-30s', title: 'Getting Faster', description: 'Improve your best 5K pace by 30 seconds', icon: '📈', xp: 500, category: 'speed', rarity: 'uncommon', requirement: { type: 'paceImprovement', value: 30 } },
  { id: 'pace-improve-1min', title: 'Rocket Progress', description: 'Improve your best 5K pace by 1 full minute', icon: '🚀', xp: 1200, category: 'speed', rarity: 'rare', requirement: { type: 'paceImprovement', value: 60 } },
  { id: 'new-pb', title: 'Personal Best!', description: 'Set a new personal record', icon: '🎉', xp: 250, category: 'speed', rarity: 'uncommon', requirement: { type: 'newPB', value: true } },
  { id: 'pb-5', title: 'PB Collector', description: 'Set 5 personal records', icon: '🏆', xp: 800, category: 'speed', rarity: 'rare', requirement: { type: 'pbCount', value: 5 } },
  { id: 'pb-10', title: 'PB Machine', description: 'Set 10 personal records', icon: '💎', xp: 2000, category: 'speed', rarity: 'epic', requirement: { type: 'pbCount', value: 10 } },

  // ── STREAKS ─────────────────────────────────────────────────────────────────
  { id: 'streak-2', title: 'Back to Back', description: 'Run 2 days in a row', icon: '✌️', xp: 75, category: 'streak', rarity: 'common', requirement: { type: 'streak', value: 2 } },
  { id: 'streak-3', title: '3-Day Fire', description: 'Run 3 days in a row', icon: '🔥', xp: 150, category: 'streak', rarity: 'common', requirement: { type: 'streak', value: 3 } },
  { id: 'streak-5', title: 'Work Week Warrior', description: 'Run 5 days in a row', icon: '💼', xp: 250, category: 'streak', rarity: 'uncommon', requirement: { type: 'streak', value: 5 } },
  { id: 'streak-7', title: 'Week Warrior', description: 'Run 7 days in a row', icon: '🌈', xp: 400, category: 'streak', rarity: 'uncommon', requirement: { type: 'streak', value: 7 } },
  { id: 'streak-10', title: 'Ten-Day Tiger', description: 'Run 10 days in a row', icon: '🐯', xp: 600, category: 'streak', rarity: 'uncommon', requirement: { type: 'streak', value: 10 } },
  { id: 'streak-14', title: 'Two-Week Wonder', description: 'Run 14 days in a row', icon: '💫', xp: 900, category: 'streak', rarity: 'rare', requirement: { type: 'streak', value: 14 } },
  { id: 'streak-21', title: 'Habit Formed', description: "Run 21 days in a row — science says that's a habit!", icon: '🧠', xp: 1200, category: 'streak', rarity: 'rare', requirement: { type: 'streak', value: 21 } },
  { id: 'streak-30', title: 'Monthly Master', description: 'Run 30 days in a row', icon: '🎯', xp: 2000, category: 'streak', rarity: 'epic', requirement: { type: 'streak', value: 30 } },
  { id: 'streak-50', title: 'Fifty-Day Legend', description: 'Run 50 days in a row', icon: '🦁', xp: 4000, category: 'streak', rarity: 'epic', requirement: { type: 'streak', value: 50 } },
  { id: 'streak-100', title: 'Century Streak', description: 'Run 100 days in a row', icon: '💎', xp: 10000, category: 'streak', rarity: 'legendary', requirement: { type: 'streak', value: 100 } },
  { id: 'weekly-goal-1', title: 'Goal Getter', description: 'Hit your weekly distance goal', icon: '🎯', xp: 100, category: 'streak', rarity: 'common', requirement: { type: 'weeklyGoal', value: 1 } },
  { id: 'weekly-goal-4', title: 'Monthly Goal Machine', description: 'Hit your weekly goal 4 weeks in a row', icon: '📅', xp: 500, category: 'streak', rarity: 'uncommon', requirement: { type: 'weeklyGoal', value: 4 } },
  { id: 'weekly-goal-12', title: 'Quarter Queen', description: 'Hit your weekly goal 12 weeks in a row', icon: '👸', xp: 2000, category: 'streak', rarity: 'rare', requirement: { type: 'weeklyGoal', value: 12 } },
  { id: 'monthly-runs-8', title: 'Month of Motion', description: 'Complete 8 runs in a single month', icon: '📆', xp: 400, category: 'streak', rarity: 'uncommon', requirement: { type: 'monthlyRuns', value: 8 } },
  { id: 'monthly-runs-15', title: 'Power Month', description: 'Complete 15 runs in a single month', icon: '💪', xp: 900, category: 'streak', rarity: 'rare', requirement: { type: 'monthlyRuns', value: 15 } },
  { id: 'monthly-runs-20', title: 'Run All Month', description: 'Complete 20 runs in a single month', icon: '🗓️', xp: 1500, category: 'streak', rarity: 'epic', requirement: { type: 'monthlyRuns', value: 20 } },
  { id: 'consistency-3-weeks', title: 'Three-Week Champ', description: 'Run at least once every week for 3 weeks', icon: '📆', xp: 300, category: 'streak', rarity: 'uncommon', requirement: { type: 'weeklyConsistency', value: 3 } },
  { id: 'consistency-2-months', title: 'Two-Month Strong', description: 'Run at least once every week for 2 months', icon: '🗓️', xp: 800, category: 'streak', rarity: 'rare', requirement: { type: 'weeklyConsistency', value: 8 } },
  { id: 'consistency-6-months', title: 'Half-Year Habit', description: 'Run at least once a week for 6 months', icon: '📅', xp: 3000, category: 'streak', rarity: 'epic', requirement: { type: 'weeklyConsistency', value: 26 } },
  { id: 'consistency-year', title: 'Year-Round Runner', description: 'Run at least once a week for a full year', icon: '🗝️', xp: 10000, category: 'streak', rarity: 'legendary', requirement: { type: 'weeklyConsistency', value: 52 } },
  { id: 'improvement-month', title: 'Monthly Progress', description: 'Run more distance this month than last month', icon: '↗️', xp: 400, category: 'streak', rarity: 'uncommon', requirement: { type: 'monthOverMonth', value: true } },

  // ── ZONES & HEART RATE ──────────────────────────────────────────────────────
  { id: 'zone1-first', title: 'Recovery Mode', description: 'Complete a Zone 1 recovery run', icon: '🛀', xp: 75, category: 'zone', rarity: 'common', requirement: { type: 'zoneRun', value: 1 } },
  { id: 'zone2-first', title: 'Aerobic Awakening', description: 'Complete your first Zone 2 run', icon: '💚', xp: 100, category: 'zone', rarity: 'common', requirement: { type: 'zoneRun', value: 2 } },
  { id: 'zone2-5', title: 'Zone 2 Regular', description: 'Complete 5 Zone 2 runs', icon: '🌿', xp: 250, category: 'zone', rarity: 'uncommon', requirement: { type: 'zone2Runs', value: 5 } },
  { id: 'zone2-master', title: 'Zone 2 Master', description: 'Complete 10 Zone 2 runs', icon: '🍀', xp: 500, category: 'zone', rarity: 'rare', requirement: { type: 'zone2Runs', value: 10 } },
  { id: 'zone2-addict', title: 'Zone 2 Devotee', description: 'Complete 25 Zone 2 runs', icon: '💎', xp: 1500, category: 'zone', rarity: 'epic', requirement: { type: 'zone2Runs', value: 25 } },
  { id: 'zone3-first', title: 'Tempo Taster', description: 'Complete your first Zone 3 tempo run', icon: '💛', xp: 150, category: 'zone', rarity: 'common', requirement: { type: 'zoneRun', value: 3 } },
  { id: 'zone4-first', title: 'Threshold Crusher', description: 'Complete your first Zone 4 run', icon: '🧡', xp: 200, category: 'zone', rarity: 'uncommon', requirement: { type: 'zoneRun', value: 4 } },
  { id: 'zone5-first', title: 'Red Lining', description: 'Push into Zone 5 for the first time', icon: '❤️‍🔥', xp: 300, category: 'zone', rarity: 'uncommon', requirement: { type: 'zoneRun', value: 5 } },
  { id: 'zone-all', title: 'Zone Collector', description: 'Run in all 5 HR zones', icon: '🌈', xp: 500, category: 'zone', rarity: 'rare', requirement: { type: 'allZones', value: true } },
  { id: 'zone-disciplined', title: 'Heart of Control', description: 'Complete 5 runs staying only in your target zone', icon: '🎛️', xp: 600, category: 'zone', rarity: 'rare', requirement: { type: 'zoneControl', value: 5 } },
  { id: 'fat-burner', title: 'Fat Burner', description: 'Spend 60+ minutes in Zone 2 in one run', icon: '🔥', xp: 400, category: 'zone', rarity: 'uncommon', requirement: { type: 'zone2Duration', value: 60 } },
  { id: 'fat-burner-elite', title: 'Fat Burner Elite', description: 'Spend 90+ minutes in Zone 2 in one run', icon: '💥', xp: 800, category: 'zone', rarity: 'rare', requirement: { type: 'zone2Duration', value: 90 } },
  { id: 'hrv-hero', title: 'HRV Hero', description: 'Complete the full HRV improvement plan', icon: '💜', xp: 500, category: 'zone', rarity: 'rare', requirement: { type: 'planComplete', value: 'hrv-improvement' } },
  { id: 'hrv-improved', title: 'Heart Hacker', description: 'Improve your HRV score by 10%', icon: '📈', xp: 800, category: 'zone', rarity: 'rare', requirement: { type: 'hrvImproved', value: 10 } },
  { id: 'resting-hr-drop', title: 'Efficiency Queen', description: 'Lower your resting HR by 5 BPM over 30 days', icon: '📉', xp: 1000, category: 'zone', rarity: 'epic', requirement: { type: 'restingHRDrop', value: 5 } },
  { id: 'health-sync', title: 'Health Connected', description: 'Connect Apple Health to the app', icon: '❤️', xp: 150, category: 'zone', rarity: 'common', requirement: { type: 'healthConnected', value: true } },
  { id: 'health-vo2-40', title: 'VO2 Solid', description: 'Reach a VO2 max of 40+', icon: '🌬️', xp: 400, category: 'zone', rarity: 'uncommon', requirement: { type: 'vo2', value: 40 } },
  { id: 'health-vo2-50', title: 'VO2 Strong', description: 'Reach a VO2 max of 50+', icon: '💪', xp: 1000, category: 'zone', rarity: 'rare', requirement: { type: 'vo2', value: 50 } },
  { id: 'health-vo2-60', title: 'VO2 Elite', description: 'Reach a VO2 max of 60+', icon: '🦁', xp: 3000, category: 'zone', rarity: 'epic', requirement: { type: 'vo2', value: 60 } },
  { id: 'recovery-smart', title: 'Smart Recoverer', description: 'Complete a Zone 1 run the day after a hard effort', icon: '🧘', xp: 200, category: 'zone', rarity: 'uncommon', requirement: { type: 'recoveryRun', value: true } },
  { id: 'max-hr-set', title: 'Know Your Limits', description: 'Set your maximum heart rate in the app', icon: '💓', xp: 100, category: 'zone', rarity: 'common', requirement: { type: 'maxHRSet', value: true } },

  // ── TIME OF DAY ─────────────────────────────────────────────────────────────
  { id: 'early-bird', title: 'Early Bird', description: 'Complete a run before 7am', icon: '🌅', xp: 200, category: 'time', rarity: 'uncommon', requirement: { type: 'earlyRun', value: 7 } },
  { id: 'dawn-patrol', title: 'Dawn Patrol', description: 'Run before 6am', icon: '🌄', xp: 300, category: 'time', rarity: 'uncommon', requirement: { type: 'earlyRun', value: 6 } },
  { id: 'sunrise-runner', title: 'Sunrise Runner', description: 'Run before 5:30am', icon: '☀️', xp: 500, category: 'time', rarity: 'rare', requirement: { type: 'earlyRun', value: 5.5 } },
  { id: 'night-owl', title: 'Night Owl', description: 'Complete a run after 9pm', icon: '🦉', xp: 200, category: 'time', rarity: 'uncommon', requirement: { type: 'nightRun', value: 21 } },
  { id: 'midnight-madness', title: 'Midnight Madness', description: 'Start a run after midnight', icon: '🌚', xp: 400, category: 'time', rarity: 'rare', requirement: { type: 'midnightRun', value: true } },
  { id: 'lunch-escape', title: 'Lunch Escape', description: 'Run between 12pm and 2pm', icon: '🥗', xp: 150, category: 'time', rarity: 'common', requirement: { type: 'lunchRun', value: true } },
  { id: 'morning-person', title: 'Morning Person', description: 'Complete 10 runs before 8am', icon: '☕', xp: 600, category: 'time', rarity: 'rare', requirement: { type: 'earlyRunCount', value: 10 } },
  { id: 'monday-motivation', title: 'Monday Motivation', description: 'Run on a Monday', icon: '📅', xp: 100, category: 'time', rarity: 'common', requirement: { type: 'dayOfWeek', value: 1 } },
  { id: 'weekend-warrior', title: 'Weekend Warrior', description: 'Run on both Saturday and Sunday in the same weekend', icon: '🏖️', xp: 250, category: 'time', rarity: 'uncommon', requirement: { type: 'weekendDouble', value: true } },
  { id: 'weekend-4', title: 'Weekend Regular', description: 'Run on weekends 4 weekends in a row', icon: '🌊', xp: 600, category: 'time', rarity: 'rare', requirement: { type: 'weekendStreak', value: 4 } },
  { id: 'holiday-run', title: 'Holiday Hustle', description: 'Run on a public holiday', icon: '🎄', xp: 300, category: 'time', rarity: 'uncommon', requirement: { type: 'holidayRun', value: true } },
  { id: 'birthday-run', title: 'Birthday Runner', description: 'Run on your birthday', icon: '🎂', xp: 500, category: 'time', rarity: 'rare', requirement: { type: 'birthdayRun', value: true } },
  { id: 'new-year-run', title: 'New Year Starter', description: 'Run on January 1st', icon: '🎆', xp: 400, category: 'time', rarity: 'uncommon', requirement: { type: 'newYearRun', value: true } },
  { id: 'valentines-run', title: 'Love Runner', description: "Run on Valentine's Day", icon: '💝', xp: 300, category: 'time', rarity: 'uncommon', requirement: { type: 'specialDay', value: 'valentine' } },
  { id: 'four-seasons', title: 'Four Seasons', description: 'Run in all four seasons', icon: '🍂', xp: 800, category: 'time', rarity: 'rare', requirement: { type: 'allSeasons', value: true } },
  { id: 'summer-solstice', title: 'Solstice Runner', description: 'Run on the summer solstice', icon: '☀️', xp: 350, category: 'time', rarity: 'rare', requirement: { type: 'specialDay', value: 'solstice' } },

  // ── FUN & QUIRKY ────────────────────────────────────────────────────────────
  { id: 'sweat-equity', title: 'Sweat Equity', description: 'Burn 500 calories in one run', icon: '💦', xp: 250, category: 'fun', rarity: 'uncommon', requirement: { type: 'calories', value: 500 } },
  { id: 'calorie-crusher', title: 'Calorie Crusher', description: 'Burn 1000 calories in one run', icon: '🌊', xp: 600, category: 'fun', rarity: 'rare', requirement: { type: 'calories', value: 1000 } },
  { id: 'pizza-earned', title: 'Pizza Earned 🍕', description: "Burn 800 calories — that's a whole pizza!", icon: '🍕', xp: 400, category: 'fun', rarity: 'uncommon', requirement: { type: 'calories', value: 800 } },
  { id: 'donut-justified', title: 'Donut Justified', description: 'Burn enough calories for a treat', icon: '🍩', xp: 200, category: 'fun', rarity: 'common', requirement: { type: 'calories', value: 300 } },
  { id: 'spaghetti-run', title: 'Spaghetti Run', description: 'Burn exactly 250 calories — carb neutral!', icon: '🍝', xp: 150, category: 'fun', rarity: 'common', requirement: { type: 'caloriesExact', value: 250 } },
  { id: 'bubble-tea', title: 'Bubble Tea Run', description: 'Burn 400 calories — treat yourself!', icon: '🧋', xp: 200, category: 'fun', rarity: 'common', requirement: { type: 'calories', value: 400 } },
  { id: 'one-hour', title: 'One Hour Wonder', description: 'Run for a full hour without stopping', icon: '⏰', xp: 300, category: 'fun', rarity: 'uncommon', requirement: { type: 'duration', value: 60 } },
  { id: 'two-hours', title: 'Two-Hour Club', description: 'Run for two full hours', icon: '🕐', xp: 700, category: 'fun', rarity: 'rare', requirement: { type: 'duration', value: 120 } },
  { id: 'three-hours', title: 'Ultra Spirit', description: 'Run for three hours', icon: '🕒', xp: 1500, category: 'fun', rarity: 'epic', requirement: { type: 'duration', value: 180 } },
  { id: 'total-10hr', title: '10 Hours of Running', description: 'Accumulate 10 hours of total run time', icon: '⏳', xp: 400, category: 'fun', rarity: 'uncommon', requirement: { type: 'totalTime', value: 600 } },
  { id: 'total-50hr', title: '50 Hours Club', description: 'Accumulate 50 hours of total run time', icon: '🕰️', xp: 2000, category: 'fun', rarity: 'rare', requirement: { type: 'totalTime', value: 3000 } },
  { id: 'total-100hr', title: 'Centurion of Time', description: 'Accumulate 100 hours of total run time', icon: '⌚', xp: 5000, category: 'fun', rarity: 'epic', requirement: { type: 'totalTime', value: 6000 } },
  { id: 'comeback', title: 'Comeback Queen', description: 'Return to running after a 2-week break', icon: '🦋', xp: 300, category: 'fun', rarity: 'uncommon', requirement: { type: 'comeback', value: 14 } },
  { id: 'rain-runner', title: 'Rain Runner', description: 'Run in the rain', icon: '🌧️', xp: 250, category: 'fun', rarity: 'uncommon', requirement: { type: 'weather', value: 'rain' } },
  { id: 'summer-sprinter', title: 'Summer Sprinter', description: "Run when it's above 28°C", icon: '🌡️', xp: 300, category: 'fun', rarity: 'uncommon', requirement: { type: 'weather', value: 'hot' } },
  { id: 'ice-queen', title: 'Ice Queen', description: "Run when it's below 5°C", icon: '🧊', xp: 300, category: 'fun', rarity: 'uncommon', requirement: { type: 'weather', value: 'cold' } },
  { id: 'wind-warrior', title: 'Wind Warrior', description: 'Run in strong winds', icon: '🌬️', xp: 250, category: 'fun', rarity: 'uncommon', requirement: { type: 'weather', value: 'wind' } },
  { id: 'snow-bunny', title: 'Snow Bunny', description: 'Run in the snow', icon: '❄️', xp: 400, category: 'fun', rarity: 'rare', requirement: { type: 'weather', value: 'snow' } },
  { id: 'feel-good', title: 'Endorphin Rush', description: 'Rate a run 5 stars', icon: '😊', xp: 100, category: 'fun', rarity: 'common', requirement: { type: 'rating', value: 5 } },
  { id: 'always-positive', title: 'Always Positive', description: 'Rate 10 runs 5 stars', icon: '⭐', xp: 400, category: 'fun', rarity: 'uncommon', requirement: { type: 'ratingCount', value: 10 } },
  { id: 'voice-coach', title: 'Listen Up', description: 'Use voice guidance in 5 runs', icon: '🎤', xp: 150, category: 'fun', rarity: 'common', requirement: { type: 'voiceGuidance', value: 5 } },
  { id: 'voice-fanatic', title: 'Voice Fanatic', description: 'Use voice guidance in 25 runs', icon: '🎙️', xp: 500, category: 'fun', rarity: 'uncommon', requirement: { type: 'voiceGuidance', value: 25 } },
  { id: 'strava-share', title: 'Social Runner', description: 'Share a run to Strava', icon: '📱', xp: 100, category: 'fun', rarity: 'common', requirement: { type: 'stravaShare', value: 1 } },
  { id: 'strava-10', title: 'Strava Star', description: 'Share 10 runs to Strava', icon: '🟠', xp: 300, category: 'fun', rarity: 'uncommon', requirement: { type: 'stravaShare', value: 10 } },
  { id: 'hill-climber', title: 'Hill Climber', description: 'Accumulate 500m of elevation gain', icon: '⛰️', xp: 350, category: 'fun', rarity: 'uncommon', requirement: { type: 'elevation', value: 500 } },
  { id: 'mountain-goat', title: 'Mountain Goat', description: 'Accumulate 2000m of elevation gain', icon: '🏔️', xp: 1000, category: 'fun', rarity: 'rare', requirement: { type: 'elevation', value: 2000 } },
  { id: 'everest', title: 'Everest Climber', description: "Accumulate 8848m of elevation — Everest's height!", icon: '🗻', xp: 5000, category: 'fun', rarity: 'legendary', requirement: { type: 'elevation', value: 8848 } },
  { id: 'explorer', title: 'Explorer', description: 'Run a new route for the first time', icon: '🧭', xp: 150, category: 'fun', rarity: 'common', requirement: { type: 'newRoute', value: 1 } },
  { id: 'route-5', title: 'Route Collector', description: 'Run 5 different routes', icon: '🗺️', xp: 400, category: 'fun', rarity: 'uncommon', requirement: { type: 'newRoute', value: 5 } },
  { id: 'route-10', title: 'Route Master', description: 'Run 10 different routes', icon: '📍', xp: 800, category: 'fun', rarity: 'rare', requirement: { type: 'newRoute', value: 10 } },
  { id: 'park-princess', title: 'Park Princess', description: 'Run through a park', icon: '🌳', xp: 150, category: 'fun', rarity: 'common', requirement: { type: 'parkRun', value: true } },
  { id: 'beach-babe', title: 'Beach Babe', description: 'Run along the beach', icon: '🏖️', xp: 250, category: 'fun', rarity: 'uncommon', requirement: { type: 'beachRun', value: true } },
  { id: 'trail-blazer', title: 'Trail Blazer', description: 'Run on a trail', icon: '🌲', xp: 200, category: 'fun', rarity: 'uncommon', requirement: { type: 'trailRun', value: true } },
  { id: 'jet-setter', title: 'Jet-Setter Runner', description: 'Run in a different city than your home', icon: '🛫', xp: 350, category: 'fun', rarity: 'rare', requirement: { type: 'travelRun', value: true } },
  { id: 'run-5-cities', title: 'Global Legs', description: 'Run in 5 different cities', icon: '🌍', xp: 1000, category: 'fun', rarity: 'epic', requirement: { type: 'citiesRun', value: 5 } },

  // ── TRAINING PLANS ──────────────────────────────────────────────────────────
  { id: 'plan-any-start', title: 'Plan Starter', description: 'Start any training plan', icon: '📋', xp: 100, category: 'plan', rarity: 'common', requirement: { type: 'planStarted', value: 1 } },
  { id: 'plan-zone2-complete', title: 'Zone 2 Graduate', description: 'Complete the Zone 2 Cardio plan', icon: '🎓', xp: 1000, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: 'zone2-cardio' } },
  { id: 'plan-hrv-complete', title: 'HRV Graduate', description: 'Complete the HRV Improvement plan', icon: '💜', xp: 800, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: 'hrv-improvement' } },
  { id: 'plan-5k-complete', title: '5K Graduate', description: 'Complete the 5K Beginner plan', icon: '🌸', xp: 700, category: 'plan', rarity: 'uncommon', requirement: { type: 'planComplete', value: '5k-beginner' } },
  { id: 'plan-10k-complete', title: '10K Graduate', description: 'Complete the 10K Intermediate plan', icon: '🎖️', xp: 1200, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: '10k-intermediate' } },
  { id: 'plan-half-complete', title: 'Half Marathon Graduate', description: 'Complete the Half Marathon plan', icon: '👑', xp: 2500, category: 'plan', rarity: 'epic', requirement: { type: 'planComplete', value: 'half-marathon' } },
  { id: 'plan-speed-complete', title: 'Speed Graduate', description: 'Complete the Speed & Intervals plan', icon: '⚡', xp: 1500, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: 'speed-intervals' } },
  { id: 'plan-marathon-complete', title: 'Marathon Graduate', description: 'Complete the Marathon plan', icon: '🏅', xp: 5000, category: 'plan', rarity: 'legendary', requirement: { type: 'planComplete', value: 'marathon' } },
  { id: 'plan-weight-loss-complete', title: 'Body Transformer', description: 'Complete the Weight Loss plan', icon: '🌺', xp: 1200, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: 'weight-loss' } },
  { id: 'plan-trail-complete', title: 'Trail Conqueror', description: 'Complete the Trail Running plan', icon: '🌲', xp: 1500, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: 'trail-running' } },
  { id: 'plan-beginner-complete', title: 'Beginner No More', description: 'Complete the Absolute Beginner plan', icon: '🌱', xp: 600, category: 'plan', rarity: 'uncommon', requirement: { type: 'planComplete', value: 'absolute-beginner' } },
  { id: 'plan-postpartum-complete', title: 'Comeback Mom', description: 'Complete the Postpartum Recovery plan', icon: '💕', xp: 1000, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: 'postpartum' } },
  { id: 'plan-senior-complete', title: 'Ageless Athlete', description: 'Complete the 50+ Running plan', icon: '🌟', xp: 1000, category: 'plan', rarity: 'rare', requirement: { type: 'planComplete', value: 'senior-runner' } },
  { id: 'plan-2-done', title: 'Double Planner', description: 'Complete 2 different training plans', icon: '📚', xp: 1500, category: 'plan', rarity: 'rare', requirement: { type: 'plansCompleted', value: 2 } },
  { id: 'plan-5-done', title: 'Plan Collector', description: 'Complete 5 different training plans', icon: '📖', xp: 5000, category: 'plan', rarity: 'epic', requirement: { type: 'plansCompleted', value: 5 } },
  { id: 'plan-all-done', title: 'Plan Master', description: 'Complete every available training plan', icon: '🌠', xp: 15000, category: 'plan', rarity: 'legendary', requirement: { type: 'plansCompleted', value: 12 } },
  { id: 'custom-plan', title: 'Self-Made', description: 'Create and complete a custom training plan', icon: '🛠️', xp: 800, category: 'plan', rarity: 'rare', requirement: { type: 'customPlanComplete', value: true } },

  // ── BODY & PERFORMANCE ──────────────────────────────────────────────────────
  { id: 'heart-1m', title: 'Million Beats', description: 'Accumulate 1,000,000 heartbeats during runs', icon: '❤️', xp: 1000, category: 'fun', rarity: 'epic', requirement: { type: 'heartbeats', value: 1000000 } },
  { id: 'steps-100k', title: '100K Steps', description: 'Take 100,000 running steps', icon: '👣', xp: 300, category: 'fun', rarity: 'uncommon', requirement: { type: 'totalSteps', value: 100000 } },
  { id: 'steps-1m', title: 'Million Steps', description: 'Take 1,000,000 running steps', icon: '🦶', xp: 2000, category: 'fun', rarity: 'epic', requirement: { type: 'totalSteps', value: 1000000 } },
  { id: 'cadence-180', title: 'Cadence Queen', description: 'Maintain 180 spm cadence for an entire run', icon: '🎵', xp: 600, category: 'fun', rarity: 'rare', requirement: { type: 'cadence', value: 180 } },
  { id: 'improve-distance', title: 'Going Further', description: 'Beat your longest run distance', icon: '📏', xp: 300, category: 'distance', rarity: 'uncommon', requirement: { type: 'distanceImprovement', value: true } },

  // ── SECRET BADGES ───────────────────────────────────────────────────────────
  { id: 'secret-pi', title: '???', description: 'Run exactly 3.14km', icon: '🔮', xp: 314, category: 'secret', rarity: 'epic', requirement: { type: 'piRun', value: 3.14 }, hint: 'Run a very mathematical distance...' },
  { id: 'secret-42', title: '???', description: 'Run for exactly 42 minutes', icon: '🌌', xp: 420, category: 'secret', rarity: 'epic', requirement: { type: 'exactDuration', value: 42 }, hint: 'The answer to everything' },
  { id: 'secret-lucky-7', title: '???', description: 'Complete 7 runs of exactly 7km', icon: '🎰', xp: 777, category: 'secret', rarity: 'legendary', requirement: { type: 'lucky7', value: true }, hint: 'Seven is your magic number' },
  { id: 'secret-mirror', title: '???', description: 'Start a run at exactly 11:11', icon: '🪞', xp: 111, category: 'secret', rarity: 'rare', requirement: { type: 'mirrorTime', value: true }, hint: 'Make a wish...' },
  { id: 'secret-palindrome-pace', title: '???', description: 'Run at a palindrome pace (5:05, 6:06, 7:07...)', icon: '🔄', xp: 505, category: 'secret', rarity: 'epic', requirement: { type: 'palindromePace', value: true }, hint: 'Your pace reads the same forwards and backwards' },
  { id: 'secret-full-moon', title: '???', description: 'Run under a full moon', icon: '🌕', xp: 400, category: 'secret', rarity: 'epic', requirement: { type: 'fullMoon', value: true }, hint: 'The moon calls to you' },
  { id: 'secret-double', title: '???', description: 'Double your longest run distance in one go', icon: '✖️', xp: 1000, category: 'secret', rarity: 'legendary', requirement: { type: 'doubleDistance', value: true }, hint: 'Go twice as far as you ever have' },
  { id: 'secret-round', title: '???', description: 'Run exactly 5, 10, 15, or 20km to the decimal', icon: '🎱', xp: 200, category: 'secret', rarity: 'rare', requirement: { type: 'roundDistance', value: true }, hint: 'Perfectionists only' },
  { id: 'secret-night-5k', title: '???', description: 'Run a 5K after 10pm', icon: '🦇', xp: 250, category: 'secret', rarity: 'rare', requirement: { type: 'nightDistance', value: true }, hint: 'The city sleeps, but you run' },
  { id: 'secret-comeback-pb', title: '???', description: 'Beat your PB after a 2-week rest', icon: '🦋', xp: 750, category: 'secret', rarity: 'epic', requirement: { type: 'comebackPB', value: true }, hint: 'Sometimes rest makes you faster' },
  { id: 'secret-first-run-fastest', title: '???', description: 'Make your first run of the month your fastest', icon: '🎯', xp: 300, category: 'secret', rarity: 'rare', requirement: { type: 'monthFastStart', value: true }, hint: 'Start strong' },
  { id: 'secret-golden-hour', title: '???', description: 'Run during the golden hour (1hr before sunset)', icon: '🌇', xp: 350, category: 'secret', rarity: 'rare', requirement: { type: 'goldenHour', value: true }, hint: 'The most beautiful light of the day' },
  { id: 'secret-13th', title: '???', description: 'Run on the 13th of the month', icon: '🃏', xp: 130, category: 'secret', rarity: 'rare', requirement: { type: 'dayOfMonth', value: 13 }, hint: 'Lucky 13?' },
  { id: 'secret-friday13', title: '???', description: 'Run on a Friday the 13th', icon: '😈', xp: 666, category: 'secret', rarity: 'legendary', requirement: { type: 'friday13', value: true }, hint: 'The scariest run of all' },
  { id: 'secret-lunar-new-year', title: '???', description: 'Run on Lunar New Year', icon: '🧧', xp: 500, category: 'secret', rarity: 'epic', requirement: { type: 'lunarNewYear', value: true }, hint: 'Spring Festival vibes' },
  { id: 'secret-same-route-10', title: '???', description: 'Run the exact same route 10 times', icon: '🔁', xp: 400, category: 'secret', rarity: 'epic', requirement: { type: 'repeatRoute', value: 10 }, hint: 'Creature of habit (compliment)' },
  { id: 'secret-emoji-distance', title: '???', description: 'Run 6.9km', icon: '😏', xp: 69, category: 'secret', rarity: 'epic', requirement: { type: 'specificDistance', value: 6.9 }, hint: 'Nice.' },
  { id: 'secret-10-in-10', title: '???', description: 'Run 10km in under 10 different sessions in one week', icon: '⚡', xp: 1000, category: 'secret', rarity: 'legendary', requirement: { type: 'weeklyVolume', value: true }, hint: 'Your week is STACKED' },
  { id: 'secret-sweat-emoji', title: '???', description: 'Run on the hottest day of the year', icon: '🥵', xp: 500, category: 'secret', rarity: 'epic', requirement: { type: 'hottestDay', value: true }, hint: 'Peak summer dedication' },
  { id: 'secret-new-shoes', title: '???', description: 'Run with a new personal record on the same day as a new PB', icon: '👟', xp: 300, category: 'secret', rarity: 'rare', requirement: { type: 'doublePB', value: true }, hint: 'Double the glory' },
];

export const RARITY_CONFIG = {
  common: { bg: '#F0FDF4', border: '#86EFAC', text: '#15803D', label: 'Common', stars: 1 },
  uncommon: { bg: '#EFF6FF', border: '#93C5FD', text: '#1D4ED8', label: 'Uncommon', stars: 2 },
  rare: { bg: '#F5F3FF', border: '#C4B5FD', text: '#6D28D9', label: 'Rare', stars: 3 },
  epic: { bg: '#FFF7ED', border: '#FDC36A', text: '#C2410C', label: 'Epic ✦', stars: 4 },
  legendary: { bg: '#FDF2F8', border: '#F0ABFC', text: '#86198F', label: '✨ Legendary', stars: 5 },
};

export function getXPLevel(xp) {
  const thresholds = [0, 500, 1200, 2500, 5000, 10000, 20000, 50000, 100000];
  const titles = ['Newcomer', 'Jogger', 'Runner', 'Athlete', 'Champion', 'Elite', 'Legend', 'GOD', 'Transcendent'];
  const emojis = ['🌱', '🐇', '🏃‍♀️', '⚡', '🏆', '💎', '🌠', '🔱', '✨'];
  let level = 0;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i;
  }
  const nextThreshold = thresholds[level + 1] || thresholds[thresholds.length - 1];
  const progress = level < thresholds.length - 1
    ? (xp - thresholds[level]) / (nextThreshold - thresholds[level])
    : 1;
  return {
    level: level + 1,
    title: titles[level],
    emoji: emojis[level],
    progress,
    currentXP: xp,
    nextXP: nextThreshold,
    xpToNext: Math.max(0, nextThreshold - xp),
  };
}

// ── CHALLENGE BADGES (monthly, seasonal, holiday, milestone) ─────────────────
// These are injected from challenges.js at runtime via getAllChallengeBadges()
// Listed here for reference and static lookup:
export const CHALLENGE_BADGES = [
  // Monthly
  { id: 'challenge-jan', title: 'January Opener', description: 'Completed the January Reset challenge', icon: '🎆', xp: 600, category: 'challenge', rarity: 'rare' },
  { id: 'challenge-feb', title: 'Heart Runner', description: 'Completed the February Heart Month challenge', icon: '💝', xp: 700, category: 'challenge', rarity: 'rare' },
  { id: 'challenge-mar', title: 'She Runs the World', description: "Completed the March Women's Month challenge", icon: '🌷', xp: 750, category: 'challenge', rarity: 'epic' },
  { id: 'challenge-apr', title: 'Earth Runner', description: 'Completed the April Earth Month challenge', icon: '🌍', xp: 700, category: 'challenge', rarity: 'rare' },
  { id: 'challenge-may', title: 'Mind Over Miles', description: 'Completed the May Mental Health Month challenge', icon: '🧠', xp: 650, category: 'challenge', rarity: 'rare' },
  { id: 'challenge-jun', title: 'Run in Full Colour', description: 'Completed the June Pride Month challenge', icon: '🌈', xp: 800, category: 'challenge', rarity: 'epic' },
  { id: 'challenge-jul', title: 'Heat Wave Hustler', description: 'Completed the July Peak Summer challenge', icon: '🔥', xp: 750, category: 'challenge', rarity: 'epic' },
  { id: 'challenge-aug', title: 'Last of Summer', description: 'Completed the August Final Summer Push challenge', icon: '🌻', xp: 900, category: 'challenge', rarity: 'epic' },
  { id: 'challenge-sep', title: 'Harvest Runner', description: 'Completed the September Autumn Harvest challenge', icon: '🍂', xp: 800, category: 'challenge', rarity: 'epic' },
  { id: 'challenge-oct', title: 'Spooky Sprinter', description: 'Completed the October Halloween challenge', icon: '🎃', xp: 800, category: 'challenge', rarity: 'epic' },
  { id: 'challenge-nov', title: 'Grateful Strider', description: 'Completed the November Gratitude Month challenge', icon: '🙏', xp: 700, category: 'challenge', rarity: 'rare' },
  { id: 'challenge-dec', title: 'Winter Warrior', description: 'Completed the December Winter Warrior challenge', icon: '⛄', xp: 1000, category: 'challenge', rarity: 'legendary' },
  // Seasonal
  { id: 'challenge-winter', title: 'Winter Solstice Warrior', description: 'Conquered the Winter Solstice Series', icon: '🌨️', xp: 3000, category: 'challenge', rarity: 'legendary' },
  { id: 'challenge-spring', title: 'Spring Bloom Champion', description: 'Completed the Spring Bloom Series', icon: '🌸', xp: 2500, category: 'challenge', rarity: 'legendary' },
  { id: 'challenge-summer', title: 'Summer Solstice Goddess', description: 'Completed the Summer Solstice Series', icon: '☀️', xp: 4000, category: 'challenge', rarity: 'legendary' },
  { id: 'challenge-autumn', title: 'Autumn Harvest Queen', description: 'Completed the Autumn Harvest Series', icon: '🍁', xp: 3500, category: 'challenge', rarity: 'legendary' },
  // Holiday
  { id: 'holiday-new-year', title: "New Year's First Step", description: 'Ran on January 1st', icon: '🎆', xp: 500, category: 'challenge', rarity: 'epic' },
  { id: 'holiday-valentines', title: 'Running Romantic', description: "Ran on Valentine's Day 💕", icon: '💘', xp: 400, category: 'challenge', rarity: 'rare' },
  { id: 'holiday-stpatricks', title: 'Lucky Legs', description: "Ran on St. Patrick's Day", icon: '🍀', xp: 317, category: 'challenge', rarity: 'uncommon' },
  { id: 'holiday-earthday', title: 'Earth Day Mover', description: 'Ran on Earth Day', icon: '🌍', xp: 350, category: 'challenge', rarity: 'rare' },
  { id: 'holiday-mothersday', title: "Mama's Run", description: "Ran on Mother's Day", icon: '💐', xp: 400, category: 'challenge', rarity: 'rare' },
  { id: 'holiday-solstice', title: 'Solstice Runner', description: 'Ran on the Summer Solstice', icon: '🌞', xp: 621, category: 'challenge', rarity: 'epic' },
  { id: 'holiday-freedom', title: 'Freedom Runner', description: 'Ran on Independence Weekend', icon: '🗽', xp: 400, category: 'challenge', rarity: 'uncommon' },
  { id: 'holiday-world-running', title: 'World Runner', description: 'Ran on World Running Day', icon: '🌏', xp: 300, category: 'challenge', rarity: 'rare' },
  { id: 'holiday-halloween', title: 'Halloween Haunter', description: 'Ran on Halloween 🎃', icon: '🎃', xp: 666, category: 'challenge', rarity: 'epic' },
  { id: 'holiday-turkey-trot', title: 'Turkey Trotter', description: 'Ran the Turkey Trot', icon: '🦃', xp: 500, category: 'challenge', rarity: 'rare' },
  { id: 'holiday-christmas', title: 'Santa Dasher', description: 'Ran on Christmas Day', icon: '🎅', xp: 750, category: 'challenge', rarity: 'legendary' },
  { id: 'holiday-nye', title: 'Year Closer', description: "Ran on New Year's Eve", icon: '🥂', xp: 800, category: 'challenge', rarity: 'legendary' },
  // Milestone challenges
  { id: 'challenge-full-year', title: 'Full Year Runner', description: 'Ran in every single month of the year', icon: '🗓️', xp: 5000, category: 'challenge', rarity: 'legendary' },
  { id: 'challenge-four-seasons', title: 'Four Seasons Champion', description: 'Completed all 4 seasonal running challenges', icon: '🌍', xp: 8000, category: 'challenge', rarity: 'legendary' },
];

export const ALL_BADGES = [...BADGES, ...CHALLENGE_BADGES];

export const getBadgesByCategory = (cat) => {
  const all = ALL_BADGES;
  if (cat === 'all') return all;
  return all.filter(b => b.category === cat);
};
