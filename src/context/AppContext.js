import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_AVATAR } from '../data/avatarItems';

const STORAGE_KEY = '@runflow_user_v1';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);          // null = not onboarded yet
  const [isLoading, setIsLoading] = useState(true); // true while reading storage
  const [runs, setRuns] = useState([]);
  const [unlockedBadges, setUnlockedBadges] = useState(['first-run']);
  const [activePlanId, setActivePlanId] = useState(null);
  const [planProgress, setPlanProgress] = useState({ week: 1, day: 1 });
  const [lastRun, setLastRun] = useState(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [xp, setXp] = useState(0);
  const [trainingDays, setTrainingDays] = useState([1, 3, 5]);

  // Load persisted data on mount
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const saved = JSON.parse(raw);
          if (saved.user) setUser(saved.user);
          if (saved.runs) setRuns(saved.runs);
          if (saved.unlockedBadges) setUnlockedBadges(saved.unlockedBadges);
          if (saved.activePlanId) setActivePlanId(saved.activePlanId);
          if (saved.planProgress) setPlanProgress(saved.planProgress);
          if (saved.avatar) setAvatar(saved.avatar);
          if (typeof saved.xp === 'number') setXp(saved.xp);
          if (saved.trainingDays) setTrainingDays(saved.trainingDays);
        }
      } catch (_) {
        // storage read failed — start fresh
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Persist key data whenever it changes
  const persist = useCallback(async (patch) => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : {};
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...patch }));
    } catch (_) {}
  }, []);

  const completeOnboarding = useCallback(async (userData) => {
    const newUser = {
      ...userData,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    setTrainingDays(userData.trainingDays || [1, 3, 5]);
    await persist({ user: newUser, trainingDays: userData.trainingDays || [1, 3, 5] });
  }, [persist]);

  const updateUser = useCallback((updates) => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      persist({ user: next });
      return next;
    });
  }, [persist]);

  const saveRun = useCallback((runData) => {
    const newRun = { ...runData, id: `r${Date.now()}`, date: new Date().toISOString() };
    setRuns(prev => {
      const next = [newRun, ...prev];
      persist({ runs: next });
      return next;
    });
    setLastRun(newRun);
    setXp(prev => {
      const earned = Math.round((runData.distanceKm || 0) * 10 + (runData.durationSec || 0) / 60);
      const next = prev + earned;
      persist({ xp: next });
      return next;
    });
  }, [persist]);

  const setAvatarAndSave = useCallback((av) => {
    setAvatar(av);
    persist({ avatar: av });
  }, [persist]);

  const setXpAndSave = useCallback((fn) => {
    setXp(prev => {
      const next = typeof fn === 'function' ? fn(prev) : fn;
      persist({ xp: next });
      return next;
    });
  }, [persist]);

  const setTrainingDaysAndSave = useCallback((fn) => {
    setTrainingDays(prev => {
      const next = typeof fn === 'function' ? fn(prev) : fn;
      persist({ trainingDays: next });
      return next;
    });
  }, [persist]);

  const setActivePlanAndSave = useCallback((id) => {
    setActivePlanId(id);
    persist({ activePlanId: id });
  }, [persist]);

  // Derived stats from real runs
  const stats = {
    totalRuns: runs.length,
    totalDistanceKm: runs.reduce((s, r) => s + (r.distanceKm || 0), 0),
    weeklyDistanceKm: runs
      .filter(r => new Date(r.date) > new Date(Date.now() - 7 * 86400000))
      .reduce((s, r) => s + (r.distanceKm || 0), 0),
    weeklyRuns: runs.filter(r => new Date(r.date) > new Date(Date.now() - 7 * 86400000)).length,
    weeklyTimeMin: Math.round(
      runs
        .filter(r => new Date(r.date) > new Date(Date.now() - 7 * 86400000))
        .reduce((s, r) => s + (r.durationSec || 0), 0) / 60
    ),
    currentStreak: computeSimpleStreak(runs, trainingDays),
    weeklyGoalKm: user?.weeklyGoalKm || 20,
  };

  return (
    <AppContext.Provider value={{
      user, updateUser,
      isLoading,
      completeOnboarding,
      runs, saveRun,
      stats,
      unlockedBadges,
      activePlanId, setActivePlanId: setActivePlanAndSave,
      planProgress, setPlanProgress,
      lastRun,
      avatar, setAvatar: setAvatarAndSave,
      xp, setXp: setXpAndSave,
      trainingDays, setTrainingDays: setTrainingDaysAndSave,
    }}>
      {children}
    </AppContext.Provider>
  );
}

function computeSimpleStreak(runs, trainingDays = [1, 3, 5]) {
  if (!runs.length) return 0;
  const runDaySet = new Set(runs.map(r => new Date(r.date).toDateString()));
  const lastRun = runs.map(r => new Date(r.date)).reduce((a, b) => (a > b ? a : b));
  if ((Date.now() - lastRun) / 86400000 >= 7) return 0;
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (!trainingDays.includes(d.getDay())) continue;
    if (runDaySet.has(d.toDateString())) streak++;
    else if (i > 0) break;
  }
  return streak;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
