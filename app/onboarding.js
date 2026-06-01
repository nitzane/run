import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Animated, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../src/context/AppContext';
import { Colors } from '../src/utils/colors';

const { width } = Dimensions.get('window');

const FITNESS_LEVELS = [
  { id: 'beginner',     label: 'Beginner',     desc: 'New to running or getting back into it', emoji: '🌱' },
  { id: 'intermediate', label: 'Intermediate',  desc: 'Running regularly, comfortable with 5K+', emoji: '🏃‍♀️' },
  { id: 'advanced',     label: 'Advanced',      desc: 'Consistent training, races under my belt', emoji: '🔥' },
];

const GOAL_OPTIONS = [
  { id: 'aerobic',    label: 'Build aerobic base',       emoji: '❤️' },
  { id: '5k',         label: 'Run 5K',                   emoji: '🎯' },
  { id: '10k',        label: 'Run 10K',                  emoji: '📍' },
  { id: 'half',       label: 'Half marathon',            emoji: '🏅' },
  { id: 'marathon',   label: 'Full marathon',            emoji: '🏆' },
  { id: 'weight',     label: 'Weight loss',              emoji: '⚡' },
  { id: 'hrv',        label: 'Improve HRV & recovery',  emoji: '🫀' },
  { id: 'stress',     label: 'Stress relief',            emoji: '🌿' },
  { id: 'speed',      label: 'Get faster',               emoji: '💨' },
  { id: 'habit',      label: 'Build a running habit',    emoji: '✨' },
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const TOTAL_STEPS = 6;

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { completeOnboarding } = useApp();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [goals, setGoals] = useState([]);
  const [weeklyKm, setWeeklyKm] = useState('20');
  const [trainingDays, setTrainingDays] = useState([1, 3, 5]);

  function toggleGoal(id) {
    setGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  }

  function toggleDay(dow) {
    setTrainingDays(prev =>
      prev.includes(dow) ? prev.filter(d => d !== dow) : [...prev, dow].sort((a, b) => a - b)
    );
  }

  function canAdvance() {
    if (step === 0) return true;
    if (step === 1) return name.trim().length >= 2;
    if (step === 2) return parseInt(age) >= 10 && parseInt(age) <= 100;
    if (step === 3) return fitnessLevel !== '';
    if (step === 4) return goals.length >= 1;
    if (step === 5) return weeklyKm !== '' && trainingDays.length >= 1;
    return true;
  }

  function animateTransition(fn) {
    Animated.timing(fadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      fn();
      Animated.timing(fadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    });
  }

  function next() {
    if (!canAdvance()) return;
    if (step < TOTAL_STEPS - 1) {
      animateTransition(() => setStep(s => s + 1));
    } else {
      finish();
    }
  }

  function back() {
    if (step > 0) animateTransition(() => setStep(s => s - 1));
  }

  async function finish() {
    const maxHR = Math.round(220 - parseInt(age));
    const goalLabels = goals.map(id => GOAL_OPTIONS.find(g => g.id === id)?.label).filter(Boolean);
    await completeOnboarding({
      name: name.trim(),
      age: parseInt(age),
      maxHR,
      fitnessLevel,
      goals: goalLabels,
      weeklyGoalKm: parseFloat(weeklyKm) || 20,
      trainingDays,
    });
    router.replace('/(tabs)');
  }

  const gradients = [
    ['#1A0A2E', '#2D1B69'],
    ['#1A0A2E', '#2D1B69'],
    ['#1A0A2E', '#2D1B69'],
    ['#1A0A2E', '#2D1B69'],
    ['#1A0A2E', '#2D1B69'],
    ['#1A0A2E', '#2D1B69'],
  ];

  return (
    <LinearGradient colors={gradients[step] || ['#1A0A2E', '#2D1B69']} style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Progress dots */}
          {step > 0 && (
            <View style={styles.dotsRow}>
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <View key={i} style={[styles.dot, i <= step && styles.dotActive, i === step && styles.dotCurrent]} />
              ))}
            </View>
          )}

          <Animated.View style={{ opacity: fadeAnim, flex: 1 }}>
            {/* ── Step 0: Welcome ── */}
            {step === 0 && (
              <View style={styles.centeredStep}>
                <Text style={styles.bigEmoji}>🏃‍♀️</Text>
                <Text style={styles.welcomeTitle}>Welcome to{'\n'}RunFlow</Text>
                <Text style={styles.welcomeSub}>
                  Your personal running companion.{'\n'}Let's set you up — takes 60 seconds.
                </Text>
                <View style={styles.welcomeFeatures}>
                  {['Personalised training plans', 'Smart stats & insights', 'Badges & challenges', 'Custom avatar'].map((f, i) => (
                    <View key={i} style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={18} color="#FF6B9D" />
                      <Text style={styles.featureText}>{f}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* ── Step 1: Name ── */}
            {step === 1 && (
              <View style={styles.formStep}>
                <Text style={styles.stepLabel}>STEP 1 OF 5</Text>
                <Text style={styles.stepTitle}>What's your name?</Text>
                <Text style={styles.stepSub}>This is how we'll greet you every day.</Text>
                <TextInput
                  style={styles.bigInput}
                  value={name}
                  onChangeText={setName}
                  placeholder="Your first name"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  autoFocus
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={next}
                />
              </View>
            )}

            {/* ── Step 2: Age ── */}
            {step === 2 && (
              <View style={styles.formStep}>
                <Text style={styles.stepLabel}>STEP 2 OF 5</Text>
                <Text style={styles.stepTitle}>How old are you?</Text>
                <Text style={styles.stepSub}>Used to calculate your heart rate zones accurately.</Text>
                <TextInput
                  style={styles.bigInput}
                  value={age}
                  onChangeText={setAge}
                  placeholder="e.g. 28"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  keyboardType="number-pad"
                  autoFocus
                  returnKeyType="next"
                  onSubmitEditing={next}
                />
                {age.length > 0 && parseInt(age) >= 10 && (
                  <View style={styles.hrPreview}>
                    <Ionicons name="heart" size={16} color="#FF6B9D" />
                    <Text style={styles.hrPreviewText}>
                      Estimated max HR: {220 - parseInt(age)} bpm
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* ── Step 3: Fitness Level ── */}
            {step === 3 && (
              <View style={styles.formStep}>
                <Text style={styles.stepLabel}>STEP 3 OF 5</Text>
                <Text style={styles.stepTitle}>How would you describe yourself?</Text>
                <Text style={styles.stepSub}>No wrong answers — be honest for the best plan.</Text>
                <View style={styles.levelList}>
                  {FITNESS_LEVELS.map(lvl => (
                    <TouchableOpacity
                      key={lvl.id}
                      style={[styles.levelCard, fitnessLevel === lvl.id && styles.levelCardActive]}
                      onPress={() => setFitnessLevel(lvl.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.levelEmoji}>{lvl.emoji}</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.levelLabel, fitnessLevel === lvl.id && styles.levelLabelActive]}>{lvl.label}</Text>
                        <Text style={styles.levelDesc}>{lvl.desc}</Text>
                      </View>
                      {fitnessLevel === lvl.id && (
                        <Ionicons name="checkmark-circle" size={22} color="#FF6B9D" />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* ── Step 4: Goals ── */}
            {step === 4 && (
              <View style={styles.formStep}>
                <Text style={styles.stepLabel}>STEP 4 OF 5</Text>
                <Text style={styles.stepTitle}>What are your goals?</Text>
                <Text style={styles.stepSub}>Pick as many as you like.</Text>
                <View style={styles.goalGrid}>
                  {GOAL_OPTIONS.map(g => {
                    const selected = goals.includes(g.id);
                    return (
                      <TouchableOpacity
                        key={g.id}
                        style={[styles.goalChip, selected && styles.goalChipActive]}
                        onPress={() => toggleGoal(g.id)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.goalEmoji}>{g.emoji}</Text>
                        <Text style={[styles.goalLabel, selected && styles.goalLabelActive]}>{g.label}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* ── Step 5: Weekly km + Schedule ── */}
            {step === 5 && (
              <View style={styles.formStep}>
                <Text style={styles.stepLabel}>STEP 5 OF 5</Text>
                <Text style={styles.stepTitle}>Last step!</Text>
                <Text style={styles.stepSub}>How many km per week is your goal?</Text>
                <View style={styles.kmRow}>
                  <TouchableOpacity onPress={() => setWeeklyKm(v => String(Math.max(5, (parseFloat(v) || 20) - 5)))} style={styles.kmBtn}>
                    <Text style={styles.kmBtnText}>−</Text>
                  </TouchableOpacity>
                  <View style={styles.kmDisplay}>
                    <Text style={styles.kmValue}>{weeklyKm}</Text>
                    <Text style={styles.kmUnit}>km / week</Text>
                  </View>
                  <TouchableOpacity onPress={() => setWeeklyKm(v => String((parseFloat(v) || 20) + 5))} style={styles.kmBtn}>
                    <Text style={styles.kmBtnText}>+</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.stepSub, { marginTop: 28 }]}>Which days will you run?</Text>
                <Text style={styles.restNote}>Rest days won't break your streak 💙</Text>
                <View style={styles.daysRow}>
                  {DAY_LABELS.map((label, dow) => {
                    const active = trainingDays.includes(dow);
                    return (
                      <TouchableOpacity
                        key={dow}
                        onPress={() => toggleDay(dow)}
                        style={[styles.dayBtn, active && styles.dayBtnActive]}
                      >
                        <Text style={[styles.dayBtnText, active && styles.dayBtnTextActive]}>{label.charAt(0)}</Text>
                        <Text style={[styles.daySubText, active && { color: 'rgba(255,255,255,0.7)' }]}>{active ? 'RUN' : 'REST'}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}
          </Animated.View>

          {/* Navigation buttons */}
          <View style={styles.navRow}>
            {step > 0 ? (
              <TouchableOpacity onPress={back} style={styles.backBtn}>
                <Ionicons name="arrow-back" size={20} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            ) : <View style={{ width: 44 }} />}

            <TouchableOpacity
              onPress={next}
              style={[styles.nextBtn, !canAdvance() && styles.nextBtnDisabled]}
              disabled={!canAdvance()}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={canAdvance() ? ['#FF6B9D', '#CE93D8'] : ['#444', '#444']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.nextBtnGrad}
              >
                <Text style={styles.nextBtnText}>
                  {step === 0 ? "Let's go! ✨" : step === TOTAL_STEPS - 1 ? 'Start Running! 🏃‍♀️' : 'Continue'}
                </Text>
                {step > 0 && step < TOTAL_STEPS - 1 && (
                  <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 6 }} />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, gap: 0 },
  dotsRow: { flexDirection: 'row', gap: 6, justifyContent: 'center', marginBottom: 32 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.2)' },
  dotActive: { backgroundColor: 'rgba(255,107,157,0.5)' },
  dotCurrent: { width: 24, backgroundColor: '#FF6B9D' },

  centeredStep: { flex: 1, alignItems: 'center', paddingTop: 40, gap: 16 },
  bigEmoji: { fontSize: 72, marginBottom: 8 },
  welcomeTitle: { fontSize: 38, fontWeight: '800', color: Colors.white, textAlign: 'center', lineHeight: 44 },
  welcomeSub: { fontSize: 16, color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 24, marginBottom: 8 },
  welcomeFeatures: { gap: 10, alignSelf: 'stretch', marginTop: 12, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: 20 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureText: { fontSize: 15, color: Colors.offWhite, fontWeight: '500' },

  formStep: { flex: 1, paddingTop: 12, gap: 6 },
  stepLabel: { fontSize: 11, fontWeight: '800', color: '#FF6B9D', letterSpacing: 1.5, marginBottom: 4 },
  stepTitle: { fontSize: 30, fontWeight: '800', color: Colors.white, lineHeight: 36, marginBottom: 4 },
  stepSub: { fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 20, lineHeight: 22 },

  bigInput: {
    fontSize: 32, fontWeight: '700', color: Colors.white,
    borderBottomWidth: 2, borderBottomColor: '#FF6B9D',
    paddingVertical: 12, marginBottom: 16,
  },
  hrPreview: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,107,157,0.15)', padding: 12, borderRadius: 12 },
  hrPreviewText: { fontSize: 14, color: Colors.offWhite, fontWeight: '600' },

  levelList: { gap: 12, marginTop: 4 },
  levelCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1.5, borderColor: 'transparent' },
  levelCardActive: { borderColor: '#FF6B9D', backgroundColor: 'rgba(255,107,157,0.12)' },
  levelEmoji: { fontSize: 28 },
  levelLabel: { fontSize: 16, fontWeight: '700', color: Colors.offWhite, marginBottom: 2 },
  levelLabelActive: { color: Colors.white },
  levelDesc: { fontSize: 12, color: Colors.muted, lineHeight: 17 },

  goalGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  goalChip: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1.5, borderColor: 'transparent' },
  goalChipActive: { borderColor: '#FF6B9D', backgroundColor: 'rgba(255,107,157,0.15)' },
  goalEmoji: { fontSize: 16 },
  goalLabel: { fontSize: 13, color: Colors.muted, fontWeight: '600' },
  goalLabelActive: { color: Colors.white },

  kmRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 8 },
  kmBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  kmBtnText: { fontSize: 26, color: Colors.white, fontWeight: '300' },
  kmDisplay: { alignItems: 'center', minWidth: 120 },
  kmValue: { fontSize: 52, fontWeight: '800', color: Colors.white },
  kmUnit: { fontSize: 13, color: Colors.muted, marginTop: -4 },

  restNote: { fontSize: 12, color: '#64B5F6', marginTop: -12, marginBottom: 14 },
  daysRow: { flexDirection: 'row', gap: 6, marginTop: 4 },
  dayBtn: { flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 14, backgroundColor: 'rgba(100,181,246,0.1)', borderWidth: 1.5, borderColor: 'rgba(100,181,246,0.2)', gap: 3 },
  dayBtnActive: { backgroundColor: 'rgba(255,107,157,0.2)', borderColor: '#FF6B9D' },
  dayBtnText: { fontSize: 13, fontWeight: '800', color: Colors.muted },
  dayBtnTextActive: { color: Colors.white },
  daySubText: { fontSize: 7, color: '#64B5F6', fontWeight: '700' },

  navRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 32 },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  nextBtn: { flex: 1, marginLeft: 12, borderRadius: 16, overflow: 'hidden', shadowColor: '#FF6B9D', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } },
  nextBtnDisabled: { opacity: 0.5, shadowOpacity: 0 },
  nextBtnGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  nextBtnText: { fontSize: 16, fontWeight: '800', color: '#fff' },
});
