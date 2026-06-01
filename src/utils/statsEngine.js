// Stats computation + smart interpretation engine
// All functions are pure — pass in runs array and get back insights.

const SEC_PER_MIN = 60;
const METERS_PER_KM = 1000;

// ─── Core aggregators ─────────────────────────────────────────────────────────

export function computeAllStats(runs = []) {
  if (!runs.length) return null;

  const sorted = [...runs].sort((a, b) => new Date(a.date) - new Date(b.date));
  const now = new Date();

  // Time buckets
  const last7Days = runs.filter(r => daysSince(r.date) <= 7);
  const last30Days = runs.filter(r => daysSince(r.date) <= 30);
  const last90Days = runs.filter(r => daysSince(r.date) <= 90);
  const thisWeek = getRunsThisWeek(runs);
  const thisMonth = getRunsThisMonth(runs);
  const lastMonth = getRunsLastMonth(runs);

  // Pace trend (last 8 runs)
  const recentRuns = sorted.slice(-8);
  const paceTrend = recentRuns.map(r => ({ date: r.date, pace: r.avgPace, dist: r.distanceKm }));

  // Weekly distance for last 8 weeks
  const weeklyHistory = getWeeklyHistory(runs, 8);

  // Zone distribution (all-time weighted)
  const zoneDistribution = computeZoneDistribution(runs);

  // Best performances
  const bestPace = Math.min(...runs.map(r => r.avgPace));
  const longestRun = Math.max(...runs.map(r => r.distanceKm));
  const longestDuration = Math.max(...runs.map(r => r.durationSec));

  // Pace trajectory — compare first quarter vs last quarter
  const q1 = sorted.slice(0, Math.ceil(sorted.length / 4));
  const q4 = sorted.slice(-Math.ceil(sorted.length / 4));
  const avgPaceQ1 = avg(q1.map(r => r.avgPace));
  const avgPaceQ4 = avg(q4.map(r => r.avgPace));
  const paceImprovement = avgPaceQ1 - avgPaceQ4; // positive = faster

  // HR trend
  const avgHRLast30 = avg(last30Days.map(r => r.avgHR));
  const avgHRPrev30 = avg(runs.filter(r => daysSince(r.date) > 30 && daysSince(r.date) <= 60).map(r => r.avgHR));
  const hrTrend = avgHRPrev30 ? avgHRPrev30 - avgHRLast30 : 0; // positive = HR going down (good)

  // Consistency score (0–100)
  const consistency = computeConsistencyScore(runs);

  // Training load (weighted recent distance)
  const acuteLoad = totalDistance(last7Days) * 1.0;
  const chronicLoad = totalDistance(last30Days) / 4.0;
  const atl = acuteLoad;
  const ctl = chronicLoad;
  const tsb = ctl - atl; // training stress balance: negative = fatigued, positive = fresh

  return {
    // Volume
    totalRuns: runs.length,
    totalDistanceKm: totalDistance(runs),
    totalDurationMin: Math.round(totalDuration(runs) / SEC_PER_MIN),
    totalCalories: runs.reduce((s, r) => s + (r.calories || 0), 0),

    // Recent
    last7: { runs: last7Days.length, distanceKm: totalDistance(last7Days), durationMin: Math.round(totalDuration(last7Days) / SEC_PER_MIN) },
    last30: { runs: last30Days.length, distanceKm: totalDistance(last30Days), durationMin: Math.round(totalDuration(last30Days) / SEC_PER_MIN) },
    last90: { runs: last90Days.length, distanceKm: totalDistance(last90Days) },
    thisWeek: { runs: thisWeek.length, distanceKm: totalDistance(thisWeek) },
    thisMonth: { runs: thisMonth.length, distanceKm: totalDistance(thisMonth) },
    lastMonth: { runs: lastMonth.length, distanceKm: totalDistance(lastMonth) },
    monthOverMonth: totalDistance(thisMonth) - totalDistance(lastMonth),

    // Performance
    bestPace,
    longestRun,
    longestDuration,
    avgPace: avg(runs.map(r => r.avgPace)),
    avgHR: avg(runs.map(r => r.avgHR)),
    avgHRLast30,
    avgDistance: avg(runs.map(r => r.distanceKm)),

    // Trends
    paceImprovement,
    paceImprovementPct: avgPaceQ1 > 0 ? (paceImprovement / avgPaceQ1) * 100 : 0,
    hrTrend,
    paceTrend,
    weeklyHistory,

    // Zones
    zoneDistribution,

    // Training load
    atl: Math.round(atl * 10) / 10,
    ctl: Math.round(ctl * 10) / 10,
    tsb: Math.round(tsb * 10) / 10,

    // Streaks
    currentStreak: computeCurrentStreak(runs),
    longestStreak: computeLongestStreak(runs),
    consistency,

    // Aerobic efficiency (pace per unit HR — lower is better over time)
    aerobicEfficiency: computeAerobicEfficiency(runs),
    aerobicTrend: computeAerobicTrend(runs),
  };
}

// ─── Interpretation engine ────────────────────────────────────────────────────

export function generateInsights(stats) {
  if (!stats) return [];
  const insights = [];

  // ── Aerobic fitness trend
  if (stats.aerobicTrend && stats.aerobicTrend.delta < -0.02) {
    insights.push({
      id: 'aerobic-improving',
      type: 'positive',
      icon: '💚',
      title: 'Your aerobic engine is getting stronger',
      body: `Your aerobic efficiency has improved ${Math.abs(stats.aerobicTrend.delta * 100).toFixed(1)}% over your last ${stats.aerobicTrend.weeks} weeks. You're running the same paces at a lower heart rate — the definition of true fitness. Keep up the Zone 2 work.`,
      priority: 1,
    });
  } else if (stats.aerobicTrend && stats.aerobicTrend.delta > 0.05) {
    insights.push({
      id: 'aerobic-declining',
      type: 'warning',
      icon: '⚠️',
      title: 'Your aerobic efficiency is dipping',
      body: `Your heart rate for the same pace has risen slightly recently. This usually means you need more easy running, more sleep, or a recovery week. Consider a Zone 2 plan to rebuild your aerobic base.`,
      priority: 2,
    });
  }

  // ── Pace improvement
  if (stats.paceImprovement > 15) {
    insights.push({
      id: 'pace-improving',
      type: 'positive',
      icon: '⚡',
      title: `You're ${formatPaceDiff(stats.paceImprovement)} faster per km than when you started`,
      body: `Comparing your first quarter of runs to your most recent, you've shaved ${formatPaceDiff(stats.paceImprovement)} off your average pace. That's not luck — that's consistent work compounding.`,
      priority: 1,
    });
  }

  // ── HR trend
  if (stats.hrTrend > 2) {
    insights.push({
      id: 'hr-dropping',
      type: 'positive',
      icon: '❤️',
      title: 'Your heart is getting more efficient',
      body: `Your average running HR has dropped ${stats.hrTrend.toFixed(0)} BPM over the last month compared to the month before. A lower HR for the same effort is a direct measure of cardiovascular adaptation. Your heart is literally getting stronger.`,
      priority: 1,
    });
  } else if (stats.hrTrend < -3) {
    insights.push({
      id: 'hr-rising',
      type: 'warning',
      icon: '💓',
      title: 'Your HR is running higher than usual',
      body: `Your average HR this month is ${Math.abs(stats.hrTrend).toFixed(0)} BPM higher than last month. This can signal accumulated fatigue, dehydration, or illness. A recovery run or rest day might be exactly what you need right now.`,
      priority: 2,
    });
  }

  // ── Training load / freshness
  if (stats.tsb < -15) {
    insights.push({
      id: 'fatigued',
      type: 'warning',
      icon: '🛌',
      title: 'Your body is carrying fatigue right now',
      body: `Your acute training load (last 7 days: ${stats.atl.toFixed(1)}km) is significantly higher than your chronic baseline (${stats.ctl.toFixed(1)}km/week). You're building fitness, but your body needs adequate recovery. Prioritise sleep and consider an easy day.`,
      priority: 2,
    });
  } else if (stats.tsb > 10 && stats.last7.runs > 0) {
    insights.push({
      id: 'fresh',
      type: 'positive',
      icon: '🚀',
      title: "You're well-rested and race-ready",
      body: `Your training stress balance is positive — you've built a solid fitness base and your body is fresh. If you have a race or time trial coming up, this is your window. Go set a PB.`,
      priority: 1,
    });
  }

  // ── Consistency
  if (stats.consistency >= 80) {
    insights.push({
      id: 'consistent',
      type: 'positive',
      icon: '🏅',
      title: 'Your consistency is elite-level',
      body: `A consistency score of ${stats.consistency}/100 means you're showing up regularly and building the habit that separates runners who improve from those who plateau. Consistency beats intensity every time.`,
      priority: 1,
    });
  } else if (stats.consistency < 40 && stats.totalRuns > 5) {
    insights.push({
      id: 'inconsistent',
      type: 'tip',
      icon: '📅',
      title: 'Consistency is your biggest opportunity',
      body: `More frequent, shorter runs beat occasional long ones for fitness. Try scheduling 3 specific days per week and treating them like unmovable appointments. Even 20 minutes counts.`,
      priority: 3,
    });
  }

  // ── Zone 2 analysis
  const z2pct = stats.zoneDistribution?.[2] || 0;
  if (z2pct < 50 && stats.totalRuns >= 5) {
    insights.push({
      id: 'too-hard',
      type: 'tip',
      icon: '💚',
      title: 'You might be running too hard too often',
      body: `Only ${z2pct.toFixed(0)}% of your running time is in Zone 2 (aerobic fat-burning zone). Most running science recommends 70–80% easy running. Going slower on your easy days will actually make your hard days harder — and your overall fitness dramatically better.`,
      priority: 2,
    });
  } else if (z2pct >= 65) {
    insights.push({
      id: 'zone2-great',
      type: 'positive',
      icon: '💚',
      title: 'Your Zone 2 discipline is paying off',
      body: `${z2pct.toFixed(0)}% of your running time in Zone 2 is textbook aerobic base building. Elite endurance athletes train this way. Your mitochondria are multiplying, your fat metabolism is improving, and your recovery capacity is growing.`,
      priority: 1,
    });
  }

  // ── Volume trend
  if (stats.monthOverMonth > 5) {
    insights.push({
      id: 'volume-up',
      type: 'positive',
      icon: '📈',
      title: `You ran ${stats.monthOverMonth.toFixed(1)}km more this month than last`,
      body: `Progressive overload in practice. As long as you're not increasing volume more than ~10% per week, this is exactly how fitness is built — stacking slightly more each month, compounding over time.`,
      priority: 2,
    });
  } else if (stats.monthOverMonth < -8) {
    insights.push({
      id: 'volume-down',
      type: 'tip',
      icon: '📉',
      title: 'Running volume dropped compared to last month',
      body: `You ran ${Math.abs(stats.monthOverMonth).toFixed(1)}km less this month than last. Life happens — but if this wasn't intentional (planned recovery or taper), now's a good time to get back on track. Even one run this week changes the momentum.`,
      priority: 3,
    });
  }

  // ── Long run capability
  if (stats.longestRun >= 15) {
    insights.push({
      id: 'long-run-capable',
      type: 'positive',
      icon: '🏅',
      title: 'Your long-run base is half-marathon ready',
      body: `Your longest recorded run of ${stats.longestRun.toFixed(1)}km shows you already have the endurance foundation for a half marathon. With 6–8 weeks of structured training, race day would be very achievable.`,
      priority: 3,
    });
  }

  // ── Streak motivation
  if (stats.currentStreak >= 7) {
    insights.push({
      id: 'streak-strong',
      type: 'positive',
      icon: '🔥',
      title: `${stats.currentStreak}-day streak — you've built a real habit`,
      body: `Research shows habits form after 21 days of consistent behaviour. At ${stats.currentStreak} days, you're well on your way. Protect this streak — it's not just fitness, it's identity.`,
      priority: 1,
    });
  }

  // ── Total distance milestone
  if (stats.totalDistanceKm >= 100) {
    const earthPct = ((stats.totalDistanceKm / 40075) * 100).toFixed(2);
    insights.push({
      id: 'total-distance',
      type: 'positive',
      icon: '🌍',
      title: `${stats.totalDistanceKm.toFixed(0)}km total — you've covered serious ground`,
      body: `That's ${earthPct}% of the Earth's circumference on foot. You've burned approximately ${stats.totalCalories.toLocaleString()} calories across ${stats.totalRuns} runs. Every kilometre was a choice.`,
      priority: 2,
    });
  }

  // ── Best pace insight
  if (stats.bestPace < 360) {
    insights.push({
      id: 'fast-capable',
      type: 'positive',
      icon: '⚡',
      title: `Your best pace of ${formatPace(stats.bestPace)}/km is genuinely quick`,
      body: `A sub-6:00/km effort means your legs are capable of real speed. The question is whether your aerobic base can sustain it for longer distances. Zone 2 running builds that bridge.`,
      priority: 3,
    });
  }

  // Sort by priority and return top 6
  return insights.sort((a, b) => a.priority - b.priority).slice(0, 6);
}

export function generateWeeklyReport(stats) {
  if (!stats) return null;
  const { last7, avgHRLast30, zoneDistribution, currentStreak } = stats;
  const z2 = zoneDistribution?.[2] || 0;

  return {
    headline: last7.runs >= 3 ? '💪 Solid week!' : last7.runs >= 1 ? '✅ You showed up' : '😴 Rest week',
    summary: `${last7.runs} run${last7.runs !== 1 ? 's' : ''} · ${last7.distanceKm.toFixed(1)}km · ${last7.durationMin} min`,
    verdict: last7.runs >= 4
      ? "Excellent training week. You're building real fitness momentum."
      : last7.runs >= 2
      ? "Good consistency. One more run next week would push you to another level."
      : "Life happened — and that's okay. Even one run keeps the chain alive.",
    zoneNote: z2 >= 60 ? `${z2.toFixed(0)}% of your running was in Zone 2 — perfect aerobic work.` : `Try to keep more runs in Zone 2 for faster long-term gains.`,
    streakNote: currentStreak > 0 ? `🔥 ${currentStreak}-day streak active — protect it!` : null,
  };
}

// ─── Chart data helpers ────────────────────────────────────────────────────────

export function getPaceChartData(runs, limit = 10) {
  const recent = [...runs].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-limit);
  return recent.map(r => ({
    label: formatDateShort(r.date),
    value: r.avgPace,
    formatted: formatPace(r.avgPace),
    dist: r.distanceKm,
  }));
}

export function getDistanceChartData(runs, limit = 10) {
  const recent = [...runs].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-limit);
  return recent.map(r => ({
    label: formatDateShort(r.date),
    value: r.distanceKm,
    formatted: `${r.distanceKm.toFixed(1)}km`,
  }));
}

export function getHRChartData(runs, limit = 10) {
  const recent = [...runs].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(-limit);
  return recent.map(r => ({
    label: formatDateShort(r.date),
    value: r.avgHR,
    formatted: `${r.avgHR} bpm`,
  }));
}

export function getWeeklyVolumeData(runs, weeks = 8) {
  return getWeeklyHistory(runs, weeks);
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function daysSince(dateStr) {
  return (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
}

function totalDistance(runs) {
  return Math.round(runs.reduce((s, r) => s + r.distanceKm, 0) * 10) / 10;
}

function totalDuration(runs) {
  return runs.reduce((s, r) => s + r.durationSec, 0);
}

function avg(arr) {
  if (!arr.length) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

function getRunsThisWeek(runs) {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  return runs.filter(r => new Date(r.date) >= monday);
}

function getRunsThisMonth(runs) {
  const now = new Date();
  return runs.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
}

function getRunsLastMonth(runs) {
  const now = new Date();
  const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  return runs.filter(r => {
    const d = new Date(r.date);
    return d.getMonth() === lastMonth && d.getFullYear() === year;
  });
}

function getWeeklyHistory(runs, numWeeks) {
  const result = [];
  const now = new Date();
  for (let w = numWeeks - 1; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7) - w * 7);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);
    const weekRuns = runs.filter(r => {
      const d = new Date(r.date);
      return d >= weekStart && d < weekEnd;
    });
    const weekLabel = `W${numWeeks - w}`;
    result.push({
      label: weekLabel,
      distanceKm: totalDistance(weekRuns),
      runs: weekRuns.length,
      weekStart: weekStart.toISOString(),
    });
  }
  return result;
}

function computeZoneDistribution(runs) {
  const totals = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalPct = 0;
  runs.forEach(r => {
    if (r.zones) {
      Object.keys(r.zones).forEach(z => {
        totals[z] = (totals[z] || 0) + r.zones[z];
        totalPct += r.zones[z];
      });
    }
  });
  if (!totalPct) return totals;
  const result = {};
  Object.keys(totals).forEach(z => { result[z] = (totals[z] / totalPct) * 100; });
  return result;
}

function computeCurrentStreak(runs) {
  const days = new Set(runs.map(r => new Date(r.date).toDateString()));
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (days.has(d.toDateString())) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function computeLongestStreak(runs) {
  if (!runs.length) return 0;
  const days = [...new Set(runs.map(r => new Date(r.date).toDateString()))]
    .map(d => new Date(d).getTime())
    .sort((a, b) => a - b);
  let max = 1, cur = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = (days[i] - days[i - 1]) / (1000 * 60 * 60 * 24);
    if (diff === 1) { cur++; max = Math.max(max, cur); }
    else cur = 1;
  }
  return max;
}

function computeConsistencyScore(runs) {
  if (!runs.length) return 0;
  const weeks = getWeeklyHistory(runs, 8);
  const activeWeeks = weeks.filter(w => w.runs > 0).length;
  const avgRunsPerActiveWeek = activeWeeks > 0 ? avg(weeks.filter(w => w.runs > 0).map(w => w.runs)) : 0;
  const frequencyScore = (activeWeeks / 8) * 60;
  const qualityScore = Math.min(40, (avgRunsPerActiveWeek / 4) * 40);
  return Math.round(Math.min(100, frequencyScore + qualityScore));
}

function computeAerobicEfficiency(runs) {
  // Pace (sec/km) / HR — lower = more efficient
  return runs.map(r => ({ date: r.date, efficiency: r.avgHR > 0 ? r.avgPace / r.avgHR : null }));
}

function computeAerobicTrend(runs) {
  if (runs.length < 6) return null;
  const sorted = [...runs].sort((a, b) => new Date(a.date) - new Date(b.date));
  const half = Math.floor(sorted.length / 2);
  const first = sorted.slice(0, half);
  const second = sorted.slice(half);
  const eff1 = avg(first.map(r => r.avgHR > 0 ? r.avgPace / r.avgHR : null).filter(Boolean));
  const eff2 = avg(second.map(r => r.avgHR > 0 ? r.avgPace / r.avgHR : null).filter(Boolean));
  return { delta: eff2 - eff1, weeks: Math.round(runs.length / 2) };
}

// ─── Formatters ───────────────────────────────────────────────────────────────

export function formatPace(secPerKm) {
  if (!secPerKm) return '--:--';
  const min = Math.floor(secPerKm / 60);
  const sec = Math.round(secPerKm % 60);
  return `${min}:${sec.toString().padStart(2, '0')}`;
}

export function formatDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${s.toString().padStart(2, '0')}s`;
}

export function formatPaceDiff(secDiff) {
  const abs = Math.abs(secDiff);
  const min = Math.floor(abs / 60);
  const sec = Math.round(abs % 60);
  if (min > 0) return `${min}m ${sec}s`;
  return `${sec}s`;
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

export const ZONE_LABELS = {
  1: { name: 'Recovery', color: '#90CAF9', emoji: '🫁' },
  2: { name: 'Aerobic', color: '#A5D6A7', emoji: '💚' },
  3: { name: 'Tempo', color: '#FFF176', emoji: '💛' },
  4: { name: 'Threshold', color: '#FFAB76', emoji: '🧡' },
  5: { name: 'Max Effort', color: '#EF9A9A', emoji: '❤️‍🔥' },
};
