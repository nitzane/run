import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import { TRAINING_PLANS } from '../../src/data/trainingPlans';
import { BADGES } from '../../src/data/badges';
import { Colors } from '../../src/utils/colors';
import { formatPace, formatDuration } from '../../src/utils/hrZones';
import GlassCard from '../../src/components/GlassCard';
import ZoneBar from '../../src/components/ZoneBar';

const QUOTES = [
  "She believed she could, so she ran. 🌸",
  "Every step is a love letter to yourself. 💌",
  "Run like the wind, glow like the sun. ✨",
  "Strong legs, soft heart, wild spirit. 🌿",
  "You're not just running — you're becoming. 💫",
  "Chase the endorphins, not perfection. 🌺",
  "One beautiful mile at a time. 🎀",
];

function AppLogo() {
  return (
    <View style={styles.logoWrap}>
      <View style={styles.logoRow}>
        <Text style={styles.logoSpark}>✦</Text>
        <LinearGradient
          colors={['#FF6B9D', '#E879B0', '#CE93D8']}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={styles.logoGrad}
        >
          <Text style={styles.logoText}>runflow</Text>
        </LinearGradient>
        <Text style={styles.logoSpark}>✦</Text>
      </View>
      <Text style={styles.logoTagline}>your running bestie 🎀</Text>
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, stats, runs, unlockedBadges, trainingDays, activePlanId, planProgress } = useApp();
  const todayDow = new Date().getDay();
  const isRestDay = !trainingDays.includes(todayDow);

  // Resolve next session from active plan
  const activePlan = TRAINING_PLANS.find(p => p.id === activePlanId);
  const weekIdx = activePlan ? planProgress.week - 1 : 0;
  const runIdx = activePlan ? planProgress.day - 1 : 0;
  const nextSession = activePlan?.weeks[weekIdx]?.runs[runIdx] ?? activePlan?.weeks[0]?.runs[0];
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const quote = QUOTES[new Date().getDay() % QUOTES.length];
  const recentBadges = BADGES.filter(b => unlockedBadges.includes(b.id)).slice(0, 5);
  const lastRun = runs[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1200, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  if (!user) return null;
  const weeklyProgress = Math.min(stats.weeklyDistanceKm / (user?.weeklyGoalKm || 20), 1);

  return (
    <LinearGradient colors={['#1A0A2E', '#2D1B69', '#11001C']} style={styles.container}>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <AppLogo />
          <View style={styles.greetingRow}>
            <View>
              <Text style={styles.greeting}>Hey {user?.name} 🌸</Text>
              <Text style={styles.quote}>"{quote}"</Text>
            </View>
            <TouchableOpacity style={styles.notifBtn}>
              <Ionicons name="notifications-outline" size={20} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Weekly Stats Ring */}
        <Animated.View style={{ opacity: fadeAnim, marginTop: 24 }}>
          <GlassCard style={styles.statsCard}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.weeklyDistanceKm.toFixed(1)}</Text>
                <Text style={styles.statUnit}>km</Text>
                <Text style={styles.statLabel}>Distance</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.weeklyRuns}</Text>
                <Text style={styles.statUnit}>runs</Text>
                <Text style={styles.statLabel}>Runs</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.weeklyTimeMin}</Text>
                <Text style={styles.statUnit}>min</Text>
                <Text style={styles.statLabel}>Time</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.currentStreak}</Text>
                <Text style={styles.statUnit}>days</Text>
                <Text style={styles.statLabel}>Streak 🔥</Text>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>Weekly Goal</Text>
                <Text style={styles.progressText}>{(stats.weeklyDistanceKm || 0).toFixed(1)} / {user?.weeklyGoalKm ?? 20} km</Text>
              </View>
              <View style={styles.progressBg}>
                <Animated.View style={[styles.progressFill, { width: `${weeklyProgress * 100}%` }]}>
                  <LinearGradient colors={['#FF6B9D', '#C8A8E9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
                </Animated.View>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        {/* Today's card — rest day or workout */}
        <Animated.View style={{ opacity: fadeAnim, marginTop: 16 }}>
          {isRestDay ? (
            <GlassCard style={styles.trainingCard} padding={0}>
              <LinearGradient colors={['rgba(100,181,246,0.25)', 'rgba(77,208,225,0.1)']} style={styles.trainingGradient}>
                <View style={styles.trainingHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.trainingLabel, { color: '#64B5F6' }]}>REST DAY</Text>
                    <Text style={styles.trainingTitle}>Recovery & Recharge</Text>
                    <Text style={styles.trainingDetail}>Your streak is safe — enjoy the rest 💙</Text>
                  </View>
                  <View style={styles.trainingIcon}>
                    <Text style={{ fontSize: 32 }}>🛁</Text>
                  </View>
                </View>
                <Text style={styles.trainingDesc}>
                  Rest days are when your body actually gets stronger. Hydrate, stretch, sleep well, and come back fresh tomorrow.
                </Text>
              </LinearGradient>
            </GlassCard>
          ) : nextSession ? (
            <GlassCard style={styles.trainingCard} padding={0}>
              <LinearGradient colors={['rgba(67,160,71,0.3)', 'rgba(102,187,106,0.1)']} style={styles.trainingGradient}>
                <View style={styles.trainingHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.trainingLabel}>TODAY'S WORKOUT · {activePlan?.title}</Text>
                    <Text style={styles.trainingTitle}>{nextSession.type}</Text>
                    <Text style={styles.trainingDetail}>{nextSession.duration} min · Zone {nextSession.zone}</Text>
                  </View>
                  <View style={styles.trainingIcon}>
                    <Text style={{ fontSize: 32 }}>💚</Text>
                  </View>
                </View>
                <Text style={styles.trainingDesc}>{nextSession.description}</Text>
                <TouchableOpacity
                  style={styles.startRunInline}
                  activeOpacity={0.85}
                  onPress={() => router.push({
                    pathname: '/active-run',
                    params: { planId: activePlan.id, weekIndex: weekIdx, runIndex: runIdx },
                  })}
                >
                  <LinearGradient colors={['#FF6B9D', '#C8A8E9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.startRunInlineGrad}>
                    <Ionicons name="play" size={16} color="#fff" />
                    <Text style={styles.startRunInlineText}>Start This Run</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </GlassCard>
          ) : (
            <GlassCard style={styles.trainingCard} padding={0}>
              <LinearGradient colors={['rgba(67,160,71,0.3)', 'rgba(102,187,106,0.1)']} style={styles.trainingGradient}>
                <View style={styles.trainingHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.trainingLabel}>TODAY'S WORKOUT</Text>
                    <Text style={styles.trainingTitle}>Free Run</Text>
                    <Text style={styles.trainingDetail}>No plan active — run your way!</Text>
                  </View>
                  <View style={styles.trainingIcon}>
                    <Text style={{ fontSize: 32 }}>🏃‍♀️</Text>
                  </View>
                </View>
                <Text style={styles.trainingDesc}>Pick a training plan in the Train tab to unlock structured sessions here.</Text>
              </LinearGradient>
            </GlassCard>
          )}
        </Animated.View>

        {/* Recent Badges */}
        {recentBadges.length > 0 && (
          <Animated.View style={{ opacity: fadeAnim, marginTop: 16 }}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Badges</Text>
              <TouchableOpacity onPress={() => router.push('/achievements')}>
                <Text style={styles.seeAll}>See All →</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
              {recentBadges.map(badge => (
                <View key={badge.id} style={styles.badgeItem}>
                  <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} style={styles.badgeCircle}>
                    <Text style={styles.badgeEmoji}>{badge.icon}</Text>
                  </LinearGradient>
                  <Text style={styles.badgeName}>{badge.title}</Text>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Last Run */}
        {lastRun && (
          <Animated.View style={{ opacity: fadeAnim, marginTop: 16 }}>
            <Text style={styles.sectionTitle}>Last Run</Text>
            <GlassCard style={{ marginTop: 8 }}>
              <View style={styles.lastRunHeader}>
                <Text style={styles.lastRunDate}>
                  {new Date(lastRun.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </Text>
                <Text style={styles.lastRunDist}>{lastRun.distanceKm.toFixed(1)} km</Text>
              </View>
              <View style={styles.lastRunStats}>
                <View style={styles.lastRunStat}>
                  <Ionicons name="time-outline" size={14} color={Colors.muted} />
                  <Text style={styles.lastRunStatText}>{formatDuration(lastRun.durationSec)}</Text>
                </View>
                <View style={styles.lastRunStat}>
                  <Ionicons name="speedometer-outline" size={14} color={Colors.muted} />
                  <Text style={styles.lastRunStatText}>{formatPace(lastRun.avgPace)}/km</Text>
                </View>
                <View style={styles.lastRunStat}>
                  <Ionicons name="heart-outline" size={14} color={Colors.muted} />
                  <Text style={styles.lastRunStatText}>{lastRun.avgHR} bpm</Text>
                </View>
              </View>
              <ZoneBar zones={lastRun.zones} />
            </GlassCard>
          </Animated.View>
        )}
      </ScrollView>

      {/* Quick Start Button */}
      <View style={[styles.fabContainer, { bottom: insets.bottom + 90 }]}>
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity
            style={styles.fabOuter}
            onPress={() => router.push('/active-run')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#FF6B9D', '#E54882', '#C8A8E9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.fab}
            >
              <Ionicons name="play" size={28} color={Colors.white} />
              <Text style={styles.fabText}>Start Run</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },

  logoWrap: { alignItems: 'center', paddingTop: 4, marginBottom: 16 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoGrad: { borderRadius: 8, paddingHorizontal: 2 },
  logoText: { fontSize: 36, fontWeight: '900', color: '#fff', letterSpacing: -1, fontStyle: 'italic' },
  logoSpark: { fontSize: 18, color: '#FF6B9D' },
  logoTagline: { fontSize: 12, color: 'rgba(255,107,157,0.7)', fontStyle: 'italic', marginTop: 2, letterSpacing: 0.5 },

  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  greeting: { fontSize: 20, fontWeight: '700', color: Colors.white },
  notifBtn: {
    width: 38, height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 19,
    maxWidth: '85%',
  },
  statsCard: { marginHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 12 },
  statsRow: { flexDirection: 'row', alignItems: 'center' },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: Colors.white },
  statUnit: { fontSize: 10, color: Colors.muted, marginTop: -2 },
  statLabel: { fontSize: 10, color: Colors.muted, marginTop: 2 },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.15)' },
  progressSection: { marginTop: 16 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 12, color: Colors.muted },
  progressText: { fontSize: 12, color: Colors.offWhite, fontWeight: '600' },
  progressBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  trainingCard: { marginHorizontal: 20 },
  trainingGradient: { borderRadius: 20, padding: 16 },
  trainingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  trainingLabel: { fontSize: 10, color: '#66BB6A', fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  trainingTitle: { fontSize: 20, fontWeight: '800', color: Colors.white, marginTop: 4 },
  trainingDetail: { fontSize: 13, color: Colors.muted, marginTop: 2 },
  trainingIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  trainingDesc: { fontSize: 13, color: Colors.muted, marginTop: 12, lineHeight: 20 },
  startRunInline: { marginTop: 14, borderRadius: 12, overflow: 'hidden' },
  startRunInlineGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, paddingHorizontal: 20 },
  startRunInlineText: { fontSize: 15, fontWeight: '800', color: '#fff' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  seeAll: { fontSize: 13, color: Colors.primary },
  badgesScroll: { paddingLeft: 20, marginTop: 8 },
  badgeItem: { alignItems: 'center', marginRight: 16, width: 64 },
  badgeCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  badgeEmoji: { fontSize: 26 },
  badgeName: { fontSize: 10, color: Colors.muted, marginTop: 4, textAlign: 'center' },
  lastRunHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  lastRunDate: { fontSize: 13, color: Colors.muted },
  lastRunDist: { fontSize: 18, fontWeight: '800', color: Colors.white },
  lastRunStats: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  lastRunStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  lastRunStatText: { fontSize: 13, color: Colors.offWhite },
  fabContainer: { position: 'absolute', alignSelf: 'center' },
  fabOuter: { shadowColor: '#FF6B9D', shadowOpacity: 0.6, shadowRadius: 20, shadowOffset: { width: 0, height: 4 } },
  fab: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 50 },
  fabText: { fontSize: 18, fontWeight: '800', color: Colors.white, letterSpacing: 0.5 },
});
