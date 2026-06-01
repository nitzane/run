import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { generateCustomPlan } from '../src/utils/customPlanGenerator';
import { computeAllStats, formatPace } from '../src/utils/statsEngine';
import { useApp } from '../src/context/AppContext';

const { width } = Dimensions.get('window');

export default function CustomPlanScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, runs, trainingDays } = useApp();
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeTab, setActiveTab] = useState('plan');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const stats = computeAllStats(runs, { trainingDays });
  const plan = generateCustomPlan(user || {}, stats);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const currentWeek = plan.weeks[activeWeek];

  return (
    <View style={{ flex: 1, backgroundColor: '#FDF6FF' }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}>

        {/* Hero */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.hero}>
            <LinearGradient colors={plan.gradient} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
            {/* Back */}
            <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { top: insets.top + 12 }]}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>

            <View style={[styles.heroContent, { paddingTop: insets.top + 52 }]}>
              <View style={styles.customBadge}>
                <Text style={styles.customBadgeText}>✨ Built Just For You</Text>
              </View>
              <Text style={styles.heroIcon}>{plan.icon}</Text>
              <Text style={styles.heroTitle}>{plan.title}</Text>
              <Text style={styles.heroSubtitle}>{plan.subtitle}</Text>
              <Text style={styles.heroDesc}>{plan.description}</Text>

              {/* Key stats row */}
              <View style={styles.heroStats}>
                <HeroStat value={`${plan.durationWeeks}wk`} label="Duration" />
                <View style={styles.heroStatDiv} />
                <HeroStat value={`${plan.runsPerWeek}x`} label="Per Week" />
                <View style={styles.heroStatDiv} />
                <HeroStat value={plan.difficulty} label="Level" />
                <View style={styles.heroStatDiv} />
                <HeroStat value={`Z${plan.targetZone}`} label="Primary" />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {[['plan', '📋 Plan'], ['why', '🧠 Why This'], ['data', '📊 Your Data']].map(([id, label]) => (
            <TouchableOpacity key={id} onPress={() => setActiveTab(id)} style={[styles.tab, activeTab === id && styles.tabActive]}>
              <Text style={[styles.tabText, activeTab === id && styles.tabTextActive]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'plan' && <PlanTab plan={plan} activeWeek={activeWeek} setActiveWeek={setActiveWeek} currentWeek={currentWeek} />}
        {activeTab === 'why' && <WhyTab plan={plan} />}
        {activeTab === 'data' && <DataTab plan={plan} stats={stats} />}

      </ScrollView>

      {/* Start CTA */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity activeOpacity={0.85} style={styles.ctaBtn}>
          <LinearGradient colors={plan.gradient} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
          <Text style={styles.ctaText}>Start This Plan</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Plan Tab ─────────────────────────────────────────────────────────────────
function PlanTab({ plan, activeWeek, setActiveWeek, currentWeek }) {
  return (
    <View>
      {/* Week selector */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Week-by-Week</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}>
          {plan.weeks.map((w, i) => (
            <TouchableOpacity key={i} onPress={() => setActiveWeek(i)} style={[styles.weekPill, activeWeek === i && styles.weekPillActive]}>
              <Text style={[styles.weekPillNum, activeWeek === i && styles.weekPillNumActive]}>W{w.week}</Text>
              <Text style={[styles.weekPillFocus, activeWeek === i && styles.weekPillFocusActive]} numberOfLines={1}>{w.focus}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Week detail */}
      {currentWeek && (
        <View style={styles.section}>
          <View style={styles.weekHeader}>
            <View>
              <Text style={styles.weekTitle}>Week {currentWeek.week} — {currentWeek.focus}</Text>
              <Text style={styles.weekSummary}>{currentWeek.summary}</Text>
            </View>
            <View style={styles.weekKmBadge}>
              <Text style={styles.weekKmText}>{currentWeek.targetKm}km</Text>
            </View>
          </View>

          {/* Coach note */}
          <View style={styles.coachNote}>
            <Text style={styles.coachNoteText}>{currentWeek.coachNote}</Text>
          </View>

          {/* Day cards */}
          {currentWeek.runs.map((run, i) => (
            <DayCard key={i} run={run} index={i} />
          ))}
        </View>
      )}

      {/* Overview table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Full Plan Overview</Text>
        {plan.weeks.map((w, i) => (
          <TouchableOpacity key={i} onPress={() => setActiveWeek(i)}
            style={[styles.overviewRow, activeWeek === i && styles.overviewRowActive]}>
            <Text style={styles.overviewWeek}>W{w.week}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.overviewFocus}>{w.focus}</Text>
              <Text style={styles.overviewSummary} numberOfLines={1}>{w.summary}</Text>
            </View>
            <Text style={styles.overviewKm}>{w.targetKm}km</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// ─── Why Tab ──────────────────────────────────────────────────────────────────
function WhyTab({ plan }) {
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why We Built This For You</Text>
        <Text style={styles.longDesc}>{plan.focus.longDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The Reasoning</Text>
        {plan.reasoning.map((r, i) => (
          <View key={i} style={styles.reasonCard}>
            <View style={styles.reasonHeader}>
              <Text style={styles.reasonIcon}>{r.icon}</Text>
              <Text style={styles.reasonTitle}>{r.title}</Text>
            </View>
            <Text style={styles.reasonBody}>{r.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What to Expect</Text>
        <ExpectCard week={2} text="You'll start noticing that easy runs feel genuinely easier at the same pace." icon="🌱" />
        <ExpectCard week={4} text="Your resting HR may begin to drop. Zone 2 pace will naturally quicken." icon="❤️" />
        <ExpectCard week={6} text="Significant aerobic adaptation. Runs that felt hard now feel manageable." icon="💪" />
        <ExpectCard week={plan.durationWeeks} text={`Plan complete. You're ready for the next level — and you have the data to prove it.`} icon="🏆" />
      </View>
    </View>
  );
}

// ─── Data Tab ─────────────────────────────────────────────────────────────────
function DataTab({ plan, stats }) {
  const p = plan.profile;
  const metrics = [
    { label: 'Weekly Average', value: `${p.avgWeeklyKm.toFixed(1)}km`, icon: '📏', note: `Starting at ${plan.structure.startKm.toFixed(0)}km → peak ${plan.structure.peakKm.toFixed(0)}km` },
    { label: 'Average Pace', value: formatPace(p.avgPace) + '/km', icon: '⚡', note: p.avgPace > 360 ? 'Zone 2 focus will improve this naturally' : 'Strong base pace' },
    { label: 'Avg Heart Rate', value: `${Math.round(p.avgHR)} BPM`, icon: '❤️', note: p.avgHR > 150 ? 'Slightly elevated — plan targets reduction' : 'Good aerobic range' },
    { label: 'Zone 2 Time', value: `${p.z2pct.toFixed(0)}%`, icon: '💚', note: p.tooHard ? '⚠️ Below 65% optimal — plan corrects this' : '✅ Good aerobic discipline' },
    { label: 'Consistency', value: `${p.consistency}/100`, icon: '🔄', note: p.inconsistent ? 'Building consistency is priority 1' : 'Solid foundation to build on' },
    { label: 'Current Streak', value: `${p.currentStreak} days`, icon: '🔥', note: p.currentStreak >= 5 ? 'Great momentum — protect it' : 'Plan designed to build this' },
    { label: 'Longest Run', value: `${p.longestRun.toFixed(1)}km`, icon: '🏅', note: `Plan peaks at ${plan.structure.peakLong.toFixed(1)}km` },
    { label: 'Training Balance', value: stats?.tsb > 0 ? `+${stats.tsb.toFixed(0)}` : (stats?.tsb?.toFixed(0) || '0'), icon: '⚖️', note: p.fatigued ? '⚠️ Carrying fatigue — plan starts gentle' : p.fresh ? '✅ Fresh — ready to build' : '➡️ Balanced' },
  ];

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Used to Build Your Plan</Text>
        <Text style={styles.dataSubtitle}>Every decision above is backed by one of these numbers.</Text>
        {metrics.map((m, i) => (
          <View key={i} style={styles.dataRow}>
            <Text style={styles.dataIcon}>{m.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.dataLabel}>{m.label}</Text>
              <Text style={styles.dataNote}>{m.note}</Text>
            </View>
            <Text style={styles.dataValue}>{m.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Goals Said</Text>
        {(user?.goals || []).map((g, i) => (
          <View key={i} style={styles.goalRow}>
            <Text style={styles.goalIcon}>🎯</Text>
            <Text style={styles.goalText}>{g}</Text>
          </View>
        ))}
        <View style={styles.goalInterpret}>
          <Text style={styles.goalInterpretText}>
            {plan.focus.reasonMain(plan.profile)}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroStat({ value, label }) {
  return (
    <View style={styles.heroStat}>
      <Text style={styles.heroStatValue}>{value}</Text>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

function DayCard({ run, index }) {
  const ZONE_COLORS = { 1: '#90CAF9', 2: '#A5D6A7', 3: '#FFF176', 4: '#FFAB76', 5: '#EF9A9A' };
  const zoneColor = ZONE_COLORS[run.zone] || '#E0E0E0';
  return (
    <View style={[styles.dayCard, { borderLeftColor: zoneColor }]}>
      <View style={styles.dayHeader}>
        <View style={[styles.dayBadge, { backgroundColor: zoneColor + '40' }]}>
          <Text style={[styles.dayBadgeText, { color: '#2D1B4E' }]}>{run.day}</Text>
        </View>
        <Text style={styles.dayType}>{run.type}</Text>
        <View style={[styles.zoneBadge, { backgroundColor: zoneColor }]}>
          <Text style={styles.zoneBadgeText}>Z{run.zone}</Text>
        </View>
        <Text style={styles.dayDuration}>{run.duration}min</Text>
      </View>
      <Text style={styles.dayDesc}>{run.description}</Text>
      {run.distance && <Text style={styles.dayDist}>~{run.distance.toFixed(1)}km target</Text>}
    </View>
  );
}

function ExpectCard({ week, text, icon }) {
  return (
    <View style={styles.expectCard}>
      <View style={styles.expectWeekBadge}>
        <Text style={styles.expectWeekText}>Week {week}</Text>
      </View>
      <Text style={styles.expectIcon}>{icon}</Text>
      <Text style={styles.expectText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { overflow: 'hidden', paddingBottom: 32 },
  heroContent: { paddingHorizontal: 20 },
  backBtn: { position: 'absolute', left: 16, zIndex: 10, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center' },
  customBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.3)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginBottom: 14 },
  customBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  heroIcon: { fontSize: 52, marginBottom: 8 },
  heroTitle: { fontSize: 30, fontWeight: '900', color: '#fff', letterSpacing: -0.5 },
  heroSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.85)', marginTop: 2, marginBottom: 12 },
  heroDesc: { fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 21, marginBottom: 20 },
  heroStats: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: 14 },
  heroStat: { flex: 1, alignItems: 'center' },
  heroStatValue: { fontSize: 16, fontWeight: '800', color: '#fff' },
  heroStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  heroStatDiv: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: 4 },

  tabRow: { flexDirection: 'row', marginHorizontal: 16, marginVertical: 12, backgroundColor: '#F3E5F5', borderRadius: 16, padding: 4 },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 12, alignItems: 'center' },
  tabActive: { backgroundColor: '#fff', shadowColor: '#CE93D8', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  tabText: { fontSize: 12, color: '#9E9E9E', fontWeight: '600' },
  tabTextActive: { color: '#7B1FA2', fontWeight: '700' },

  section: { marginHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#2D1B4E', marginBottom: 8 },

  // Week pills
  weekPill: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, marginRight: 8, minWidth: 64, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  weekPillActive: { backgroundColor: '#7B1FA2' },
  weekPillNum: { fontSize: 14, fontWeight: '800', color: '#2D1B4E' },
  weekPillNumActive: { color: '#fff' },
  weekPillFocus: { fontSize: 9, color: '#9E9E9E', marginTop: 2, maxWidth: 60 },
  weekPillFocusActive: { color: 'rgba(255,255,255,0.8)' },

  // Week detail
  weekHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  weekTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B4E', flex: 1 },
  weekSummary: { fontSize: 13, color: '#777', marginTop: 2, lineHeight: 18 },
  weekKmBadge: { backgroundColor: '#EDE7F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, marginLeft: 8 },
  weekKmText: { fontSize: 13, fontWeight: '800', color: '#7B1FA2' },
  coachNote: { backgroundColor: '#FDF4FF', borderRadius: 12, padding: 12, marginBottom: 12, borderLeftWidth: 3, borderLeftColor: '#CE93D8' },
  coachNoteText: { fontSize: 13, color: '#555', lineHeight: 19, fontStyle: 'italic' },

  // Day cards
  dayCard: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 8, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  dayHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, gap: 8 },
  dayBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  dayBadgeText: { fontSize: 12, fontWeight: '700' },
  dayType: { flex: 1, fontSize: 14, fontWeight: '700', color: '#2D1B4E' },
  zoneBadge: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  zoneBadgeText: { fontSize: 11, fontWeight: '700', color: '#2D1B4E' },
  dayDuration: { fontSize: 13, fontWeight: '700', color: '#9E9E9E' },
  dayDesc: { fontSize: 13, color: '#666', lineHeight: 18 },
  dayDist: { fontSize: 11, color: '#CE93D8', fontWeight: '600', marginTop: 4 },

  // Overview table
  overviewRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, marginBottom: 4 },
  overviewRowActive: { backgroundColor: '#F3E5F5' },
  overviewWeek: { fontSize: 12, fontWeight: '800', color: '#CE93D8', width: 28 },
  overviewFocus: { fontSize: 13, fontWeight: '700', color: '#2D1B4E' },
  overviewSummary: { fontSize: 11, color: '#9E9E9E', marginTop: 1 },
  overviewKm: { fontSize: 13, fontWeight: '700', color: '#7B1FA2' },

  // Why tab
  longDesc: { fontSize: 14, color: '#555', lineHeight: 22, marginBottom: 8 },
  reasonCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  reasonHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  reasonIcon: { fontSize: 22 },
  reasonTitle: { fontSize: 15, fontWeight: '800', color: '#2D1B4E', flex: 1 },
  reasonBody: { fontSize: 13, color: '#555', lineHeight: 20 },
  expectCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F4FF', borderRadius: 14, padding: 14, marginBottom: 8, gap: 10 },
  expectWeekBadge: { backgroundColor: '#EDE7F6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  expectWeekText: { fontSize: 10, fontWeight: '800', color: '#7B1FA2' },
  expectIcon: { fontSize: 20 },
  expectText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 19 },

  // Data tab
  dataSubtitle: { fontSize: 13, color: '#9E9E9E', marginBottom: 14 },
  dataRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  dataIcon: { fontSize: 22, marginRight: 12, width: 30 },
  dataLabel: { fontSize: 14, fontWeight: '600', color: '#2D1B4E' },
  dataNote: { fontSize: 11, color: '#9E9E9E', marginTop: 2 },
  dataValue: { fontSize: 15, fontWeight: '800', color: '#7B1FA2' },
  goalRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  goalIcon: { fontSize: 18 },
  goalText: { fontSize: 14, color: '#2D1B4E', fontWeight: '500' },
  goalInterpret: { backgroundColor: '#F0FDF4', borderRadius: 14, padding: 14, marginTop: 8, borderLeftWidth: 3, borderLeftColor: '#66BB6A' },
  goalInterpretText: { fontSize: 13, color: '#555', lineHeight: 20 },

  // CTA
  ctaContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(253,246,255,0.96)', paddingHorizontal: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0E6FF' },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 18, paddingVertical: 16, overflow: 'hidden', gap: 8 },
  ctaText: { fontSize: 17, fontWeight: '800', color: '#fff' },
});
