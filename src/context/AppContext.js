import React, { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_USER, MOCK_RUNS, MOCK_STATS, MOCK_UNLOCKED_BADGES } from '../data/mockData';
import { DEFAULT_AVATAR } from '../data/avatarItems';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(MOCK_USER);
  const [runs, setRuns] = useState(MOCK_RUNS);
  const [stats, setStats] = useState(MOCK_STATS);
  const [unlockedBadges, setUnlockedBadges] = useState(MOCK_UNLOCKED_BADGES);
  const [activePlanId, setActivePlanId] = useState(MOCK_USER.currentPlanId);
  const [planProgress, setPlanProgress] = useState({ week: MOCK_USER.currentPlanWeek, day: 1 });
  const [lastRun, setLastRun] = useState(null);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [xp, setXp] = useState(1240); // demo XP
  // trainingDays: 0=Sun,1=Mon,...,6=Sat. Default Mon/Wed/Thu/Sat.
  const [trainingDays, setTrainingDays] = useState([1, 3, 4, 6]);

  const saveRun = useCallback((runData) => {
    const newRun = { ...runData, id: `r${Date.now()}`, date: new Date().toISOString() };
    setRuns(prev => [newRun, ...prev]);
    setLastRun(newRun);
    setStats(prev => ({
      ...prev,
      totalRuns: prev.totalRuns + 1,
      totalDistanceKm: prev.totalDistanceKm + runData.distanceKm,
      weeklyDistanceKm: prev.weeklyDistanceKm + runData.distanceKm,
      weeklyRuns: prev.weeklyRuns + 1,
    }));
  }, []);

  const updateUser = useCallback((updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <AppContext.Provider value={{
      user, updateUser,
      runs, saveRun,
      stats,
      unlockedBadges,
      activePlanId, setActivePlanId,
      planProgress, setPlanProgress,
      lastRun,
      avatar, setAvatar,
      xp, setXp,
      trainingDays, setTrainingDays,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
