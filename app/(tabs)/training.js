import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import { TRAINING_PLANS } from '../../src/data/trainingPlans';
import { Colors } from '../../src/utils/colors';
import GlassCard from '../../src/components/GlassCard';

const { width } = Dimensions.get('window');

const DIFFICULTY_COLORS = {
  'Beginner': '#66BB6A',
  'Intermediate': '#FFA726',
  'Advanced': '#EF5350',
  'All Levels': '#42A5F5',
};

function PlanCard({ plan, isActive, onSelect }) {
  return (
    <TouchableOpacity onPress={() => onSelect(plan)} activeOpacity={0.85}>
      <GlassCard style={[styles.planCard, isActive && styles.planCardActive]} padding={0}>
        <LinearGradient colors={[...plan.gradient, 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.planGradientHeader}>
          <View style={styles.planHeaderContent}>
            <Text style={styles.planIcon}>{plan.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.planTitle}>{plan.title}</Text>
              <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
            </View>
            {isActive && <View style={styles.activeBadge}><Text style={styles.activeBadgeText}>ACTIVE</Text></View>}
          </View>
        </LinearGradient>
        <View style={styles.planBody}>
          <Text style={styles.planDesc}>{plan.description}</Text>
          <View style={styles.planMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={13} color={Colors.muted} />
              <Text style={styles.metaText}>{plan.durationWeeks} weeks</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="fitness-outline" size={13} color={Colors.muted} />
              <Text style={styles.metaText}>{plan.runsPerWeek}x/week</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: DIFFICULTY_COLORS[plan.difficulty] + '33' }]}>
              <Text style={[styles.difficultyText, { color: DIFFICULTY_COLORS[plan.difficulty] }]}>{plan.difficulty}</Text>
            </View>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

function PlanDetail({ plan, currentWeek, onClose, onActivate }) {
  const weekData = plan.weeks[currentWeek - 1] || plan.weeks[0];
  return (
    <View style={styles.detailOverlay}>
      <LinearGradient colors={['#1A0A2E', '#2D1B69']} style={styles.detailContainer}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{plan.title}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          <LinearGradient colors={[...plan.gradient, 'transparent']} style={styles.detailHero}>
            <Text style={{ fontSize: 60 }}>{plan.icon}</Text>
            <Text style={styles.detailHeroTitle}>{plan.title}</Text>
            <Text style={styles.detailHeroSub}>{plan.subtitle}</Text>
          </LinearGradient>

          <View style={{ padding: 20, gap: 16 }}>
            <GlassCard>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.overviewText}>{plan.description}</Text>
              <View style={styles.overviewStats}>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewStatVal}>{plan.durationWeeks}</Text>
                  <Text style={styles.overviewStatLabel}>Weeks</Text>
                </View>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewStatVal}>{plan.runsPerWeek}</Text>
                  <Text style={styles.overviewStatLabel}>Runs/Week</Text>
                </View>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewStatVal}>Z{plan.targetZone}</Text>
                  <Text style={styles.overviewStatLabel}>Target Zone</Text>
                </View>
              </View>
            </GlassCard>

            <GlassCard>
              <Text style={styles.sectionTitle}>Week {currentWeek} — {weekData.focus}</Text>
              {weekData.runs.map((run, i) => (
                <View key={i} style={styles.runRow}>
                  <View style={[styles.runDay, { backgroundColor: plan.gradient[0] + '33' }]}>
                    <Text style={[styles.runDayText, { color: plan.gradient[0] }]}>{run.day}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.runType}>{run.type} · {run.duration} min</Text>
                    <Text style={styles.runDesc}>{run.description}</Text>
                  </View>
                  <View style={[styles.zoneTag, { backgroundColor: `hsl(${run.zone * 60}, 70%, 50%)22` }]}>
                    <Text style={styles.zoneTagText}>Z{run.zone}</Text>
                  </View>
                </View>
              ))}
            </GlassCard>

            {/* Week progress */}
            <GlassCard>
              <Text style={styles.sectionTitle}>Plan Progress</Text>
              <View style={styles.weekGrid}>
                {plan.weeks.map((w, i) => (
                  <View key={i} style={[
                    styles.weekDot,
                    i + 1 < currentWeek && styles.weekDotDone,
                    i + 1 === currentWeek && styles.weekDotCurrent,
                  ]}>
                    <Text style={styles.weekDotText}>{i + 1}</Text>
                  </View>
                ))}
              </View>
            </GlassCard>
          </View>
        </ScrollView>

        <View style={styles.detailCta}>
          <TouchableOpacity style={styles.activateBtn} onPress={onActivate} activeOpacity={0.85}>
            <LinearGradient colors={plan.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.activateBtnGrad}>
              <Text style={styles.activateBtnText}>Activate This Plan</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

export default function TrainingScreen() {
  const insets = useSafeAreaInsets();
  const { activePlanId, setActivePlanId, planProgress } = useApp();
  const [selectedPlan, setSelectedPlan] = useState(null);

  if (selectedPlan) {
    return (
      <PlanDetail
        plan={selectedPlan}
        currentWeek={activePlanId === selectedPlan.id ? planProgress.week : 1}
        onClose={() => setSelectedPlan(null)}
        onActivate={() => {
          setActivePlanId(selectedPlan.id);
          setSelectedPlan(null);
        }}
      />
    );
  }

  return (
    <LinearGradient colors={['#1A0A2E', '#2D1B69', '#11001C']} style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Training Plans</Text>
          <Text style={styles.pageSubtitle}>Choose your journey</Text>
        </View>

        {activePlanId && (
          <View style={{ paddingHorizontal: 20, marginBottom: 8 }}>
            <LinearGradient colors={['rgba(255,107,157,0.2)', 'rgba(200,168,233,0.1)']} style={styles.activePlanBanner}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
              <Text style={styles.activePlanText}>
                Active: {TRAINING_PLANS.find(p => p.id === activePlanId)?.title} · Week {planProgress.week}
              </Text>
            </LinearGradient>
          </View>
        )}

        <View style={styles.plansList}>
          {TRAINING_PLANS.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isActive={plan.id === activePlanId}
              onSelect={setSelectedPlan}
            />
          ))}
        </View>

        {/* Custom Plan Builder */}
        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <TouchableOpacity activeOpacity={0.85}>
            <GlassCard style={styles.customCard} padding={0}>
              <LinearGradient colors={['rgba(255,107,157,0.3)', 'rgba(200,168,233,0.2)']} style={styles.customGradient}>
                <Text style={styles.customIcon}>✨</Text>
                <View>
                  <Text style={styles.customTitle}>Custom Plan Builder</Text>
                  <Text style={styles.customSub}>Set your goal, fitness level & schedule</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
              </LinearGradient>
            </GlassCard>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pageHeader: { paddingHorizontal: 20, marginBottom: 20 },
  pageTitle: { fontSize: 32, fontWeight: '800', color: Colors.white },
  pageSubtitle: { fontSize: 15, color: Colors.muted, marginTop: 2 },
  activePlanBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,107,157,0.3)',
  },
  activePlanText: { fontSize: 13, color: Colors.offWhite, fontWeight: '600' },
  plansList: { paddingHorizontal: 20, gap: 16 },
  planCard: { overflow: 'hidden' },
  planCardActive: { borderColor: Colors.primary, borderWidth: 1.5 },
  planGradientHeader: { padding: 16, borderRadius: 20, paddingBottom: 20 },
  planHeaderContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  planIcon: { fontSize: 32 },
  planTitle: { fontSize: 18, fontWeight: '800', color: Colors.white },
  planSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  activeBadge: { backgroundColor: Colors.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  activeBadgeText: { fontSize: 9, fontWeight: '800', color: Colors.white, letterSpacing: 0.5 },
  planBody: { padding: 16, paddingTop: 12 },
  planDesc: { fontSize: 13, color: Colors.muted, lineHeight: 18 },
  planMeta: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: Colors.muted },
  difficultyBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginLeft: 'auto' },
  difficultyText: { fontSize: 10, fontWeight: '700' },
  customCard: { overflow: 'hidden' },
  customGradient: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 20 },
  customIcon: { fontSize: 28 },
  customTitle: { fontSize: 16, fontWeight: '700', color: Colors.white },
  customSub: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  // Detail view
  detailOverlay: { flex: 1 },
  detailContainer: { flex: 1 },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  detailTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  detailHero: { alignItems: 'center', padding: 30, gap: 8 },
  detailHeroTitle: { fontSize: 28, fontWeight: '800', color: Colors.white },
  detailHeroSub: { fontSize: 15, color: 'rgba(255,255,255,0.7)' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 10 },
  overviewText: { fontSize: 13, color: Colors.muted, lineHeight: 20, marginBottom: 16 },
  overviewStats: { flexDirection: 'row', justifyContent: 'space-around' },
  overviewStat: { alignItems: 'center' },
  overviewStatVal: { fontSize: 24, fontWeight: '800', color: Colors.white },
  overviewStatLabel: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  runRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  runDay: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  runDayText: { fontSize: 11, fontWeight: '700' },
  runType: { fontSize: 13, fontWeight: '600', color: Colors.white },
  runDesc: { fontSize: 11, color: Colors.muted, marginTop: 1 },
  zoneTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  zoneTagText: { fontSize: 11, fontWeight: '700', color: Colors.white },
  weekGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  weekDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  weekDotDone: { backgroundColor: '#66BB6A' },
  weekDotCurrent: { backgroundColor: Colors.primary },
  weekDotText: { fontSize: 11, color: Colors.white, fontWeight: '600' },
  detailCta: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  activateBtn: { borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  activateBtnGrad: { padding: 16, alignItems: 'center', borderRadius: 16 },
  activateBtnText: { fontSize: 16, fontWeight: '800', color: Colors.white },
});
