import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { useApp } from '../src/context/AppContext';
import { Colors, ZoneColors, ZoneNames } from '../src/utils/colors';
import { getZoneFromHR, formatPace, formatDuration, getZoneRange, estimateCalories } from '../src/utils/hrZones';
import { TRAINING_PLANS } from '../src/data/trainingPlans';

const { width, height } = Dimensions.get('window');

const ZONE_GRADIENT = {
  1: ['#1A3A4A', '#0D2233'],
  2: ['#1A3A1A', '#0D2D0D'],
  3: ['#3A3A0D', '#2D2D05'],
  4: ['#3A2200', '#2D1800'],
  5: ['#3A0D0D', '#2D0505'],
};

function PulseRing({ zone }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const speed = zone === 1 ? 2000 : zone === 2 ? 1600 : zone === 3 ? 1200 : zone === 4 ? 900 : 700;
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.4, duration: speed, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: speed, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, { toValue: 0, duration: speed, useNativeDriver: true }),
          Animated.timing(opacityAnim, { toValue: 0.6, duration: speed, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, [zone]);

  const color = ZoneColors[zone];

  return (
    <View style={styles.pulseContainer}>
      <Animated.View style={[styles.pulseOuter, { borderColor: color, transform: [{ scale: pulseAnim }], opacity: opacityAnim }]} />
      <View style={[styles.pulseMiddle, { borderColor: color }]} />
      <View style={[styles.pulseInner, { backgroundColor: color + '33' }]}>
        <Ionicons name="heart" size={32} color={color} />
      </View>
    </View>
  );
}

function ZoneIndicator({ zone }) {
  return (
    <View style={styles.zoneIndicator}>
      {[1, 2, 3, 4, 5].map(z => (
        <View key={z} style={[styles.zoneSegment, { backgroundColor: ZoneColors[z] + (z === zone ? 'FF' : '44') }]}>
          <Text style={[styles.zoneSegText, { opacity: z === zone ? 1 : 0.5 }]}>Z{z}</Text>
        </View>
      ))}
    </View>
  );
}

export default function ActiveRunScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user, saveRun, activePlanId, planProgress, setPlanProgress } = useApp();

  const [isRunning, setIsRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [heartRate, setHeartRate] = useState(135);
  const [zoneHistory, setZoneHistory] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [lastKm, setLastKm] = useState(0);

  const timerRef = useRef(null);
  const hrRef = useRef(135);
  const smoothHR = useRef(135);
  const isRunningRef = useRef(true);
  const lastSpokenKm = useRef(0);
  const halfwaySaid = useRef(false);
  const finalPushSaid = useRef(false);

  const maxHR = user?.maxHR || 190;
  const currentZone = getZoneFromHR(heartRate, maxHR);
  const pace = elapsed > 0 && distance > 0 ? elapsed / distance : 0;
  const calories = estimateCalories(distance, user?.weight || 70);

  // Resolve the plan and specific session to run
  const planId = params.planId || activePlanId;
  const activePlan = TRAINING_PLANS.find(p => p.id === planId);
  const weekIdx = params.weekIndex != null ? Number(params.weekIndex) : (planProgress.week - 1);
  const runIdx = params.runIndex != null ? Number(params.runIndex) : (planProgress.day - 1);
  const sessionRun = activePlan?.weeks[weekIdx]?.runs[runIdx] || activePlan?.weeks[0]?.runs[0];
  const targetDuration = sessionRun ? sessionRun.duration * 60 : 2400;
  const targetZone = sessionRun?.zone ?? activePlan?.targetZone ?? 2;

  const speak = useCallback((text) => {
    Speech.stop();
    Speech.speak(text, { language: 'en-US', rate: 0.9, pitch: 1.1 });
  }, []);

  // Start announcement
  useEffect(() => {
    if (activePlan && sessionRun) {
      const range = getZoneRange(targetZone, user?.maxHR || 190);
      setTimeout(() => {
        speak(`Hey! We're doing a ${sessionRun.duration} minute ${ZoneNames[targetZone]} run today — ${sessionRun.description}. Try to keep your heart rate between ${range.min} and ${range.max}. You've totally got this, let's go!`);
      }, 1000);
    } else {
      setTimeout(() => speak("Okay, let's do this! Your run is starting now — take a breath, find your rhythm, and let's have some fun out here!"), 1000);
    }
    return () => Speech.stop();
  }, []);

  const distanceRef = useRef(0);
  const elapsedRef = useRef(0);

  // Timer & simulation
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isRunningRef.current) return;

      elapsedRef.current += 1;
      const newElapsed = elapsedRef.current;

      // Simulate distance at a steady ~5:30/km pace (1/330 km per second)
      const distIncrement = 1 / 330;
      distanceRef.current += distIncrement;
      const newDist = distanceRef.current;
      setDistance(newDist);
      setElapsed(newElapsed);

      // Simulate HR: drift upward slowly over the run, tiny nudge each second
      const targetHR = 130 + (newElapsed / targetDuration) * 20;
      const nudge = (targetHR - smoothHR.current) * 0.02 + (Math.random() - 0.5) * 0.5;
      smoothHR.current = Math.max(90, Math.min(185, smoothHR.current + nudge));
      const newHR = Math.round(smoothHR.current);
      hrRef.current = newHR;
      setHeartRate(newHR);

      // Track zone history
      const zone = getZoneFromHR(newHR, user.maxHR);
      setZoneHistory(prev => ({ ...prev, [zone]: prev[zone] + 1 }));

      // Voice cues: every km
      const km = Math.floor(newDist);
      if (km > lastSpokenKm.current && km > 0) {
        lastSpokenKm.current = km;
        const paceStr = formatPace(newElapsed / newDist);
        const kmPhrases = [
          `${km} k done — you're flying! Pace is looking great at ${paceStr}, heart's sitting at ${newHR}. Keep this beautiful energy going!`,
          `There's ${km} k! You're doing amazing — ${paceStr} pace, heart rate ${newHR}. Honestly, you look so strong right now.`,
          `${km} kilometer in the bag! Pace ${paceStr}, heart rate ${newHR}. This is your run, own it!`,
          `${km} k — yes! Feeling that? ${paceStr} pace and heart's at ${newHR}. You're absolutely crushing this.`,
        ];
        speak(kmPhrases[(km - 1) % kmPhrases.length]);
      }

      // Halfway
      const progress = newElapsed / targetDuration;
      if (progress >= 0.5 && !halfwaySaid.current) {
        halfwaySaid.current = true;
        speak("Halfway! Oh my gosh, you're halfway through — and you still look so strong. Take a little breath, relax those shoulders, and let's bring this home together.");
      }

      // Final 10%
      if (progress >= 0.9 && !finalPushSaid.current) {
        finalPushSaid.current = true;
        speak("Almost there — just the last little stretch! You have worked so hard today, this is your moment. Dig in, stay tall, and let's finish this strong. You've got it!");
      }

      // Zone drift warning every 30s
      if (newElapsed % 30 === 0) {
        if (zone > targetZone + 1) {
          speak(`Hey, ease up just a little — your heart rate's climbing into Zone ${zone}. Pull it back toward Zone ${targetZone}, nice and controlled. You're doing great, just dial it down a touch.`);
        }
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const handlePauseResume = () => {
    const newState = !isRunning;
    setIsRunning(newState);
    isRunningRef.current = newState;
    speak(newState ? "Welcome back! You're back in it — let's go!" : "Taking a little break, no worries. Whenever you're ready, I'll be right here.");
  };

  const handleStop = () => {
    Alert.alert('End Run?', 'Are you sure you want to end this run?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Run', style: 'destructive', onPress: () => {
          clearInterval(timerRef.current);
          Speech.stop();

          const finalDist = distanceRef.current;
          const finalElapsed = elapsedRef.current;

          setZoneHistory(zh => {
            const totalZoneTime = Object.values(zh).reduce((a, b) => a + b, 0);
            const zonePercents = {};
            for (let z = 1; z <= 5; z++) {
              zonePercents[z] = totalZoneTime > 0 ? Math.round((zh[z] / totalZoneTime) * 100) : 0;
            }

            const runData = {
              distanceKm: parseFloat(finalDist.toFixed(2)),
              durationSec: finalElapsed,
              avgPace: finalElapsed > 0 && finalDist > 0 ? Math.round(finalElapsed / finalDist) : 0,
              avgHR: hrRef.current,
              calories: estimateCalories(finalDist),
              zones: zonePercents,
              planId: planId || null,
              weekIndex: weekIdx,
              runIndex: runIdx,
            };

            saveRun(runData);

            // Advance plan progress to next session
            if (activePlan) {
              const week = activePlan.weeks[weekIdx];
              const nextRunIdx = runIdx + 1;
              if (nextRunIdx < week.runs.length) {
                setPlanProgress({ week: weekIdx + 1, day: nextRunIdx + 1 });
              } else {
                const nextWeekIdx = weekIdx + 1;
                if (nextWeekIdx < activePlan.weeks.length) {
                  setPlanProgress({ week: nextWeekIdx + 1, day: 1 });
                }
              }
            }

            // Post-run voice summary
            setTimeout(() => {
              const z2pct = zonePercents[2] || 0;
              speak(`You did it! ${finalDist.toFixed(1)} kilometers in ${formatDuration(finalElapsed)} — that's something to be genuinely proud of. You spent ${z2pct} percent in Zone 2, which is incredible aerobic work. Go you! Seriously, well done today.`);
            }, 500);

            return zh;
          });

          router.replace('/post-run');
        }
      },
    ]);
  };

  const bgColors = ZONE_GRADIENT[currentZone];

  return (
    <LinearGradient colors={[...bgColors, '#000000']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity style={styles.closeBtn} onPress={handleStop}>
          <Ionicons name="close" size={22} color={Colors.white} />
        </TouchableOpacity>
        {activePlan && (
          <View style={styles.planChip}>
            <Text style={styles.planChipText}>{activePlan.title}</Text>
          </View>
        )}
        <View style={{ width: 40 }} />
      </View>

      {/* Zone Indicator */}
      <ZoneIndicator zone={currentZone} />

      {/* Zone Label */}
      <View style={styles.zoneLabelRow}>
        <View style={[styles.zoneLabel, { backgroundColor: ZoneColors[currentZone] + '33', borderColor: ZoneColors[currentZone] + '66' }]}>
          <Text style={[styles.zoneLabelText, { color: ZoneColors[currentZone] }]}>Zone {currentZone} — {ZoneNames[currentZone]}</Text>
        </View>
      </View>

      {/* Pulse Animation + HR */}
      <View style={styles.centerSection}>
        <PulseRing zone={currentZone} />
        <View style={styles.hrDisplay}>
          <Text style={[styles.hrValue, { color: ZoneColors[currentZone] }]}>{heartRate}</Text>
          <Text style={styles.hrUnit}>BPM</Text>
        </View>
      </View>

      {/* Main Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{distance.toFixed(2)}</Text>
          <Text style={styles.statUnit}>km</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{formatDuration(elapsed)}</Text>
          <Text style={styles.statUnit}>time</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{pace > 0 ? formatPace(pace) : '--:--'}</Text>
          <Text style={styles.statUnit}>min/km</Text>
        </View>
      </View>

      {/* Progress toward goal */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            {activePlan ? `Goal: ${activePlan.weeks[0]?.runs[0]?.duration || 40} min` : 'Elapsed'}
          </Text>
          <Text style={styles.progressPct}>{Math.min(100, Math.round((elapsed / targetDuration) * 100))}%</Text>
        </View>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${Math.min(100, (elapsed / targetDuration) * 100)}%`, backgroundColor: ZoneColors[currentZone] }]} />
        </View>
      </View>

      {/* Calories */}
      <View style={styles.calorieRow}>
        <Ionicons name="flame" size={16} color="#FFA726" />
        <Text style={styles.calorieText}>{calories} kcal burned</Text>
      </View>

      {/* Controls */}
      <View style={[styles.controls, { paddingBottom: insets.bottom + 24 }]}>
        <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
          <Ionicons name="stop" size={26} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pauseBtn} onPress={handlePauseResume} activeOpacity={0.85}>
          <LinearGradient colors={isRunning ? ['#FF6B9D', '#E54882'] : ['#66BB6A', '#43A047']} style={styles.pauseBtnGrad}>
            <Ionicons name={isRunning ? 'pause' : 'play'} size={32} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stopBtn} onPress={() => speak(`Current pace: ${formatPace(pace)} per km. Heart rate: ${heartRate} BPM. Zone ${currentZone}.`)}>
          <Ionicons name="volume-high-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  planChip: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  planChipText: { fontSize: 12, color: Colors.white, fontWeight: '600' },
  zoneIndicator: { flexDirection: 'row', paddingHorizontal: 20, gap: 6 },
  zoneSegment: { flex: 1, height: 8, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  zoneSegText: { fontSize: 8, color: Colors.white, fontWeight: '700', marginTop: 2 },
  zoneLabelRow: { alignItems: 'center', marginTop: 12 },
  zoneLabel: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  zoneLabelText: { fontSize: 14, fontWeight: '700' },
  centerSection: { alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 10 },
  pulseContainer: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  pulseOuter: { position: 'absolute', width: 140, height: 140, borderRadius: 70, borderWidth: 2 },
  pulseMiddle: { position: 'absolute', width: 110, height: 110, borderRadius: 55, borderWidth: 1.5 },
  pulseInner: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  hrDisplay: { position: 'absolute', alignItems: 'center' },
  hrValue: { fontSize: 36, fontWeight: '900' },
  hrUnit: { fontSize: 12, color: Colors.muted, marginTop: -4 },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 26, fontWeight: '800', color: Colors.white },
  statUnit: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.15)' },
  progressSection: { paddingHorizontal: 20, marginTop: 20 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: 12, color: Colors.muted },
  progressPct: { fontSize: 12, color: Colors.offWhite, fontWeight: '700' },
  progressBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  calorieRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 },
  calorieText: { fontSize: 14, color: Colors.muted },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 'auto',
    paddingTop: 20,
    paddingHorizontal: 40,
  },
  stopBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  pauseBtn: { borderRadius: 40, overflow: 'hidden', shadowColor: Colors.primary, shadowOpacity: 0.6, shadowRadius: 20, shadowOffset: { width: 0, height: 4 } },
  pauseBtnGrad: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
});
