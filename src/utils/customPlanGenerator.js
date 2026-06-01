// Custom plan generator — reads user profile + computed stats and builds
// a fully personalised training plan with explicit reasoning for every decision.

import { formatPace } from './statsEngine';

// ─── Main entry point ─────────────────────────────────────────────────────────

export function generateCustomPlan(user, stats) {
  const profile = analyseProfile(user, stats);
  const focus = decideFocus(profile);
  const structure = buildStructure(profile, focus);
  const weeks = buildWeeks(profile, focus, structure);
  const reasoning = buildReasoning(profile, focus, structure);

  return {
    id: 'custom',
    isCustom: true,
    generatedAt: new Date().toISOString(),
    title: `${user.name}'s Plan`,
    subtitle: focus.subtitle,
    description: focus.description,
    longDescription: focus.longDescription,
    icon: focus.icon,
    gradient: focus.gradient,
    difficulty: profile.level,
    durationWeeks: structure.durationWeeks,
    runsPerWeek: structure.runsPerWeek,
    targetZone: focus.primaryZone,
    tags: focus.tags,
    profile,       // the full analysis — shown to user as "why we built this"
    focus,
    structure,
    reasoning,     // array of specific data-backed explanations
    weeks,
  };
}

// ─── Step 1: Analyse the user ─────────────────────────────────────────────────

function analyseProfile(user, stats) {
  const avgWeeklyKm = stats?.last30?.distanceKm ? stats.last30.distanceKm / 4 : 0;
  const avgPace = stats?.avgPace || 0;
  const avgHR = stats?.avgHRLast30 || 0;
  const consistency = stats?.consistency || 0;
  const z2pct = stats?.zoneDistribution?.[2] || 0;
  const z3pct = stats?.zoneDistribution?.[3] || 0;
  const z4pct = stats?.zoneDistribution?.[4] || 0;
  const totalRuns = stats?.totalRuns || 0;
  const currentStreak = stats?.currentStreak || 0;
  const longestRun = stats?.longestRun || 0;
  const paceImprovement = stats?.paceImprovement || 0;
  const hrTrend = stats?.hrTrend || 0;
  const tsb = stats?.tsb || 0;
  const aerobicTrend = stats?.aerobicTrend;

  // Determine fitness level from data (override user's self-report if data says otherwise)
  let dataLevel = user.fitnessLevel || 'beginner';
  if (totalRuns >= 50 && avgWeeklyKm >= 20) dataLevel = 'intermediate';
  if (totalRuns >= 100 && avgWeeklyKm >= 30 && avgPace < 360) dataLevel = 'advanced';
  if (totalRuns < 10 || avgWeeklyKm < 10) dataLevel = 'beginner';

  // Detect problems / opportunities
  const tooHard = z2pct < 45 && totalRuns >= 5;
  const greatZone2 = z2pct >= 65;
  const inconsistent = consistency < 45 && totalRuns >= 5;
  const fatigued = tsb < -12;
  const fresh = tsb > 8;
  const aerobicDeclining = aerobicTrend?.delta > 0.04;
  const aerobicImproving = aerobicTrend?.delta < -0.02;
  const needsSpeed = avgPace > 390 && dataLevel !== 'beginner' && z2pct >= 55;
  const readyForLong = longestRun >= 8 && avgWeeklyKm >= 15;
  const readyForHalf = longestRun >= 14 && avgWeeklyKm >= 25;
  const paceStalled = paceImprovement < 5 && totalRuns >= 15;
  const hrHigh = avgHR > 155 && dataLevel !== 'beginner';
  const volLow = avgWeeklyKm < 15 && totalRuns >= 10;

  // Parse goals
  const goals = user.goals || [];
  const wantsSpeed = goals.some(g => /speed|fast|pace|5k|10k|pb|record/i.test(g));
  const wantsDistance = goals.some(g => /half|marathon|long|distance|far/i.test(g));
  const wantsHealth = goals.some(g => /health|hrv|recov|heart|weight|fit/i.test(g));
  const wantsBeginner = goals.some(g => /start|begin|first|couch|new/i.test(g));
  const wantsZone2 = goals.some(g => /zone|aerob|base|easy/i.test(g));

  return {
    // Metrics
    avgWeeklyKm, avgPace, avgHR, consistency, z2pct, z3pct, z4pct,
    totalRuns, currentStreak, longestRun, paceImprovement, hrTrend,
    tsb, aerobicTrend,
    // Derived level
    level: dataLevel,
    // Flags
    tooHard, greatZone2, inconsistent, fatigued, fresh,
    aerobicDeclining, aerobicImproving, needsSpeed, readyForLong,
    readyForHalf, paceStalled, hrHigh, volLow,
    // Goal signals
    wantsSpeed, wantsDistance, wantsHealth, wantsBeginner, wantsZone2,
    // Raw
    maxHR: user.maxHR || 185,
    name: user.name,
    weeklyGoalKm: user.weeklyGoalKm || 20,
  };
}

// ─── Step 2: Decide the plan's primary focus ──────────────────────────────────

function decideFocus(p) {
  // Priority order: fix problems first, then build toward goals

  // Brand-new runner
  if (p.totalRuns < 6 || p.wantsBeginner) {
    return FOCUSES.absoluteBeginner;
  }

  // Fatigued — force recovery first
  if (p.fatigued && p.totalRuns >= 8) {
    return FOCUSES.recovery;
  }

  // Running too hard — fix zone distribution before anything else
  if (p.tooHard && !p.wantsSpeed && p.totalRuns >= 8) {
    return FOCUSES.zone2Reset;
  }

  // Aerobic engine declining — needs base work
  if (p.aerobicDeclining && p.totalRuns >= 10) {
    return FOCUSES.aerobicRebuild;
  }

  // Goals: distance
  if (p.wantsDistance && p.readyForHalf) {
    return FOCUSES.halfMarathonPrep;
  }
  if (p.wantsDistance && p.readyForLong) {
    return FOCUSES.longRunBuilder;
  }

  // Goals: speed, has base
  if (p.wantsSpeed && p.z2pct >= 50 && p.level !== 'beginner') {
    return FOCUSES.speedDevelopment;
  }

  // Pace stalled — needs stimulus
  if (p.paceStalled && p.consistency >= 50 && p.level !== 'beginner') {
    return FOCUSES.breakPlateau;
  }

  // Low volume but consistent — grow the base
  if (p.volLow && p.consistency >= 50) {
    return FOCUSES.volumeBuilder;
  }

  // Health/HRV goals or high HR
  if (p.wantsHealth || p.hrHigh) {
    return FOCUSES.hrvAndHealth;
  }

  // Inconsistent — build the habit above all else
  if (p.inconsistent) {
    return FOCUSES.habitBuilder;
  }

  // Great zone 2 runner ready for more speed work
  if (p.greatZone2 && p.level === 'intermediate') {
    return FOCUSES.speedDevelopment;
  }

  // Default: solid progressive aerobic plan
  return FOCUSES.progressiveBase;
}

// ─── Step 3: Build structure (weeks, days/week, intensities) ──────────────────

function buildStructure(p, focus) {
  let durationWeeks = focus.defaultWeeks;
  let runsPerWeek = focus.defaultRuns;

  // Adjust weeks
  if (p.consistency < 40) durationWeeks = Math.max(4, durationWeeks - 2);
  if (p.totalRuns > 80) durationWeeks = Math.min(12, durationWeeks + 2);

  // Adjust runs/week
  if (p.avgWeeklyKm < 15 || p.level === 'beginner') runsPerWeek = Math.min(runsPerWeek, 3);
  if (p.level === 'advanced' && p.consistency >= 70) runsPerWeek = Math.min(5, runsPerWeek + 1);
  if (p.fatigued) runsPerWeek = Math.max(2, runsPerWeek - 1);

  // Weekly km targets — start conservative, build 8–10% per week
  const startKm = Math.max(10, p.avgWeeklyKm * 0.85);
  const peakKm = startKm * (1 + (durationWeeks - 2) * 0.08);

  // Long run range
  const startLong = Math.max(4, p.longestRun * 0.75);
  const peakLong = Math.min(focus.maxLongRun || 22, startLong * 1.6);

  return { durationWeeks, runsPerWeek, startKm, peakKm, startLong, peakLong };
}

// ─── Step 4: Build week-by-week workouts ─────────────────────────────────────

function buildWeeks(p, focus, structure) {
  const { durationWeeks, runsPerWeek, startKm, peakKm, startLong, peakLong } = structure;
  const weeks = [];

  for (let i = 0; i < durationWeeks; i++) {
    const weekNum = i + 1;
    const isTaper = i >= durationWeeks - 2 && durationWeeks >= 8;
    const progress = isTaper ? 0.7 : Math.min(1, i / (durationWeeks - 2));
    const weekKm = isTaper ? startKm * 0.75 : startKm + (peakKm - startKm) * progress;
    const longDist = isTaper ? startLong : startLong + (peakLong - startLong) * progress;

    const phaseIndex = Math.floor((i / durationWeeks) * focus.phases.length);
    const phase = focus.phases[Math.min(phaseIndex, focus.phases.length - 1)];

    weeks.push({
      week: weekNum,
      focus: isTaper ? 'Taper & Recover' : phase.name,
      summary: isTaper
        ? 'Reduce volume by 30%. Keep intensity, cut distance. Let the fitness land.'
        : phase.summary(weekNum, p),
      targetKm: Math.round(weekKm * 10) / 10,
      runs: buildDayPlan(i, durationWeeks, runsPerWeek, focus, p, longDist, weekKm, isTaper),
      coachNote: isTaper ? '🧘 Trust your training. Fresh legs run fast.' : phase.coachNote(weekNum, p),
    });
  }

  return weeks;
}

function buildDayPlan(weekIdx, totalWeeks, runsPerWeek, focus, p, longDist, weekKm, isTaper) {
  const DAY_SLOTS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const plans = {
    3: [1, 3, 6],
    4: [1, 2, 4, 6],
    5: [1, 2, 3, 5, 6],
  };
  const slots = plans[runsPerWeek] || plans[3];
  const progress = weekIdx / Math.max(1, totalWeeks - 1);

  return slots.map((dayIdx, i) => {
    const day = DAY_SLOTS[dayIdx];
    const isLong = i === slots.length - 1;
    const isHard = !isLong && i === 1 && runsPerWeek >= 4 && focus.includesHard;
    const isRecovery = i === 0 || isTaper;

    if (isTaper) {
      return { day, type: 'Easy', duration: Math.round(20 + i * 5), zone: 2, description: 'Easy shakeout run — keep it light' };
    }

    if (isLong) {
      const longMin = Math.round(longDist * (p.avgPace || 370) / 60);
      return {
        day, type: focus.longRunType || 'Long Run',
        duration: Math.min(180, Math.max(30, longMin)),
        distance: Math.round(longDist * 10) / 10,
        zone: focus.longZone || 2,
        description: focus.longDesc(weekIdx, longDist, p),
      };
    }

    if (isHard && progress > 0.2) {
      return {
        day, type: focus.hardType || 'Quality Run',
        duration: Math.round(35 + weekIdx * 2),
        zone: focus.hardZone || 4,
        description: focus.hardDesc(weekIdx, p),
      };
    }

    if (isRecovery) {
      return {
        day, type: 'Easy Run',
        duration: Math.round(25 + progress * 15),
        zone: 2,
        description: 'Easy conversational run — aerobic base work',
      };
    }

    // Default: medium easy run
    const medDist = Math.round((weekKm - longDist) / (runsPerWeek - 1) * 10) / 10;
    return {
      day, type: 'Easy Run',
      duration: Math.round(30 + progress * 15),
      distance: Math.max(3, medDist),
      zone: focus.easyZone || 2,
      description: focus.easyDesc(weekIdx, p),
    };
  });
}

// ─── Step 5: Build reasoning (the "why") ─────────────────────────────────────

function buildReasoning(p, focus, structure) {
  const reasons = [];

  reasons.push({
    icon: '🎯',
    title: 'Primary Focus',
    body: focus.reasonMain(p),
  });

  // Pace-based reason
  if (p.avgPace > 0) {
    reasons.push({
      icon: '⚡',
      title: 'Your Current Pace',
      body: `Your average pace is ${formatPace(p.avgPace)}/km. ${
        p.avgPace > 400
          ? 'This plan keeps your easy runs in the 6:30–7:30/km range to build aerobic base before pursuing speed.'
          : p.avgPace > 330
          ? 'You have a solid pace base. This plan uses that foundation and adds structured stimulus.'
          : 'Your pace shows strong fitness — this plan channels it strategically.'
      }`,
    });
  }

  // HR-based reason
  if (p.avgHR > 0) {
    reasons.push({
      icon: '❤️',
      title: 'Heart Rate Signals',
      body: `Your average HR of ${Math.round(p.avgHR)} BPM${
        p.avgHR > 155 ? ' is on the higher side, suggesting your easy runs may be too intense. This plan enforces true Zone 2 effort (HR ${Math.round(p.maxHR * 0.6)}–${Math.round(p.maxHR * 0.75)} BPM) to bring it down over time.'
        : p.hrTrend > 2 ? ` has dropped ${p.hrTrend.toFixed(0)} BPM recently — your cardiovascular system is adapting beautifully. This plan builds on that momentum.`
        : ' sits in a healthy range. The plan maintains this with appropriate intensity distribution.'
      }`,
    });
  }

  // Zone distribution reason
  reasons.push({
    icon: '💚',
    title: 'Zone Balance',
    body: `${p.z2pct.toFixed(0)}% of your running is in Zone 2. ${
      p.tooHard
        ? `The optimal target is 65–75%. This plan mandates the easy runs feel genuinely easy — if you need to slow down to stay in Zone 2, slow down. The payoff is huge.`
        : p.greatZone2
        ? `That's elite-level aerobic discipline. This plan builds on your strong base with targeted quality sessions layered on top.`
        : `This plan nudges that toward 65%+ by making easy days truly easy and hard days genuinely hard.`
    }`,
  });

  // Volume reason
  reasons.push({
    icon: '📏',
    title: 'Volume Prescription',
    body: `Starting at ${structure.startKm.toFixed(0)}km/week and peaking at ${structure.peakKm.toFixed(0)}km/week. ${
      p.avgWeeklyKm > structure.startKm * 1.1
        ? 'Starting slightly below your current volume to build a solid aerobic base before progressing.'
        : p.volLow
        ? 'Volume starts conservatively — your body adapts to running load progressively, not all at once.'
        : 'The progression follows the 8% weekly increase rule to maximise adaptation while minimising injury risk.'
    } Long run peaks at ${structure.peakLong.toFixed(1)}km.`,
  });

  // Runs/week reason
  reasons.push({
    icon: '📅',
    title: `${structure.runsPerWeek} Runs Per Week`,
    body: `${
      structure.runsPerWeek === 3
        ? 'Three sessions per week is the sweet spot for busy schedules — enough stimulus for real progress without overwhelming recovery demand.'
        : structure.runsPerWeek === 4
        ? 'Four runs/week balances frequency and recovery well. Your consistency score suggests this is achievable for you.'
        : 'Five runs/week is optimal for your fitness level — frequency builds aerobic adaptation faster than occasional long efforts.'
    } Rest days are not optional — they\'re where the fitness is built.`,
  });

  // Consistency reason
  if (p.consistency > 0) {
    reasons.push({
      icon: '🔄',
      title: 'Consistency Profile',
      body: `Your consistency score is ${p.consistency}/100. ${
        p.consistency >= 70
          ? 'You show up reliably — this plan rewards that with progressive overload that will compound your fitness.'
          : p.consistency >= 40
          ? 'Your consistency is building. This plan is structured to be completable — not heroic. Finishing 80% of it beats nailing 40%.'
          : 'The plan is intentionally flexible — if life interrupts, just pick up on the next scheduled run. Consistency over perfection.'
      }`,
    });
  }

  return reasons;
}

// ─── Focus definitions ────────────────────────────────────────────────────────

const FOCUSES = {
  absoluteBeginner: {
    subtitle: 'Start Here — Zero to Runner',
    description: 'A gentle 6-week plan built specifically for your starting point. Walk/run intervals that build confidence before fitness.',
    longDescription: 'Every elite runner started exactly where you are. This plan respects that — no judgement, no rush. Walk when you need to, run when you can, and trust the process.',
    icon: '🌱',
    gradient: ['#C8E6C9', '#81C784'],
    primaryZone: 1,
    tags: ['beginner', 'walk/run', 'gentle'],
    defaultWeeks: 6,
    defaultRuns: 3,
    maxLongRun: 5,
    includesHard: false,
    longZone: 1,
    easyZone: 1,
    longRunType: 'Long Walk/Run',
    longDesc: (i, dist, p) => `Walk/run for ${dist.toFixed(1)}km — walk any time you need to`,
    hardDesc: (i, p) => 'Slightly brisker walk/run intervals',
    easyDesc: (i, p) => 'Easy walk/run — comfort over pace',
    phases: [
      { name: 'First Steps', summary: (w, p) => 'Walk 4 min, run 1 min. Repeat. That\'s it.', coachNote: (w, p) => '💜 Getting started is the hardest part. You\'ve already done it.' },
      { name: 'Building', summary: (w, p) => 'Walk 2 min, run 3 min intervals.', coachNote: (w, p) => '🌱 Notice how much easier this feels vs week 1? That\'s adaptation.' },
      { name: 'Running!', summary: (w, p) => 'First continuous running blocks. You are a runner.', coachNote: (w, p) => '🎉 You\'re running. Fully. Look at you.' },
    ],
    reasonMain: (p) => 'You\'re in the early stages of your running journey. The plan focuses on building the habit and the basic aerobic machinery before any performance goals.',
  },

  zone2Reset: {
    subtitle: 'Slow Down to Speed Up',
    description: 'Your data shows too much "grey zone" running — not easy enough to build base, not hard enough to build speed. This plan fixes that.',
    longDescription: 'The most common mistake in recreational running is running every run at a "moderate" pace. It\'s too hard to be aerobic, too easy to be anaerobic — and it builds nothing. This plan enforces true Zone 2 effort and the results compound fast.',
    icon: '💚',
    gradient: ['#A5D6A7', '#43A047'],
    primaryZone: 2,
    tags: ['zone 2', 'aerobic base', 'reset'],
    defaultWeeks: 8,
    defaultRuns: 4,
    maxLongRun: 14,
    includesHard: false,
    longZone: 2,
    easyZone: 2,
    longRunType: 'Zone 2 Long',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km fully in Zone 2. HR target: ${Math.round(p.maxHR * 0.6)}–${Math.round(p.maxHR * 0.75)} BPM. Nose-breathe if possible.`,
    hardDesc: (i, p) => `Zone 2 steady run — resist the urge to push harder`,
    easyDesc: (i, p) => 'Easy Zone 2 run — if you can\'t hold a conversation, slow down',
    phases: [
      { name: 'The Reset', summary: (w, p) => `Week ${w}: every run in Zone 2. Yes, it feels slow. That\'s correct.`, coachNote: (w, p) => `💚 Zone 2 HR target: ${Math.round(p.maxHR * 0.6)}–${Math.round(p.maxHR * 0.75)} BPM. Use your HR data.` },
      { name: 'Building Base', summary: (w, p) => `Week ${w}: longer Zone 2 sessions as the pace naturally quickens.`, coachNote: (w, p) => '📈 Notice your pace is faster for the same HR? That\'s aerobic adaptation in real time.' },
      { name: 'Consolidating', summary: (w, p) => `Week ${w}: your "slow" pace is now faster than your old "moderate". Keep going.`, coachNote: (w, p) => '🚀 The aerobic engine is built. Speed comes next — but the base comes first.' },
    ],
    reasonMain: (p) => `${p.z2pct.toFixed(0)}% of your running is in Zone 2 — the science-backed optimal is 65–75%. Running in the "grey zone" builds neither aerobic base nor speed. This plan corrects that split, which will make your future fast runs dramatically faster.`,
  },

  habitBuilder: {
    subtitle: 'Build the Streak',
    description: 'Consistency beats intensity every time. This plan is designed to be completable — short, satisfying sessions that build the habit above everything else.',
    longDescription: 'Your biggest gains right now don\'t come from harder sessions — they come from showing up more consistently. This plan uses short, achievable runs that fit your life, with enough variety to keep it interesting.',
    icon: '🔥',
    gradient: ['#FFCC80', '#FFA726'],
    primaryZone: 2,
    tags: ['consistency', 'habit', 'achievable'],
    defaultWeeks: 6,
    defaultRuns: 3,
    maxLongRun: 10,
    includesHard: false,
    longZone: 2,
    easyZone: 2,
    longRunType: 'Weekend Run',
    longDesc: (i, dist, p) => `Weekend run — ${dist.toFixed(1)}km easy. No pressure, just movement.`,
    hardDesc: (i, p) => 'Slightly brisk effort — fartlek-style: go fast when it feels good',
    easyDesc: (i, p) => 'Easy 20–25 minute run. Getting out is the whole point.',
    phases: [
      { name: 'Just Show Up', summary: (w, p) => `Week ${w}: 3 runs. Short. Easy. Just show up.`, coachNote: (w, p) => '🎯 The only goal this week: 3 runs. That\'s it.' },
      { name: 'Building Rhythm', summary: (w, p) => `Week ${w}: you\'re starting to feel the rhythm. Protect it.`, coachNote: (w, p) => '🔥 Consistency is a skill. You\'re learning it.' },
      { name: 'Habit Locked', summary: (w, p) => `Week ${w}: running feels wrong when you don\'t do it. That\'s a habit.`, coachNote: (w, p) => '💜 Identity shift complete: you are a runner.' },
    ],
    reasonMain: (p) => `Your consistency score is ${p.consistency}/100. The single biggest lever for improvement right now isn\'t pace or volume — it\'s showing up regularly. This plan makes that as easy as possible.`,
  },

  recovery: {
    subtitle: 'Strategic Recovery Block',
    description: 'Your body is carrying fatigue. This isn\'t a step back — it\'s when fitness from your hard weeks actually lands and becomes permanent.',
    longDescription: 'Adaptation happens during recovery, not during training. If you keep pushing on tired legs, you accumulate fatigue without absorbing the fitness gains. Two weeks of deliberate easy running will make you measurably fitter.',
    icon: '🧘',
    gradient: ['#B3E5FC', '#4FC3F7'],
    primaryZone: 1,
    tags: ['recovery', 'rest', 'adaptation'],
    defaultWeeks: 3,
    defaultRuns: 3,
    maxLongRun: 8,
    includesHard: false,
    longZone: 1,
    easyZone: 1,
    longRunType: 'Easy Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km very easy. Zone 1. This is recovery, not training.`,
    hardDesc: (i, p) => 'Easy Zone 2 run — ceiling, not floor',
    easyDesc: (i, p) => 'Very easy jog. Walk breaks are fine. Prioritise feeling good.',
    phases: [
      { name: 'Full Reset', summary: (w, p) => 'Very easy runs only. Let fatigue drain.', coachNote: (w, p) => '🛌 Your body adapts when you rest. This is the training.' },
      { name: 'Restore', summary: (w, p) => 'Legs should feel lighter. You\'re absorbing weeks of work.', coachNote: (w, p) => '📈 Notice how much better this feels? That\'s fitness landing.' },
      { name: 'Ready', summary: (w, p) => 'One more gentle week before resuming full training.', coachNote: (w, p) => '🚀 You\'re fresh. The next block is going to be your best.' },
    ],
    reasonMain: (p) => `Your training stress balance is ${p.tsb.toFixed(0)} — you\'re carrying significant fatigue. Continuing to push will increase injury risk and suppress adaptation. Two to three weeks of deliberate easy running will let weeks of hard work convert into lasting fitness.`,
  },

  aerobicRebuild: {
    subtitle: 'Rebuild the Engine',
    description: 'Your aerobic efficiency is declining — heart rate creeping up for the same paces. This targeted base-building block reverses that trend.',
    longDescription: 'Aerobic efficiency (pace-to-HR ratio) is the gold standard of running fitness. When it declines, it means your aerobic system is overstressed. The fix: a dedicated block of patient Zone 2 work that forces your body to improve fat metabolism and cardiac stroke volume.',
    icon: '🔧',
    gradient: ['#CE93D8', '#7B1FA2'],
    primaryZone: 2,
    tags: ['aerobic', 'base rebuild', 'efficiency'],
    defaultWeeks: 7,
    defaultRuns: 4,
    maxLongRun: 13,
    includesHard: false,
    longZone: 2,
    easyZone: 2,
    longRunType: 'Aerobic Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km fully aerobic — HR cap ${Math.round(p.maxHR * 0.75)} BPM`,
    hardDesc: (i, p) => 'Aerobic tempo — Zone 2 upper limit. HR cap strictly enforced.',
    easyDesc: (i, p) => 'Easy Zone 2 run — let the data guide the effort, not feel',
    phases: [
      { name: 'Efficiency Baseline', summary: (w, p) => `Week ${w}: establishing new aerobic baseline. Track HR vs pace.`, coachNote: (w, p) => `📊 Log your HR every run. You\'re watching your body repair in real time.` },
      { name: 'Adapting', summary: (w, p) => `Week ${w}: aerobic system responding. Pace should start to improve at same HR.`, coachNote: (w, p) => '💚 The improvement is happening even if you can\'t see it yet. Stay patient.' },
      { name: 'Rebuilding', summary: (w, p) => `Week ${w}: aerobic engine rebuilt. Ready to layer speed back in.`, coachNote: (w, p) => '⚡ Base is solid. Speed work will now stick properly.' },
    ],
    reasonMain: (p) => `Your aerobic efficiency metric (pace divided by heart rate) has been declining, meaning your heart is working harder for the same pace. This is a clear signal to rebuild aerobic base. ${p.aerobicTrend ? `The trend shows a ${(p.aerobicTrend.delta * 100).toFixed(1)}% decline over your recent runs.` : ''} This plan reverses that.`,
  },

  speedDevelopment: {
    subtitle: 'Get Measurably Faster',
    description: 'You have the aerobic base. Now it\'s time to add quality — tempo runs, intervals, and strides that translate directly into faster race times.',
    longDescription: 'Speed development works because it forces your body to recruit more muscle fibres, improve running economy, and raise your lactate threshold. On top of your solid Zone 2 base, these sessions will produce significant pace improvements within weeks.',
    icon: '⚡',
    gradient: ['#FFF176', '#F57F17'],
    primaryZone: 4,
    tags: ['speed', 'intervals', 'tempo', 'PB'],
    defaultWeeks: 8,
    defaultRuns: 4,
    maxLongRun: 15,
    includesHard: true,
    longZone: 2,
    hardZone: 4,
    easyZone: 2,
    longRunType: 'Easy Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km fully easy — recovery and aerobic base maintenance`,
    hardDesc: (i, p) => `${4 + Math.floor(i/2)}×600m at 5K effort with 2min jog recovery`,
    easyDesc: (i, p) => 'Easy Zone 2 — the foundation that makes the speed sessions work',
    phases: [
      { name: 'Speed Introduction', summary: (w, p) => `Week ${w}: short sharp intervals. Teach your legs what fast feels like.`, coachNote: (w, p) => '⚡ Run the intervals FAST. The recovery is your friend.' },
      { name: 'Building Speed', summary: (w, p) => `Week ${w}: longer intervals, more reps. Speed endurance developing.`, coachNote: (w, p) => '📈 Notice that "fast" is starting to feel more natural? That\'s neuromuscular adaptation.' },
      { name: 'Speed Peak', summary: (w, p) => `Week ${w}: race-simulation efforts. This is where the PB is being built.`, coachNote: (w, p) => '🏆 Race-sharp fitness. You\'re ready for a time trial.' },
    ],
    reasonMain: (p) => `Your Zone 2 percentage is ${p.z2pct.toFixed(0)}% — you\'ve built the aerobic base needed to benefit from quality work. Layering in intervals and tempo sessions on this foundation will produce real speed gains. Without the base you have, speed work would just create injury.`,
  },

  longRunBuilder: {
    subtitle: 'Build Your Distance',
    description: 'Systematically extend your long run to unlock new distances. The long run is where endurance lives.',
    longDescription: 'The long run is the cornerstone of distance running. This plan\'s entire architecture revolves around it — every other session exists to support your weekly long run and help your body absorb it. Your longest run will grow 1–2km per week safely.',
    icon: '🏅',
    gradient: ['#FFAB76', '#E65100'],
    primaryZone: 2,
    tags: ['distance', 'long run', 'endurance'],
    defaultWeeks: 10,
    defaultRuns: 4,
    maxLongRun: 20,
    includesHard: false,
    longZone: 2,
    easyZone: 2,
    longRunType: 'The Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km — fully easy Zone 2. Bring water. This is the session that matters.`,
    hardDesc: (i, p) => 'Mid-week medium run — building distance tolerance',
    easyDesc: (i, p) => 'Easy recovery run to flush legs from long run',
    phases: [
      { name: 'Long Run Foundation', summary: (w, p) => `Week ${w}: establishing the long run habit.`, coachNote: (w, p) => '🏅 The long run is a skill. You\'re learning it.' },
      { name: 'Extending', summary: (w, p) => `Week ${w}: long run growing. Body adapting to time on feet.`, coachNote: (w, p) => '💪 These miles are going in the bank.' },
      { name: 'Confident Distance', summary: (w, p) => `Week ${w}: running distances you\'ve never run before.`, coachNote: (w, p) => '🌟 Every long run is a new personal record. Celebrate it.' },
    ],
    reasonMain: (p) => `Your longest run of ${p.longestRun.toFixed(1)}km and weekly volume of ${p.avgWeeklyKm.toFixed(0)}km suggest you\'re ready to extend your distance ceiling. This plan\'s long run progression will systematically take you further than you\'ve gone before.`,
  },

  halfMarathonPrep: {
    subtitle: 'Half Marathon Ready',
    description: 'You have the base for a half marathon. This plan takes you there with a structured 12-week build that peaks at 19km.',
    longDescription: 'The half marathon demands both aerobic endurance and some speed. This plan builds your long run to 19km, adds race-pace efforts in the middle weeks, and tapers you into peak fitness for race day.',
    icon: '👑',
    gradient: ['#F48FB1', '#C2185B'],
    primaryZone: 3,
    tags: ['half marathon', '21K', 'race prep'],
    defaultWeeks: 12,
    defaultRuns: 4,
    maxLongRun: 19,
    includesHard: true,
    longZone: 2,
    hardZone: 3,
    easyZone: 2,
    longRunType: 'Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km easy — building toward the 21.1km finish line`,
    hardDesc: (i, p) => `${20 + i * 3}min at goal half-marathon effort (comfortable-hard)`,
    easyDesc: (i, p) => 'Easy aerobic run — the engine that powers race day',
    phases: [
      { name: 'Base Phase', summary: (w, p) => `Week ${w}: build the aerobic engine for race day.`, coachNote: (w, p) => '🌱 Every easy run is investing in your finish line.' },
      { name: 'Race Pace Work', summary: (w, p) => `Week ${w}: introducing half-marathon pace efforts.`, coachNote: (w, p) => '💜 Race pace should feel "comfortably hard". If it\'s easy, push a little.' },
      { name: 'Peak & Taper', summary: (w, p) => `Week ${w}: peak fitness. Trust it — don\'t add more now.`, coachNote: (w, p) => '🏆 You\'re ready. The taper is not a setback, it\'s the finish line preparation.' },
    ],
    reasonMain: (p) => `Your longest run of ${p.longestRun.toFixed(1)}km and weekly average of ${p.avgWeeklyKm.toFixed(0)}km show you have the foundation for a half marathon. Your data says you\'re ready — this plan gets you to the start line confident and fresh.`,
  },

  breakPlateau: {
    subtitle: 'Smash Through Your Plateau',
    description: 'Your pace has stalled. This targeted 8-week plan introduces the specific training stimuli your body hasn\'t had — and watch the PBs fall.',
    longDescription: 'Plateaus happen when your body adapts to its current training stimulus. The fix isn\'t more of the same — it\'s a different kind of hard. This plan introduces tempo runs, hill repeats, and fartlek sessions that shock your system into a new level of adaptation.',
    icon: '💥',
    gradient: ['#EF9A9A', '#B71C1C'],
    primaryZone: 4,
    tags: ['plateau', 'speed', 'breakthrough'],
    defaultWeeks: 8,
    defaultRuns: 4,
    maxLongRun: 14,
    includesHard: true,
    longZone: 2,
    hardZone: 4,
    easyZone: 2,
    longRunType: 'Easy Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km easy — recover from the hard midweek sessions`,
    hardDesc: (i, p) => `${['Fartlek: 8×1min fast/1min easy', 'Tempo: 20min at threshold', 'Hills: 6×90sec uphill hard', 'Intervals: 5×800m at 5K pace'][i % 4]}`,
    easyDesc: (i, p) => 'Easy Zone 2 — active recovery',
    phases: [
      { name: 'Shock the System', summary: (w, p) => `Week ${w}: new stimulus. Your body will be confused. That\'s the point.`, coachNote: (w, p) => '💥 The discomfort is the adaptation happening.' },
      { name: 'New Adaptations', summary: (w, p) => `Week ${w}: body adapting to new intensities. Plateau cracking.`, coachNote: (w, p) => '📈 Trust the process. The PB is being built right now.' },
      { name: 'Breakthrough', summary: (w, p) => `Week ${w}: test yourself. The plateau is behind you.`, coachNote: (w, p) => '🏆 Time for a time trial. You\'re going to surprise yourself.' },
    ],
    reasonMain: (p) => `Your pace improvement has been minimal over recent runs despite ${p.totalRuns} total runs — a classic plateau. Your body has adapted to its current training. This plan introduces tempo runs, hill repeats, and intervals — new stimuli that will force new adaptations and break through the ceiling.`,
  },

  volumeBuilder: {
    subtitle: 'Run More, Run Farther',
    description: 'Your body is ready for more. This plan safely increases weekly volume to unlock the next level of endurance fitness.',
    longDescription: 'The number one predictor of running improvement is training volume. You\'ve built the base and the habit — now it\'s time to run more. This plan adds volume safely with a mix of easy runs and one weekly long run.',
    icon: '📈',
    gradient: ['#90CAF9', '#1565C0'],
    primaryZone: 2,
    tags: ['volume', 'build', 'base'],
    defaultWeeks: 8,
    defaultRuns: 4,
    maxLongRun: 14,
    includesHard: false,
    longZone: 2,
    easyZone: 2,
    longRunType: 'Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km easy — building distance tolerance`,
    hardDesc: (i, p) => 'Medium easy run — Zone 2, slightly longer than usual',
    easyDesc: (i, p) => 'Easy Zone 2 run — adding volume to the engine',
    phases: [
      { name: 'Volume Introduction', summary: (w, p) => `Week ${w}: more runs, same easy effort.`, coachNote: (w, p) => '📏 More easy kilometres = more aerobic adaptation. Simple and powerful.' },
      { name: 'Building', summary: (w, p) => `Week ${w}: noticing more endurance? That\'s 8% more volume compounding.`, coachNote: (w, p) => '💪 Stay easy. Volume done right feels sustainable.' },
      { name: 'New Baseline', summary: (w, p) => `Week ${w}: this is your new normal. Strong new baseline established.`, coachNote: (w, p) => '🌟 Your fitness ceiling has risen. What\'s next?' },
    ],
    reasonMain: (p) => `Your current average of ${p.avgWeeklyKm.toFixed(0)}km/week is below your potential. With ${p.totalRuns} runs showing good form and consistency beginning to develop, safely increasing volume is the highest-leverage move for your fitness right now.`,
  },

  hrvAndHealth: {
    subtitle: 'Optimise Recovery & HRV',
    description: 'Train smarter, not harder. This plan is designed around your nervous system — building fitness while systematically raising your HRV and lowering resting HR.',
    longDescription: 'HRV is the best single predictor of how well your body is adapting to training. High HRV = resilient, recovered, thriving. Low HRV = stressed, overtrained, at injury risk. This plan uses the latest research on parasympathetic training to optimise both.',
    icon: '💜',
    gradient: ['#E1BEE7', '#7B1FA2'],
    primaryZone: 2,
    tags: ['HRV', 'health', 'recovery', 'nervous system'],
    defaultWeeks: 7,
    defaultRuns: 3,
    maxLongRun: 12,
    includesHard: false,
    longZone: 2,
    easyZone: 1,
    longRunType: 'Aerobic Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km fully aerobic — nose breathing the whole time if possible`,
    hardDesc: (i, p) => 'Slightly harder aerobic effort — still conversational',
    easyDesc: (i, p) => 'Very easy run — focus on breathing rhythm over pace',
    phases: [
      { name: 'Nervous System Reset', summary: (w, p) => `Week ${w}: gentle, easy running to let HRV baseline emerge.`, coachNote: (w, p) => '🧘 Check your HRV each morning before getting up. Track the trend.' },
      { name: 'HRV Rising', summary: (w, p) => `Week ${w}: seeing HRV numbers improve? This is why you\'re going easy.`, coachNote: (w, p) => '📈 Consistency at low intensity is the most powerful HRV intervention.' },
      { name: 'Thriving', summary: (w, p) => `Week ${w}: HRV high, resting HR lower, energy better. Fitness built on health.`, coachNote: (w, p) => '💜 This is what sustainable fitness looks like.' },
    ],
    reasonMain: (p) => `${p.wantsHealth ? 'Your goal to improve health and HRV is directly addressed by this plan.' : `Your average HR of ${Math.round(p.avgHR)} BPM suggests your aerobic system could be more efficient.`} Research shows that predominantly low-intensity running (Zones 1–2) is the most effective intervention for raising HRV, lowering resting HR, and improving long-term cardiovascular health.`,
  },

  progressiveBase: {
    subtitle: 'Smart Progressive Overload',
    description: 'A well-rounded plan that matches your current fitness and builds every week. Structured, progressive, and balanced.',
    longDescription: 'Sometimes the best plan isn\'t a specialised intervention — it\'s a smart, progressive overload programme that advances your fitness across all dimensions. This plan does that using your specific metrics as starting points.',
    icon: '🚀',
    gradient: ['#B39DDB', '#512DA8'],
    primaryZone: 2,
    tags: ['progressive', 'balanced', 'all-round'],
    defaultWeeks: 8,
    defaultRuns: 4,
    maxLongRun: 16,
    includesHard: true,
    longZone: 2,
    hardZone: 3,
    easyZone: 2,
    longRunType: 'Long Run',
    longDesc: (i, dist, p) => `${dist.toFixed(1)}km easy long run — the week\'s most important session`,
    hardDesc: (i, p) => `Tempo run: ${20 + i * 2}min at comfortably hard effort`,
    easyDesc: (i, p) => 'Easy Zone 2 run — aerobic base work',
    phases: [
      { name: 'Foundation', summary: (w, p) => `Week ${w}: establishing the base for the weeks ahead.`, coachNote: (w, p) => '🌱 Every great block starts with a solid foundation.' },
      { name: 'Build', summary: (w, p) => `Week ${w}: progressive overload in action.`, coachNote: (w, p) => '💪 Each week slightly more than the last. That\'s the formula.' },
      { name: 'Peak', summary: (w, p) => `Week ${w}: peak training. This is where the biggest fitness gains live.`, coachNote: (w, p) => '🏆 You\'re at your most fit right now. And it keeps building.' },
    ],
    reasonMain: (p) => `Your running profile — ${p.totalRuns} runs, ${p.avgWeeklyKm.toFixed(0)}km/week average, ${p.level} level — calls for a well-structured progressive plan that builds volume and intensity simultaneously. No single weakness to fix: just time to level up.`,
  },
};
