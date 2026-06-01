import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ── Permission ─────────────────────────────────────────────────────────────────
export async function requestNotificationPermissions() {
  if (!Device.isDevice) return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

// ── Immediate notifications ────────────────────────────────────────────────────
export async function sendImmediateNotification(title, body, data = {}) {
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data, sound: true },
    trigger: null,
  });
}

// ── Badge earned ───────────────────────────────────────────────────────────────
export async function notifyBadgeEarned(badge) {
  await sendImmediateNotification(
    `🏅 New Badge: ${badge.title}`,
    `${badge.description} +${badge.xp} XP earned!`,
    { type: 'badge', badgeId: badge.id }
  );
}

// ── Run reminders — scheduled ──────────────────────────────────────────────────
export async function scheduleRunReminder(hour = 7, minute = 30) {
  await Notifications.cancelAllScheduledNotificationsAsync();

  const messages = [
    { title: '🌅 Morning, superstar!', body: "Your legs are ready. Are you? Today's run won't run itself! 👟" },
    { title: '💪 Time to lace up!', body: "Every run you've ever done started with just putting on your shoes. Do that." },
    { title: '🔥 Your streak is waiting!', body: "Don't break the chain. One run, one day, one step at a time." },
    { title: '✨ You always feel better after a run', body: "Future you is cheering. Go make her proud! 🌸" },
    { title: '🏃‍♀️ Your body is asking for it', body: "That restless feeling? That's your body saying GO. Listen to it." },
    { title: '💜 Self-care = running', body: "Lacing up today is the kindest thing you can do for yourself." },
  ];

  for (let i = 0; i < 7; i++) {
    const msg = messages[i % messages.length];
    await Notifications.scheduleNotificationAsync({
      content: { title: msg.title, body: msg.body, sound: true },
      trigger: { weekday: (i % 7) + 1, hour, minute, repeats: true },
    });
  }
}

// ── Post-run celebration ───────────────────────────────────────────────────────
export async function schedulePostRunCelebration(runData) {
  const { distance, duration } = runData;
  const distStr = distance.toFixed(1);
  const mins = Math.round(duration / 60);

  const celebrations = [
    { title: '🎉 Run DONE!', body: `${distStr}km in ${mins} minutes. You absolute legend! 👑` },
    { title: '💅 Crushed it!', body: `${distStr}km logged. That was ALL you. So proud. 🌸` },
    { title: '🔥 That just happened!', body: `${distStr}km! Your future self will thank your present self.` },
    { title: '⭐ Yesss!!', body: `${mins} minutes of pure dedication. That's your magic. 🌟` },
  ];

  const msg = celebrations[Math.floor(Math.random() * celebrations.length)];
  await sendImmediateNotification(msg.title, msg.body, { type: 'postRun' });
}

// ── Motivational nudges — 3x per week max ─────────────────────────────────────
export async function scheduleMotivationalNudges() {
  const nudges = [
    { title: '💜 Just checking in...', body: "How are your legs feeling? Ready for a run this week? 🏃‍♀️", day: 2 },
    { title: '🌟 Mid-week reminder', body: "Wednesday is the PERFECT day to run. Just saying. 🌈", day: 4 },
    { title: '✨ Weekend warrior calling!', body: "Saturday long run day! Your best runs happen at the weekend 💪", day: 7 },
  ];

  for (const nudge of nudges) {
    await Notifications.scheduleNotificationAsync({
      content: { title: nudge.title, body: nudge.body, sound: true },
      trigger: { weekday: nudge.day, hour: 9, minute: 0, repeats: true },
    });
  }
}

// ── Streak at-risk warning ─────────────────────────────────────────────────────
export async function scheduleStreakWarning(streakDays) {
  if (streakDays < 2) return;
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `🔥 Don't lose your ${streakDays}-day streak!`,
      body: "You're on fire! One quick run today keeps it alive. 5 minutes counts. 👟",
      sound: true,
    },
    trigger: { seconds: 60 * 60 * 20 },
  });
}

// ── Plan workout reminder ──────────────────────────────────────────────────────
export async function schedulePlanWorkoutReminder(plan, workoutDescription) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `📋 ${plan.title} — Today's Workout`,
      body: workoutDescription,
      sound: true,
    },
    trigger: { hour: 7, minute: 0, repeats: false },
  });
}

// ── Weekly summary (Sunday evening) ───────────────────────────────────────────
export async function scheduleWeeklySummary(weeklyDistance, weeklyRuns) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📊 Your Week in Review',
      body: `${weeklyRuns} run${weeklyRuns !== 1 ? 's' : ''}, ${weeklyDistance.toFixed(1)}km total. ${weeklyRuns >= 3 ? 'Amazing week! 🌟' : 'Good start — next week, even better! 💪'}`,
      sound: true,
    },
    trigger: { weekday: 1, hour: 19, minute: 0, repeats: true },
  });
}

// ── Cancel all ────────────────────────────────────────────────────────────────
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
