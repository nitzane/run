import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../src/context/AppContext';
import { Colors, ZoneColors, ZoneNames } from '../src/utils/colors';
import { formatPace, formatDuration } from '../src/utils/hrZones';
import GlassCard from '../src/components/GlassCard';
import ZoneBar from '../src/components/ZoneBar';
import { MOCK_RUNS } from '../src/data/mockData';

const CONFETTI_COLORS = ['#FF6B9D', '#C8A8E9', '#A8D8EA', '#FFD700', '#66BB6A', '#FFA726'];

function ConfettiPiece({ x, delay }) {
  const anim = useRef(new Animated.Value(0)).current;
  const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const size = 6 + Math.random() * 8;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(anim, { toValue: 1, duration: 2000, useNativeDriver: true }),
    ]).start();
  }, []);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [-20, 600] });
  const opacity = anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] });
  const rotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${(Math.random() - 0.5) * 720}deg`] });

  return (
    <Animated.View style={{
      position: 'absolute',
      left: x,
      top: 0,
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 4,
      opacity,
      transform: [{ translateY }, { rotate }],
    }} />
  );
}

function AnimatedStat({ label, value, unit, delay, color = Colors.white }) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.spring(anim, { toValue: 1, useNativeDriver: true, tension: 60, friction: 8 }),
    ]).start();
  }, []);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] });
  const opacity = anim;

  return (
    <Animated.View style={[styles.animStat, { opacity, transform: [{ scale }] }]}>
      <Text style={[styles.animStatVal, { color }]}>{value}</Text>
      {unit && <Text style={styles.animStatUnit}>{unit}</Text>}
      <Text style={styles.animStatLabel}>{label}</Text>
    </Animated.View>
  );
}

export default function PostRunScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lastRun, runs } = useApp();
  const [showConfetti, setShowConfetti] = useState(true);

  const run = lastRun || runs[0] || {
    distanceKm: 6.4,
    durationSec: 2340,
    avgPace: 365,
    avgHR: 142,
    calories: 462,
    zones: { 1: 5, 2: 68, 3: 20, 4: 7, 5: 0 },
  };

  const prevRun = runs.find(r => r.id !== lastRun?.id) || MOCK_RUNS[1];

  const badgeEarned = run.distanceKm >= 5 ? { icon: '🌸', title: '5K Finisher', xp: 200 } : null;

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const zonePercents = run.zones || {};
  const dominantZone = Object.entries(zonePercents).sort((a, b) => b[1] - a[1])[0];

  const distDiff = prevRun ? run.distanceKm - prevRun.distanceKm : 0;
  const paceDiff = prevRun ? prevRun.avgPace - run.avgPace : 0;

  return (
    <LinearGradient colors={['#1A0A2E', '#2D1B69', '#11001C']} style={styles.container}>
      {showConfetti && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {Array.from({ length: 30 }, (_, i) => (
            <ConfettiPiece key={i} x={Math.random() * 400} delay={i * 80} />
          ))}
        </View>
      )}

      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🎉</Text>
          <Text style={styles.headerTitle}>Run Complete!</Text>
          <Text style={styles.headerSub}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        {/* Animated Stats */}
        <GlassCard style={styles.statsCard}>
          <View style={styles.statsRow}>
            <AnimatedStat label="Distance" value={run.distanceKm.toFixed(2)} unit="km" delay={200} color={Colors.primary} />
            <AnimatedStat label="Time" value={formatDuration(run.durationSec)} delay={400} />
            <AnimatedStat label="Avg Pace" value={formatPace(run.avgPace)} unit="/km" delay={600} />
          </View>
          <View style={[styles.statsRow, { marginTop: 20 }]}>
            <AnimatedStat label="Avg HR" value={run.avgHR} unit="bpm" delay={800} color="#FF6B6B" />
            <AnimatedStat label="Calories" value={run.calories} unit="kcal" delay={1000} color="#FFA726" />
            <AnimatedStat label="Top Zone" value={`Z${dominantZone?.[0] || 2}`} delay={1200} color={ZoneColors[dominantZone?.[0] || 2]} />
          </View>
        </GlassCard>

        {/* Zone Breakdown */}
        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <GlassCard>
            <Text style={styles.sectionTitle}>Zone Breakdown</Text>
            <ZoneBar zones={zonePercents} />
            <View style={styles.zoneList}>
              {[1, 2, 3, 4, 5].map(z => (
                zonePercents[z] > 0 ? (
                  <View key={z} style={styles.zoneListItem}>
                    <View style={[styles.zoneColorDot, { backgroundColor: ZoneColors[z] }]} />
                    <Text style={styles.zoneListName}>Z{z} {ZoneNames[z]}</Text>
                    <View style={styles.zoneListBar}>
                      <View style={[styles.zoneListFill, { width: `${zonePercents[z]}%`, backgroundColor: ZoneColors[z] }]} />
                    </View>
                    <Text style={styles.zoneListPct}>{zonePercents[z]}%</Text>
                  </View>
                ) : null
              ))}
            </View>
          </GlassCard>
        </View>

        {/* Badge Earned */}
        {badgeEarned && (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <GlassCard padding={0}>
              <LinearGradient colors={['rgba(255,215,0,0.25)', 'rgba(255,107,157,0.1)']} style={styles.badgeCard}>
                <Text style={styles.badgeEmoji}>{badgeEarned.icon}</Text>
                <View>
                  <Text style={styles.badgeEarned}>Badge Earned! 🎊</Text>
                  <Text style={styles.badgeTitle}>{badgeEarned.title}</Text>
                  <Text style={styles.badgeXP}>+{badgeEarned.xp} XP</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
              </LinearGradient>
            </GlassCard>
          </View>
        )}

        {/* Compare to last run */}
        {prevRun && (
          <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
            <GlassCard>
              <Text style={styles.sectionTitle}>vs Last Run</Text>
              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>Distance</Text>
                <Text style={[styles.compareDiff, { color: distDiff >= 0 ? '#66BB6A' : '#EF5350' }]}>
                  {distDiff >= 0 ? '+' : ''}{distDiff.toFixed(2)} km
                </Text>
              </View>
              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>Pace</Text>
                <Text style={[styles.compareDiff, { color: paceDiff >= 0 ? '#66BB6A' : '#EF5350' }]}>
                  {paceDiff >= 0 ? '+' : ''}{Math.abs(paceDiff)}s/km {paceDiff >= 0 ? 'faster' : 'slower'}
                </Text>
              </View>
              <View style={styles.compareRow}>
                <Text style={styles.compareLabel}>Avg HR</Text>
                <Text style={styles.compareVal}>{run.avgHR} bpm</Text>
              </View>
            </GlassCard>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}>
            <LinearGradient colors={['#FC4C02', '#FF6B35']} style={styles.actionBtnGrad}>
              <Ionicons name="bicycle" size={18} color={Colors.white} />
              <Text style={styles.actionBtnText}>Save to Strava</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.85}>
            <LinearGradient colors={['#FF3B30', '#FF6B60']} style={styles.actionBtnGrad}>
              <Ionicons name="heart" size={18} color={Colors.white} />
              <Text style={styles.actionBtnText}>Save to Apple Health</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.doneBtn} onPress={() => router.replace('/(tabs)')} activeOpacity={0.85}>
          <LinearGradient colors={['#FF6B9D', '#C8A8E9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.doneBtnGrad}>
            <Text style={styles.doneBtnText}>Done</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20 },
  headerEmoji: { fontSize: 48, marginBottom: 4 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: Colors.white },
  headerSub: { fontSize: 14, color: Colors.muted, marginTop: 2 },
  statsCard: { marginHorizontal: 20, marginTop: 8 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  animStat: { alignItems: 'center', flex: 1 },
  animStatVal: { fontSize: 26, fontWeight: '800' },
  animStatUnit: { fontSize: 11, color: Colors.muted, marginTop: -2 },
  animStatLabel: { fontSize: 11, color: Colors.muted, marginTop: 3 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 12 },
  zoneList: { marginTop: 12, gap: 8 },
  zoneListItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  zoneColorDot: { width: 10, height: 10, borderRadius: 5 },
  zoneListName: { fontSize: 12, color: Colors.muted, width: 90 },
  zoneListBar: { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  zoneListFill: { height: '100%', borderRadius: 3 },
  zoneListPct: { fontSize: 12, color: Colors.offWhite, fontWeight: '600', width: 36, textAlign: 'right' },
  badgeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, borderRadius: 20 },
  badgeEmoji: { fontSize: 40 },
  badgeEarned: { fontSize: 11, color: '#FFD700', fontWeight: '700', letterSpacing: 0.5 },
  badgeTitle: { fontSize: 18, fontWeight: '800', color: Colors.white },
  badgeXP: { fontSize: 13, color: '#FFD700' },
  compareRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  compareLabel: { fontSize: 14, color: Colors.muted },
  compareDiff: { fontSize: 14, fontWeight: '600' },
  compareVal: { fontSize: 14, color: Colors.white, fontWeight: '600' },
  actions: { paddingHorizontal: 20, gap: 10, marginTop: 20 },
  actionBtn: { borderRadius: 14, overflow: 'hidden' },
  actionBtnGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14, borderRadius: 14 },
  actionBtnText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  doneBtn: { marginHorizontal: 20, marginTop: 16, borderRadius: 16, overflow: 'hidden' },
  doneBtnGrad: { padding: 16, alignItems: 'center' },
  doneBtnText: { fontSize: 17, fontWeight: '800', color: Colors.white },
});
