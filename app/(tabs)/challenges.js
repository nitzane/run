import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Animated, Dimensions, ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MONTHLY_CHALLENGES, SEASONAL_CHALLENGES, HOLIDAY_CHALLENGES, MILESTONE_CHALLENGES,
  getCurrentMonthChallenge, getCurrentSeasonChallenge, getActiveHolidayChallenges,
  getChallengeProgress,
} from '../../src/data/challenges';
import { COLORS } from '../../src/utils/colors';

const { width } = Dimensions.get('window');

const TABS = ['This Month', 'Seasonal', 'Holidays', 'Milestones'];

export default function ChallengesScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const currentMonth = getCurrentMonthChallenge();
  const currentSeason = getCurrentSeasonChallenge();
  const activeHolidays = getActiveHolidayChallenges();

  const headerScale = scrollY.interpolate({ inputRange: [-60, 0], outputRange: [1.15, 1], extrapolate: 'clamp' });

  return (
    <View style={{ flex: 1, backgroundColor: '#FDF6FF' }}>
      {/* Header */}
      <Animated.View style={[styles.header, { paddingTop: insets.top + 10, transform: [{ scale: headerScale }] }]}>
        <LinearGradient colors={['#CE93D8', '#F48FB1', '#FFB74D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
        <Text style={styles.headerTitle}>Challenges</Text>
        <Text style={styles.headerSub}>Monthly · Seasonal · Holiday · Special</Text>
        {activeHolidays.length > 0 && (
          <View style={styles.liveChip}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>{activeHolidays.length} Holiday Challenge{activeHolidays.length > 1 ? 's' : ''} Active Now!</Text>
          </View>
        )}
      </Animated.View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab, i) => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(i)} style={[styles.tab, activeTab === i && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: 12 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 0 && <MonthlyTab current={currentMonth} all={MONTHLY_CHALLENGES} expandedId={expandedId} setExpandedId={setExpandedId} />}
        {activeTab === 1 && <SeasonalTab current={currentSeason} all={SEASONAL_CHALLENGES} expandedId={expandedId} setExpandedId={setExpandedId} />}
        {activeTab === 2 && <HolidayTab active={activeHolidays} all={HOLIDAY_CHALLENGES} />}
        {activeTab === 3 && <MilestoneTab all={MILESTONE_CHALLENGES} />}
      </Animated.ScrollView>
    </View>
  );
}

// ─── Monthly Tab ─────────────────────────────────────────────────────────────
function MonthlyTab({ current, all, expandedId, setExpandedId }) {
  if (!current) return null;
  const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <View>
      {/* Hero: current month */}
      <ChallengeHero challenge={current} label="This Month" />

      {/* Task list */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tasks to Complete</Text>
        {current.tasks.map((task, i) => (
          <TaskRow key={task.id} task={task} index={i} completed={false} />
        ))}
      </View>

      {/* All months */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Monthly Challenges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingLeft: 16 }}>
          {all.map(c => (
            <MonthCard key={c.id} challenge={c} isCurrent={c.id === current.id} monthName={MONTH_NAMES[c.month]} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

// ─── Seasonal Tab ─────────────────────────────────────────────────────────────
function SeasonalTab({ current, all, expandedId, setExpandedId }) {
  return (
    <View>
      {current && <ChallengeHero challenge={current} label="Current Season" />}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Four Seasons</Text>
        {all.map(s => <SeasonCard key={s.id} challenge={s} isCurrent={current?.id === s.id} />)}
      </View>
    </View>
  );
}

// ─── Holiday Tab ─────────────────────────────────────────────────────────────
function HolidayTab({ active, all }) {
  return (
    <View>
      {active.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔴 Live Now</Text>
          {active.map(h => <HolidayCard key={h.id} challenge={h} isActive />)}
        </View>
      )}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Holiday Challenges</Text>
        {all.map(h => <HolidayCard key={h.id} challenge={h} isActive={active.some(a => a.id === h.id)} />)}
      </View>
    </View>
  );
}

// ─── Milestone Tab ────────────────────────────────────────────────────────────
function MilestoneTab({ all }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Legendary Milestones</Text>
      <Text style={styles.sectionSubtitle}>The biggest, rarest challenges in the app</Text>
      {all.map(m => (
        <View key={m.id} style={styles.milestoneCard}>
          <LinearGradient colors={m.gradient} style={styles.milestoneGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
          <View style={styles.milestoneInner}>
            <Text style={styles.milestoneEmoji}>{m.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.milestoneTitle}>{m.title}</Text>
              <Text style={styles.milestoneSub}>{m.subtitle}</Text>
              <Text style={styles.milestoneVibe} numberOfLines={3}>{m.vibe}</Text>
            </View>
          </View>
          <View style={styles.milestoneBadgeRow}>
            <View style={styles.xpPill}>
              <Text style={styles.xpText}>🏆 {m.badge.xp.toLocaleString()} XP · {m.badge.rarity}</Text>
            </View>
            <Text style={styles.badgeIcon}>{m.badge.icon}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function ChallengeHero({ challenge, label }) {
  const progress = getChallengeProgress(challenge, []);
  return (
    <View style={styles.heroCard}>
      <LinearGradient colors={challenge.gradient} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
      <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>{label}</Text></View>
      <Text style={styles.heroEmoji}>{challenge.emoji}</Text>
      <Text style={styles.heroTitle}>{challenge.title}</Text>
      <Text style={styles.heroSub}>{challenge.subtitle}</Text>
      <Text style={styles.heroVibe}>{challenge.vibe}</Text>
      <View style={styles.heroProgressBar}>
        <View style={[styles.heroProgressFill, { width: `${progress.percent * 100}%` }]} />
      </View>
      <Text style={styles.heroProgressText}>{progress.completed}/{progress.total} tasks · {challenge.badge.xp} XP reward</Text>
      {challenge.quote && <Text style={styles.heroQuote}>{challenge.quote}</Text>}
    </View>
  );
}

function TaskRow({ task, index, completed }) {
  return (
    <View style={[styles.taskRow, completed && styles.taskRowDone]}>
      <View style={[styles.taskCheck, completed && styles.taskCheckDone]}>
        {completed ? <Ionicons name="checkmark" size={14} color="#fff" /> : <Text style={styles.taskNum}>{index + 1}</Text>}
      </View>
      <Text style={styles.taskIcon}>{task.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={[styles.taskLabel, completed && styles.taskLabelDone]}>{task.label}</Text>
      </View>
      <View style={styles.taskXP}>
        <Text style={styles.taskXPText}>+{task.xp}</Text>
      </View>
    </View>
  );
}

function MonthCard({ challenge, isCurrent, monthName }) {
  return (
    <View style={[styles.monthCard, isCurrent && styles.monthCardActive]}>
      <LinearGradient colors={challenge.gradient} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
      {isCurrent && <View style={styles.nowBadge}><Text style={styles.nowText}>NOW</Text></View>}
      <Text style={styles.monthEmoji}>{challenge.emoji}</Text>
      <Text style={styles.monthName}>{monthName}</Text>
      <Text style={styles.monthTitle}>{challenge.title}</Text>
      <Text style={styles.monthTheme}>{challenge.theme}</Text>
    </View>
  );
}

function SeasonCard({ challenge, isCurrent }) {
  return (
    <View style={[styles.seasonCard, isCurrent && { borderWidth: 2, borderColor: challenge.color || '#CE93D8' }]}>
      <LinearGradient colors={challenge.gradient} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
      {isCurrent && <View style={styles.nowBadge}><Text style={styles.nowText}>ACTIVE</Text></View>}
      <View style={styles.seasonHeader}>
        <Text style={styles.seasonEmoji}>{challenge.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.seasonTitle}>{challenge.title}</Text>
          <Text style={styles.seasonSub}>{challenge.subtitle}</Text>
        </View>
        <Text style={styles.seasonXP}>✨ {challenge.badge.xp.toLocaleString()} XP</Text>
      </View>
      <Text style={styles.seasonVibe} numberOfLines={3}>{challenge.vibe}</Text>
      <View style={styles.seasonTasks}>
        {challenge.tasks.map((t, i) => (
          <View key={t.id} style={styles.seasonTaskRow}>
            <Text style={styles.seasonTaskIcon}>{t.icon}</Text>
            <Text style={styles.seasonTaskLabel} numberOfLines={1}>{t.label}</Text>
            <Text style={styles.seasonTaskXP}>+{t.xp}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function HolidayCard({ challenge, isActive }) {
  return (
    <View style={[styles.holidayCard, isActive && styles.holidayCardActive]}>
      <LinearGradient colors={challenge.gradient || ['#FCE4EC', '#F48FB1']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
      <View style={styles.holidayHeader}>
        <Text style={styles.holidayEmoji}>{challenge.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.holidayTitle}>{challenge.title}</Text>
          <Text style={styles.holidaySub}>{challenge.subtitle}</Text>
        </View>
        {isActive && (
          <View style={styles.activePill}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Live</Text>
          </View>
        )}
      </View>
      <Text style={styles.holidayTask}>{challenge.task}</Text>
      <View style={styles.holidayFooter}>
        <Text style={styles.holidayBadge}>{challenge.badge.icon} {challenge.badge.title}</Text>
        <View style={styles.xpSmall}><Text style={styles.xpSmallText}>+{challenge.xp} XP</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingBottom: 20, overflow: 'hidden' },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  liveChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, marginTop: 10 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF1744', marginRight: 6 },
  liveText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  tabRow: { flexDirection: 'row', backgroundColor: '#fff', paddingHorizontal: 12, paddingTop: 8, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: '#F0E6FF' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 10 },
  tabActive: { backgroundColor: '#F3E5F5' },
  tabText: { fontSize: 11, color: '#9E9E9E', fontWeight: '600' },
  tabTextActive: { color: '#7B1FA2', fontWeight: '700' },
  section: { marginHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#2D1B4E', marginBottom: 4 },
  sectionSubtitle: { fontSize: 13, color: '#9E9E9E', marginBottom: 12 },

  // Hero
  heroCard: { marginHorizontal: 16, marginBottom: 24, borderRadius: 24, padding: 24, overflow: 'hidden', shadowColor: '#CE93D8', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 12 },
  heroBadge: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.35)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  heroBadgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  heroEmoji: { fontSize: 48, marginBottom: 8 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 2, marginBottom: 12 },
  heroVibe: { fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 21, marginBottom: 16 },
  heroProgressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 3, marginBottom: 6 },
  heroProgressFill: { height: 6, backgroundColor: '#fff', borderRadius: 3 },
  heroProgressText: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  heroQuote: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginTop: 4 },

  // Task rows
  taskRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  taskRowDone: { backgroundColor: '#F0FDF4' },
  taskCheck: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#F3E5F5', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  taskCheckDone: { backgroundColor: '#4CAF50' },
  taskNum: { fontSize: 12, fontWeight: '700', color: '#7B1FA2' },
  taskIcon: { fontSize: 20, marginRight: 10 },
  taskLabel: { fontSize: 14, color: '#2D1B4E', fontWeight: '500', lineHeight: 20 },
  taskLabelDone: { textDecorationLine: 'line-through', color: '#9E9E9E' },
  taskXP: { backgroundColor: '#F3E5F5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  taskXPText: { fontSize: 11, fontWeight: '700', color: '#7B1FA2' },

  // Month cards
  monthCard: { width: 140, borderRadius: 18, padding: 16, marginRight: 10, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, height: 160 },
  monthCardActive: { shadowOpacity: 0.25 },
  nowBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#FF4081', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  nowText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  monthEmoji: { fontSize: 30, marginBottom: 8 },
  monthName: { fontSize: 11, color: 'rgba(0,0,0,0.5)', fontWeight: '600' },
  monthTitle: { fontSize: 14, fontWeight: '800', color: '#2D1B4E', marginTop: 2 },
  monthTheme: { fontSize: 11, color: 'rgba(0,0,0,0.5)', marginTop: 2 },

  // Seasons
  seasonCard: { borderRadius: 20, padding: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  seasonHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  seasonEmoji: { fontSize: 36, marginRight: 12 },
  seasonTitle: { fontSize: 18, fontWeight: '800', color: '#2D1B4E' },
  seasonSub: { fontSize: 12, color: '#9E9E9E' },
  seasonXP: { fontSize: 12, fontWeight: '700', color: '#7B1FA2' },
  seasonVibe: { fontSize: 13, color: '#555', lineHeight: 19, marginBottom: 14 },
  seasonTasks: { gap: 6 },
  seasonTaskRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 10, padding: 8 },
  seasonTaskIcon: { fontSize: 16, marginRight: 8 },
  seasonTaskLabel: { flex: 1, fontSize: 13, color: '#2D1B4E' },
  seasonTaskXP: { fontSize: 11, fontWeight: '700', color: '#7B1FA2' },

  // Holidays
  holidayCard: { borderRadius: 18, padding: 18, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  holidayCardActive: { shadowOpacity: 0.2, shadowColor: '#FF4081' },
  holidayHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  holidayEmoji: { fontSize: 32, marginRight: 12 },
  holidayTitle: { fontSize: 16, fontWeight: '800', color: '#2D1B4E' },
  holidaySub: { fontSize: 12, color: '#9E9E9E' },
  activePill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF4081', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginRight: 4 },
  activeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  holidayTask: { fontSize: 13, color: '#555', lineHeight: 19, marginBottom: 10 },
  holidayFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  holidayBadge: { fontSize: 13, fontWeight: '600', color: '#7B1FA2' },
  xpSmall: { backgroundColor: '#EDE7F6', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  xpSmallText: { fontSize: 11, fontWeight: '700', color: '#7B1FA2' },

  // Milestones
  milestoneCard: { borderRadius: 20, padding: 20, marginBottom: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.1, shadowRadius: 14, elevation: 6 },
  milestoneGrad: { ...StyleSheet.absoluteFillObject },
  milestoneInner: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  milestoneEmoji: { fontSize: 42, marginRight: 14 },
  milestoneTitle: { fontSize: 20, fontWeight: '800', color: '#2D1B4E' },
  milestoneSub: { fontSize: 13, color: '#9E9E9E', marginTop: 2 },
  milestoneVibe: { fontSize: 13, color: '#555', lineHeight: 19, marginTop: 6 },
  milestoneBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  xpPill: { backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 12 },
  xpText: { fontSize: 12, fontWeight: '700', color: '#7B1FA2' },
  badgeIcon: { fontSize: 28 },
});
