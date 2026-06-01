import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Dimensions, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  computeAllStats, generateInsights, generateWeeklyReport,
  getPaceChartData, getDistanceChartData, getHRChartData, getWeeklyVolumeData,
  formatPace, formatDuration, ZONE_LABELS,
} from '../../src/utils/statsEngine';
import { useApp } from '../../src/context/AppContext';

const { width } = Dimensions.get('window');
const CHART_W = width - 48;
const CHART_H = 120;
const TABS = ['Overview', 'Pace', 'Heart Rate', 'Zones', 'Insights'];

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { runs, trainingDays } = useApp();

  const stats = computeAllStats(runs, { trainingDays });
  const insights = generateInsights(stats);
  const weekReport = generateWeeklyReport(stats);

  const headerBg = scrollY.interpolate({ inputRange: [0, 80], outputRange: ['rgba(253,246,255,0)', 'rgba(253,246,255,1)'], extrapolate: 'clamp' });

  return (
    <View style={{ flex: 1, backgroundColor: '#FDF6FF' }}>
      {/* Sticky header */}
      <Animated.View style={[styles.stickyHeader, { paddingTop: insets.top, backgroundColor: headerBg }]}>
        <Text style={styles.screenTitle}>Stats & Insights</Text>
      </Animated.View>

      {/* Tabs */}
      <View style={[styles.tabRow, { marginTop: insets.top + 48 }]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {TABS.map((t, i) => (
            <TouchableOpacity key={t} onPress={() => setTab(i)} style={[styles.tab, tab === i && styles.tabActive]}>
              <Text style={[styles.tabText, tab === i && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: 12 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        showsVerticalScrollIndicator={false}
      >
        {tab === 0 && <OverviewTab stats={stats} weekReport={weekReport} />}
        {tab === 1 && <PaceTab stats={stats} runs={runs} />}
        {tab === 2 && <HeartRateTab stats={stats} runs={runs} />}
        {tab === 3 && <ZonesTab stats={stats} />}
        {tab === 4 && <InsightsTab insights={insights} stats={stats} />}
      </Animated.ScrollView>
    </View>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ stats, weekReport }) {
  if (!stats) return null;
  return (
    <View>
      {/* Weekly report card */}
      {weekReport && (
        <View style={styles.weekCard}>
          <LinearGradient colors={['#CE93D8', '#F48FB1']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
          <Text style={styles.weekHeadline}>{weekReport.headline}</Text>
          <Text style={styles.weekSummary}>{weekReport.summary}</Text>
          <Text style={styles.weekVerdict}>{weekReport.verdict}</Text>
          {weekReport.streakNote && <View style={styles.streakNote}><Text style={styles.streakNoteText}>{weekReport.streakNote}</Text></View>}
          <Text style={styles.weekZone}>{weekReport.zoneNote}</Text>
        </View>
      )}

      {/* Big numbers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All-Time</Text>
        <View style={styles.bigNumGrid}>
          <BigNum value={stats.totalRuns} label="Total Runs" icon="🏃‍♀️" color="#CE93D8" />
          <BigNum value={`${stats.totalDistanceKm.toFixed(0)}km`} label="Total Distance" icon="📏" color="#F48FB1" />
          <BigNum value={`${Math.floor(stats.totalDurationMin / 60)}h`} label="Time Running" icon="⏱️" color="#FFB74D" />
          <BigNum value={stats.totalCalories.toLocaleString()} label="Calories" icon="🔥" color="#EF5350" />
        </View>
      </View>

      {/* This month vs last */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Month-over-Month</Text>
        <View style={styles.momRow}>
          <MonthCompareCard label="This Month" runs={stats.thisMonth.runs} dist={stats.thisMonth.distanceKm} />
          <View style={styles.momArrow}>
            <Text style={[styles.momDelta, { color: stats.monthOverMonth >= 0 ? '#4CAF50' : '#EF5350' }]}>
              {stats.monthOverMonth >= 0 ? '↑' : '↓'} {Math.abs(stats.monthOverMonth).toFixed(1)}km
            </Text>
          </View>
          <MonthCompareCard label="Last Month" runs={stats.lastMonth.runs} dist={stats.lastMonth.distanceKm} faded />
        </View>
      </View>

      {/* Weekly volume mini-chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Volume (last 8 weeks)</Text>
        <WeeklyBarChart data={stats.weeklyHistory} />
      </View>

      {/* Key metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Markers</Text>
        <MetricRow icon="⚡" label="Best Pace" value={`${formatPace(stats.bestPace)}/km`} sub="All-time" positive />
        <MetricRow icon="📏" label="Longest Run" value={`${stats.longestRun.toFixed(1)}km`} sub="Single effort" positive />
        <MetricRow icon="📈" label="Pace Improvement" value={stats.paceImprovement > 0 ? `−${formatPace(stats.paceImprovement)}/km` : '—'} sub="Start vs. recent" positive={stats.paceImprovement > 0} />
        <MetricRow icon="❤️" label="Avg HR (last 30d)" value={`${Math.round(stats.avgHRLast30)} bpm`} sub={stats.hrTrend > 0 ? `↓${stats.hrTrend.toFixed(0)} bpm vs prev month` : ''} positive={stats.hrTrend > 0} />
        <MetricRow icon="🔥" label="Current Streak" value={`${stats.currentStreak} days`} sub={`Best: ${stats.longestStreak} days`} positive={stats.currentStreak > 0} />
        <MetricRow icon="🎯" label="Consistency Score" value={`${stats.consistency}/100`} sub={stats.consistency >= 70 ? 'Excellent' : stats.consistency >= 40 ? 'Building' : 'Needs work'} positive={stats.consistency >= 60} />
      </View>

      {/* Training load */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Training Load</Text>
        <TrainingLoadCard atl={stats.atl} ctl={stats.ctl} tsb={stats.tsb} />
      </View>
    </View>
  );
}

// ─── Pace Tab ─────────────────────────────────────────────────────────────────
function PaceTab({ stats, runs }) {
  const data = getPaceChartData(runs, 10);
  const maxPace = Math.max(...data.map(d => d.value));
  const minPace = Math.min(...data.map(d => d.value));
  const range = maxPace - minPace || 1;

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pace Trend</Text>
        <Text style={styles.chartCaption}>Last 10 runs · lower = faster</Text>
        <View style={styles.chartContainer}>
          {/* Y-axis labels */}
          <View style={styles.yAxis}>
            <Text style={styles.yLabel}>{formatPace(minPace)}</Text>
            <Text style={styles.yLabel}>{formatPace((minPace + maxPace) / 2)}</Text>
            <Text style={styles.yLabel}>{formatPace(maxPace)}</Text>
          </View>
          {/* Bars — inverted for pace (lower = better = taller bar) */}
          <View style={styles.bars}>
            {data.map((d, i) => {
              const h = ((maxPace - d.value) / range) * CHART_H + 20;
              const isLatest = i === data.length - 1;
              return (
                <View key={i} style={styles.barCol}>
                  <Text style={styles.barValue}>{formatPace(d.value)}</Text>
                  <View style={[styles.bar, { height: h, backgroundColor: isLatest ? '#CE93D8' : '#F3E5F5' }]} />
                  <Text style={styles.barLabel}>{d.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.trendNote}>
          <Text style={styles.trendIcon}>{stats.paceImprovement > 10 ? '✅' : stats.paceImprovement > 0 ? '📈' : '➡️'}</Text>
          <Text style={styles.trendText}>
            {stats.paceImprovement > 10
              ? `You've improved by ${formatPace(stats.paceImprovement)}/km since you started. Real progress.`
              : stats.paceImprovement > 0
              ? 'Slight improvement — consistency will accelerate this.'
              : 'Pace is holding steady. More Zone 2 running will unlock more speed.'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pace Breakdown</Text>
        <PaceStatRow label="Best pace ever" value={formatPace(stats.bestPace)} color="#CE93D8" />
        <PaceStatRow label="Average pace" value={formatPace(stats.avgPace)} color="#F48FB1" />
        <PaceStatRow label="Zone 2 target" value="6:00–7:00" color="#A5D6A7" />
        <PaceStatRow label="Tempo target" value="5:00–5:30" color="#FFCC80" />
      </View>
    </View>
  );
}

// ─── Heart Rate Tab ───────────────────────────────────────────────────────────
function HeartRateTab({ stats, runs }) {
  const data = getHRChartData(runs, 10);
  const maxHR = Math.max(...data.map(d => d.value));
  const minHR = Math.min(...data.map(d => d.value));
  const range = maxHR - minHR || 1;

  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heart Rate Trend</Text>
        <Text style={styles.chartCaption}>Last 10 runs · lower avg HR = fitter heart</Text>
        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            <Text style={styles.yLabel}>{minHR}</Text>
            <Text style={styles.yLabel}>{Math.round((minHR + maxHR) / 2)}</Text>
            <Text style={styles.yLabel}>{maxHR}</Text>
          </View>
          <View style={styles.bars}>
            {data.map((d, i) => {
              const h = ((d.value - minHR) / range) * CHART_H + 20;
              const isLatest = i === data.length - 1;
              return (
                <View key={i} style={styles.barCol}>
                  <Text style={styles.barValue}>{d.value}</Text>
                  <View style={[styles.bar, { height: h, backgroundColor: isLatest ? '#F48FB1' : '#FCE4EC' }]} />
                  <Text style={styles.barLabel}>{d.label}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.trendNote}>
          <Text style={styles.trendIcon}>{stats.hrTrend > 2 ? '✅' : stats.hrTrend < -2 ? '⚠️' : '➡️'}</Text>
          <Text style={styles.trendText}>
            {stats.hrTrend > 2
              ? `Your average HR dropped ${stats.hrTrend.toFixed(0)} BPM this month vs last — your heart is getting stronger.`
              : stats.hrTrend < -2
              ? `HR is trending up — consider extra recovery. Fatigue or heat can cause this.`
              : `HR is stable. As your fitness grows, you'll see it naturally decline.`}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Heart Rate Zones Explained</Text>
        {[1, 2, 3, 4, 5].map(z => (
          <View key={z} style={styles.zoneExplainRow}>
            <View style={[styles.zoneColorDot, { backgroundColor: ZONE_LABELS[z].color }]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.zoneExplainName}>Zone {z} — {ZONE_LABELS[z].name} {ZONE_LABELS[z].emoji}</Text>
              <Text style={styles.zoneExplainDesc}>{ZONE_DESCRIPTIONS[z]}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Zones Tab ────────────────────────────────────────────────────────────────
function ZonesTab({ stats }) {
  const zones = stats.zoneDistribution;
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time in Each Zone</Text>
        <Text style={styles.chartCaption}>All-time average across all runs</Text>
        {[1, 2, 3, 4, 5].map(z => {
          const pct = zones[z] || 0;
          return (
            <View key={z} style={styles.zoneBarRow}>
              <Text style={styles.zoneBarLabel}>Z{z}</Text>
              <View style={styles.zoneBarTrack}>
                <Animated.View style={[styles.zoneBarFill, { width: `${pct}%`, backgroundColor: ZONE_LABELS[z].color }]} />
              </View>
              <Text style={styles.zoneBarPct}>{pct.toFixed(0)}%</Text>
            </View>
          );
        })}
      </View>

      {/* Zone interpretation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What This Means</Text>
        <ZoneInterpretCard zones={zones} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ideal Zone Distribution</Text>
        <Text style={styles.idealDesc}>For most endurance runners, the optimal split is:</Text>
        {IDEAL_ZONES.map(iz => (
          <View key={iz.zone} style={styles.idealRow}>
            <View style={[styles.zoneColorDot, { backgroundColor: ZONE_LABELS[iz.zone].color }]} />
            <Text style={styles.idealLabel}>Zone {iz.zone} ({ZONE_LABELS[iz.zone].name})</Text>
            <Text style={styles.idealRange}>{iz.range}</Text>
            <Text style={styles.idealNote}>{iz.note}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Insights Tab ─────────────────────────────────────────────────────────────
function InsightsTab({ insights, stats }) {
  return (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personalised Insights</Text>
        <Text style={styles.insightSubtitle}>Based on your actual running data</Text>
        {insights.map(insight => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aerobic Efficiency</Text>
        <AerobicEfficiencyCard stats={stats} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Training Load Explained</Text>
        <View style={styles.explainCard}>
          <Text style={styles.explainTitle}>🏋️ Acute Load (ATL) — {stats.atl.toFixed(1)} km/wk</Text>
          <Text style={styles.explainBody}>What you've done in the last 7 days. Your current "tiredness" signal.</Text>
          <Text style={styles.explainTitle} style={{ marginTop: 12 }}>📈 Chronic Load (CTL) — {stats.ctl.toFixed(1)} km/wk</Text>
          <Text style={styles.explainBody}>Your rolling 4-week average. Your "fitness" baseline.</Text>
          <Text style={styles.explainTitle} style={{ marginTop: 12 }}>⚖️ Training Stress Balance (TSB) — {stats.tsb.toFixed(1)}</Text>
          <Text style={styles.explainBody}>
            {stats.tsb > 5
              ? '✅ Positive: You\'re fresh and ready to perform. Great time for a hard effort or race.'
              : stats.tsb < -10
              ? '⚠️ Negative: Carrying fatigue. Normal during build phases — but watch for injury signals.'
              : '➡️ Neutral: Well balanced. Maintain current load for stable progress.'}
          </Text>
        </View>
      </View>
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BigNum({ value, label, icon, color }) {
  return (
    <View style={[styles.bigNumCard, { borderColor: color + '40' }]}>
      <Text style={styles.bigNumIcon}>{icon}</Text>
      <Text style={[styles.bigNumValue, { color }]}>{value}</Text>
      <Text style={styles.bigNumLabel}>{label}</Text>
    </View>
  );
}

function MonthCompareCard({ label, runs, dist, faded }) {
  return (
    <View style={[styles.momCard, faded && { opacity: 0.55 }]}>
      <Text style={styles.momLabel}>{label}</Text>
      <Text style={styles.momDist}>{dist.toFixed(1)}<Text style={styles.momUnit}>km</Text></Text>
      <Text style={styles.momRuns}>{runs} run{runs !== 1 ? 's' : ''}</Text>
    </View>
  );
}

function MetricRow({ icon, label, value, sub, positive }) {
  return (
    <View style={styles.metricRow}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.metricLabel}>{label}</Text>
        {sub ? <Text style={[styles.metricSub, positive && { color: '#4CAF50' }]}>{sub}</Text> : null}
      </View>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function WeeklyBarChart({ data }) {
  if (!data || !data.length) return null;
  const maxDist = Math.max(...data.map(d => d.distanceKm), 1);
  return (
    <View style={styles.weeklyChart}>
      {data.map((d, i) => {
        const h = (d.distanceKm / maxDist) * 90 + 4;
        const isThis = i === data.length - 1;
        return (
          <View key={i} style={styles.barCol}>
            <Text style={styles.barValue}>{d.distanceKm > 0 ? d.distanceKm.toFixed(0) : ''}</Text>
            <View style={[styles.weekBar, { height: h, backgroundColor: isThis ? '#CE93D8' : '#F3E5F5' }]} />
            <Text style={styles.barLabel}>{d.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

function TrainingLoadCard({ atl, ctl, tsb }) {
  const status = tsb > 5 ? { label: 'Race Ready', color: '#4CAF50', icon: '🚀' }
    : tsb < -10 ? { label: 'Carrying Fatigue', color: '#FF7043', icon: '🛌' }
    : { label: 'Balanced', color: '#FFB74D', icon: '⚖️' };
  return (
    <View style={styles.loadCard}>
      <LinearGradient colors={['#F3E5F5', '#FCE4EC']} style={StyleSheet.absoluteFill} />
      <View style={styles.loadRow}>
        <LoadPill label="Acute Load" value={`${atl.toFixed(1)}km`} sub="Last 7 days" color="#CE93D8" />
        <LoadPill label="Chronic Load" value={`${ctl.toFixed(1)}km`} sub="4-week avg" color="#F48FB1" />
        <LoadPill label="Balance" value={tsb > 0 ? `+${tsb.toFixed(0)}` : tsb.toFixed(0)} sub={status.label} color={status.color} />
      </View>
      <View style={styles.loadStatus}>
        <Text style={styles.loadStatusIcon}>{status.icon}</Text>
        <Text style={[styles.loadStatusLabel, { color: status.color }]}>{status.label}</Text>
      </View>
    </View>
  );
}

function LoadPill({ label, value, sub, color }) {
  return (
    <View style={styles.loadPill}>
      <Text style={styles.loadPillLabel}>{label}</Text>
      <Text style={[styles.loadPillValue, { color }]}>{value}</Text>
      <Text style={styles.loadPillSub}>{sub}</Text>
    </View>
  );
}

function PaceStatRow({ label, value, color }) {
  return (
    <View style={styles.paceStatRow}>
      <View style={[styles.paceStatDot, { backgroundColor: color }]} />
      <Text style={styles.paceStatLabel}>{label}</Text>
      <Text style={styles.paceStatValue}>{value}/km</Text>
    </View>
  );
}

function ZoneInterpretCard({ zones }) {
  const z2 = zones[2] || 0;
  const z3plus = (zones[3] || 0) + (zones[4] || 0) + (zones[5] || 0);
  const interpretation = z2 >= 65
    ? { icon: '🏆', headline: 'Textbook aerobic training', body: `${z2.toFixed(0)}% Zone 2 is elite-level discipline. Your mitochondrial density, fat oxidation, and cardiac efficiency are all improving every session. This is exactly how champions are built.` }
    : z2 >= 50
    ? { icon: '✅', headline: 'Good aerobic foundation', body: `${z2.toFixed(0)}% in Zone 2 is solid. Pushing this above 65% will unlock faster easy paces and better race performance. Your easy runs might just be a little too fast.` }
    : { icon: '💡', headline: 'Running too hard too often', body: `Only ${z2.toFixed(0)}% in Zone 2 suggests most of your running is in the "grey zone" — not hard enough to build speed, but too hard to build aerobic base efficiently. Slow down on easy days.` };

  return (
    <View style={styles.interpretCard}>
      <LinearGradient colors={['#E8F5E9', '#F1F8E9']} style={StyleSheet.absoluteFill} />
      <Text style={styles.interpretIcon}>{interpretation.icon}</Text>
      <Text style={styles.interpretHeadline}>{interpretation.headline}</Text>
      <Text style={styles.interpretBody}>{interpretation.body}</Text>
    </View>
  );
}

function InsightCard({ insight }) {
  const bgMap = { positive: '#F0FDF4', warning: '#FFF8F0', tip: '#F0F4FF' };
  const borderMap = { positive: '#86EFAC', warning: '#FDC36A', tip: '#93C5FD' };
  return (
    <View style={[styles.insightCard, { backgroundColor: bgMap[insight.type], borderColor: borderMap[insight.type] }]}>
      <View style={styles.insightHeader}>
        <Text style={styles.insightIcon}>{insight.icon}</Text>
        <Text style={styles.insightTitle}>{insight.title}</Text>
      </View>
      <Text style={styles.insightBody}>{insight.body}</Text>
    </View>
  );
}

function AerobicEfficiencyCard({ stats }) {
  return (
    <View style={styles.explainCard}>
      <Text style={styles.explainBody}>
        Aerobic efficiency is measured as your pace-to-heart-rate ratio — the lower, the more efficient. As you get fitter, you run the same pace with a lower heart rate (or faster with the same HR).
      </Text>
      {stats.aerobicTrend ? (
        <View style={styles.aeTrend}>
          <Text style={[styles.aeTrendValue, { color: stats.aerobicTrend.delta < 0 ? '#4CAF50' : '#EF5350' }]}>
            {stats.aerobicTrend.delta < 0 ? '✅ Improving' : '⚠️ Declining'}
          </Text>
          <Text style={styles.aeTrendSub}>
            {stats.aerobicTrend.delta < 0
              ? `Your heart works less for the same pace over the last ${stats.aerobicTrend.weeks} weeks. Pure adaptation.`
              : `Your HR is trending up for similar paces. Recovery or easy running recommended.`}
          </Text>
        </View>
      ) : (
        <Text style={styles.explainBody}>Complete more runs to see your aerobic efficiency trend.</Text>
      )}
    </View>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ZONE_DESCRIPTIONS = {
  1: 'Very easy. Active recovery. Walk/jog pace. Feels effortless — you could sing.',
  2: 'Comfortable aerobic effort. Conversational but slightly focused. The FAT-BURNING zone. Where 70% of your training should live.',
  3: 'Moderate effort. Tempo/marathon pace. Sustainable but not comfortable. Talking in short sentences.',
  4: 'Hard. Threshold effort. You can hold it for 20–40 minutes max. Speaking is difficult.',
  5: 'Maximum. All-out sprinting. Not sustainable beyond 1–3 minutes. Pure anaerobic power.',
};

const IDEAL_ZONES = [
  { zone: 1, range: '10–15%', note: 'Active recovery runs' },
  { zone: 2, range: '65–75%', note: 'All easy runs stay here' },
  { zone: 3, range: '5–10%', note: 'Tempo efforts only' },
  { zone: 4, range: '5–8%', note: 'Threshold intervals' },
  { zone: 5, range: '2–5%', note: 'Sprint/VO2 max sessions' },
];

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  stickyHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, paddingHorizontal: 20, paddingBottom: 12 },
  screenTitle: { fontSize: 28, fontWeight: '800', color: '#2D1B4E', marginTop: 8 },
  tabRow: { marginBottom: 4 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 6 },
  tabActive: { backgroundColor: '#EDE7F6' },
  tabText: { fontSize: 13, color: '#9E9E9E', fontWeight: '600' },
  tabTextActive: { color: '#7B1FA2', fontWeight: '700' },
  section: { marginHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#2D1B4E', marginBottom: 4 },
  chartCaption: { fontSize: 12, color: '#9E9E9E', marginBottom: 12 },

  // Week card
  weekCard: { marginHorizontal: 16, marginBottom: 24, borderRadius: 24, padding: 22, overflow: 'hidden', shadowColor: '#CE93D8', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  weekHeadline: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  weekSummary: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 10 },
  weekVerdict: { fontSize: 15, color: '#fff', lineHeight: 22, fontWeight: '500' },
  streakNote: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, alignSelf: 'flex-start', marginVertical: 8 },
  streakNoteText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  weekZone: { fontSize: 13, color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', marginTop: 4 },

  // Big numbers
  bigNumGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  bigNumCard: { width: (width - 52) / 2, backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1.5, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  bigNumIcon: { fontSize: 26, marginBottom: 6 },
  bigNumValue: { fontSize: 28, fontWeight: '800', letterSpacing: -1 },
  bigNumLabel: { fontSize: 12, color: '#9E9E9E', fontWeight: '600', marginTop: 2 },

  // Month compare
  momRow: { flexDirection: 'row', alignItems: 'center' },
  momCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  momLabel: { fontSize: 11, color: '#9E9E9E', fontWeight: '600', marginBottom: 4 },
  momDist: { fontSize: 30, fontWeight: '800', color: '#2D1B4E' },
  momUnit: { fontSize: 14, fontWeight: '600', color: '#9E9E9E' },
  momRuns: { fontSize: 12, color: '#9E9E9E' },
  momArrow: { alignItems: 'center', paddingHorizontal: 10 },
  momDelta: { fontSize: 16, fontWeight: '800' },

  // Charts
  chartContainer: { flexDirection: 'row', height: CHART_H + 60 },
  yAxis: { width: 40, justifyContent: 'space-between', paddingBottom: 20, paddingTop: 16 },
  yLabel: { fontSize: 9, color: '#BDBDBD', textAlign: 'right' },
  bars: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 20 },
  barCol: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
  bar: { width: '65%', borderRadius: 6, marginBottom: 4 },
  weekBar: { width: '70%', borderRadius: 6, marginBottom: 4 },
  barValue: { fontSize: 8, color: '#9E9E9E', marginBottom: 2 },
  barLabel: { fontSize: 8, color: '#BDBDBD' },
  weeklyChart: { flexDirection: 'row', alignItems: 'flex-end', height: 130, backgroundColor: '#F9F4FF', borderRadius: 16, padding: 10 },

  // Trend note
  trendNote: { flexDirection: 'row', backgroundColor: '#F9F4FF', borderRadius: 14, padding: 14, marginTop: 8, gap: 8 },
  trendIcon: { fontSize: 20 },
  trendText: { flex: 1, fontSize: 13, color: '#555', lineHeight: 19 },

  // Metric rows
  metricRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  metricIcon: { fontSize: 22, marginRight: 12, width: 30 },
  metricLabel: { fontSize: 14, fontWeight: '600', color: '#2D1B4E' },
  metricSub: { fontSize: 11, color: '#9E9E9E', marginTop: 1 },
  metricValue: { fontSize: 15, fontWeight: '800', color: '#7B1FA2' },

  // Training load
  loadCard: { borderRadius: 20, padding: 18, overflow: 'hidden', shadowColor: '#CE93D8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 5 },
  loadRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  loadPill: { alignItems: 'center' },
  loadPillLabel: { fontSize: 10, color: '#9E9E9E', fontWeight: '600' },
  loadPillValue: { fontSize: 22, fontWeight: '800', marginVertical: 2 },
  loadPillSub: { fontSize: 10, color: '#9E9E9E' },
  loadStatus: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 12, padding: 8 },
  loadStatusIcon: { fontSize: 18 },
  loadStatusLabel: { fontSize: 14, fontWeight: '700' },

  // Pace stats
  paceStatRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F0E6FF' },
  paceStatDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  paceStatLabel: { flex: 1, fontSize: 14, color: '#555', fontWeight: '500' },
  paceStatValue: { fontSize: 16, fontWeight: '800', color: '#2D1B4E' },

  // Zone bars
  zoneBarRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  zoneBarLabel: { fontSize: 12, fontWeight: '700', color: '#7B1FA2', width: 24 },
  zoneBarTrack: { flex: 1, height: 20, backgroundColor: '#F3E5F5', borderRadius: 10, marginHorizontal: 8, overflow: 'hidden' },
  zoneBarFill: { height: 20, borderRadius: 10 },
  zoneBarPct: { fontSize: 13, fontWeight: '700', color: '#2D1B4E', width: 35, textAlign: 'right' },

  // Zone explain
  zoneExplainRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  zoneColorDot: { width: 14, height: 14, borderRadius: 7, marginRight: 12, marginTop: 3 },
  zoneExplainName: { fontSize: 14, fontWeight: '700', color: '#2D1B4E', marginBottom: 2 },
  zoneExplainDesc: { fontSize: 13, color: '#777', lineHeight: 19 },

  // Ideal zones
  idealDesc: { fontSize: 13, color: '#777', marginBottom: 12, lineHeight: 19 },
  idealRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F0E6FF' },
  idealLabel: { fontSize: 13, fontWeight: '600', color: '#2D1B4E', flex: 1, marginLeft: 10 },
  idealRange: { fontSize: 14, fontWeight: '800', color: '#7B1FA2', marginRight: 8 },
  idealNote: { fontSize: 11, color: '#9E9E9E' },

  // Interpret
  interpretCard: { borderRadius: 18, padding: 18, overflow: 'hidden' },
  interpretIcon: { fontSize: 36, marginBottom: 8 },
  interpretHeadline: { fontSize: 17, fontWeight: '800', color: '#2D1B4E', marginBottom: 6 },
  interpretBody: { fontSize: 14, color: '#555', lineHeight: 21 },

  // Insights
  insightSubtitle: { fontSize: 13, color: '#9E9E9E', marginBottom: 14 },
  insightCard: { borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1.5 },
  insightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  insightIcon: { fontSize: 22 },
  insightTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: '#2D1B4E' },
  insightBody: { fontSize: 13, color: '#555', lineHeight: 20 },

  // Explain cards
  explainCard: { backgroundColor: '#F9F4FF', borderRadius: 16, padding: 16 },
  explainTitle: { fontSize: 14, fontWeight: '700', color: '#2D1B4E', marginBottom: 4 },
  explainBody: { fontSize: 13, color: '#666', lineHeight: 20 },
  aeTrend: { marginTop: 12, backgroundColor: '#fff', borderRadius: 12, padding: 12 },
  aeTrendValue: { fontSize: 15, fontWeight: '800', marginBottom: 4 },
  aeTrendSub: { fontSize: 13, color: '#666', lineHeight: 19 },
});
