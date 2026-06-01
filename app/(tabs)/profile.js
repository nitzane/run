import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import { Colors, ZoneColors, ZoneNames } from '../../src/utils/colors';
import { getZoneRange } from '../../src/utils/hrZones';
import GlassCard from '../../src/components/GlassCard';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, updateUser, stats, unlockedBadges, trainingDays, setTrainingDays } = useApp();
  const [appleHealth, setAppleHealth] = useState(false);
  const [stravaConnected, setStravaConnected] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editMaxHR, setEditMaxHR] = useState(String(user.maxHR));

  const handleSave = () => {
    updateUser({ name: editName, maxHR: parseInt(editMaxHR) || 185 });
    setEditing(false);
  };

  return (
    <LinearGradient colors={['#1A0A2E', '#2D1B69', '#11001C']} style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <LinearGradient colors={['#FF6B9D', '#C8A8E9']} style={styles.avatar}>
            <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
          </LinearGradient>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileLevel}>{user.fitnessLevel.charAt(0).toUpperCase() + user.fitnessLevel.slice(1)} Runner</Text>
        </View>

        {/* All-time stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <GlassCard>
            <Text style={styles.sectionTitle}>All-Time Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{stats.totalDistanceKm.toFixed(0)}</Text>
                <Text style={styles.statLbl}>km Total</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{stats.totalRuns}</Text>
                <Text style={styles.statLbl}>Runs</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{unlockedBadges.length}</Text>
                <Text style={styles.statLbl}>Badges</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{stats.currentStreak}</Text>
                <Text style={styles.statLbl}>🔥 Streak</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* Personal Info */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <GlassCard>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Personal Info</Text>
              <TouchableOpacity onPress={() => editing ? handleSave() : setEditing(true)}>
                <Text style={styles.editBtn}>{editing ? 'Save' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name</Text>
              {editing ? (
                <TextInput style={styles.input} value={editName} onChangeText={setEditName} placeholderTextColor={Colors.muted} />
              ) : (
                <Text style={styles.infoValue}>{user.name}</Text>
              )}
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Max Heart Rate</Text>
              {editing ? (
                <TextInput style={styles.input} value={editMaxHR} onChangeText={setEditMaxHR} keyboardType="numeric" placeholderTextColor={Colors.muted} />
              ) : (
                <Text style={styles.infoValue}>{user.maxHR} bpm</Text>
              )}
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Fitness Level</Text>
              <Text style={styles.infoValue}>{user.fitnessLevel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Weekly Goal</Text>
              <Text style={styles.infoValue}>{user.weeklyGoalKm} km</Text>
            </View>
          </GlassCard>
        </View>

        {/* Heart Rate Zones */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <GlassCard>
            <Text style={styles.sectionTitle}>Training Zones</Text>
            <Text style={styles.zoneNote}>Based on max HR: {user.maxHR} bpm</Text>
            {[1, 2, 3, 4, 5].map(z => {
              const range = getZoneRange(z, user.maxHR);
              return (
                <View key={z} style={styles.zoneRow}>
                  <View style={[styles.zoneDot, { backgroundColor: ZoneColors[z] }]} />
                  <Text style={styles.zoneNum}>Zone {z}</Text>
                  <Text style={styles.zoneName}>{ZoneNames[z]}</Text>
                  <Text style={styles.zoneRange}>{range.min}–{range.max} bpm</Text>
                </View>
              );
            })}
          </GlassCard>
        </View>

        {/* Integrations */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <GlassCard>
            <Text style={styles.sectionTitle}>Integrations</Text>
            <View style={styles.integrationRow}>
              <View style={styles.integrationLeft}>
                <View style={[styles.integrationIcon, { backgroundColor: '#FF3B30' }]}>
                  <Ionicons name="heart" size={18} color={Colors.white} />
                </View>
                <View>
                  <Text style={styles.integrationName}>Apple Health</Text>
                  <Text style={styles.integrationSub}>{appleHealth ? 'Reading HR, HRV, VO2 Max' : 'Connect to sync health data'}</Text>
                </View>
              </View>
              <Switch
                value={appleHealth}
                onValueChange={setAppleHealth}
                trackColor={{ false: 'rgba(255,255,255,0.2)', true: Colors.primary }}
                thumbColor={Colors.white}
              />
            </View>
            <View style={[styles.integrationRow, { borderBottomWidth: 0 }]}>
              <View style={styles.integrationLeft}>
                <View style={[styles.integrationIcon, { backgroundColor: '#FC4C02' }]}>
                  <Ionicons name="bicycle" size={18} color={Colors.white} />
                </View>
                <View>
                  <Text style={styles.integrationName}>Strava</Text>
                  <Text style={styles.integrationSub}>{stravaConnected ? 'Connected — auto-upload runs' : 'Connect to upload runs'}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.stravaBtn, stravaConnected && styles.stravaBtnConnected]}
                onPress={() => {
                  setStravaConnected(!stravaConnected);
                  Alert.alert(stravaConnected ? 'Disconnected from Strava' : 'Strava Connected!', stravaConnected ? '' : 'Your runs will be automatically uploaded.');
                }}
              >
                <Text style={styles.stravaBtnText}>{stravaConnected ? 'Disconnect' : 'Connect'}</Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>

        {/* Training Schedule */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <GlassCard>
            <Text style={styles.sectionTitle}>Training Schedule</Text>
            <Text style={styles.scheduleNote}>
              Tap days to toggle. Rest days won't break your streak.
            </Text>
            <View style={styles.daysRow}>
              {['S','M','T','W','T','F','S'].map((label, dow) => {
                const active = trainingDays.includes(dow);
                return (
                  <TouchableOpacity
                    key={dow}
                    onPress={() => {
                      setTrainingDays(prev =>
                        active
                          ? prev.filter(d => d !== dow)
                          : [...prev, dow].sort((a, b) => a - b)
                      );
                    }}
                    style={[styles.dayBtn, active && styles.dayBtnActive]}
                  >
                    <Text style={[styles.dayBtnText, active && styles.dayBtnTextActive]}>{label}</Text>
                    {!active && <Text style={styles.restLabel}>REST</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.scheduleSummary}>
              <Ionicons name="information-circle-outline" size={14} color={Colors.muted} />
              <Text style={styles.scheduleSummaryText}>
                {trainingDays.length} run days · {7 - trainingDays.length} rest days per week
              </Text>
            </View>
          </GlassCard>
        </View>

        {/* Goals */}
        <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
          <GlassCard>
            <Text style={styles.sectionTitle}>My Goals</Text>
            {user.goals.map((goal, i) => (
              <View key={i} style={styles.goalRow}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
                <Text style={styles.goalText}>{goal}</Text>
              </View>
            ))}
          </GlassCard>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarSection: { alignItems: 'center', marginBottom: 24, paddingTop: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  avatarText: { fontSize: 36, fontWeight: '800', color: Colors.white },
  profileName: { fontSize: 24, fontWeight: '800', color: Colors.white },
  profileLevel: { fontSize: 14, color: Colors.muted, marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 12 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  editBtn: { fontSize: 14, color: Colors.primary, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  statBox: { alignItems: 'center' },
  statVal: { fontSize: 24, fontWeight: '800', color: Colors.white },
  statLbl: { fontSize: 11, color: Colors.muted, marginTop: 2 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  infoLabel: { fontSize: 14, color: Colors.muted },
  infoValue: { fontSize: 14, color: Colors.white, fontWeight: '600' },
  input: { fontSize: 14, color: Colors.white, fontWeight: '600', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, minWidth: 80, textAlign: 'right' },
  zoneNote: { fontSize: 12, color: Colors.muted, marginBottom: 12, marginTop: -4 },
  zoneRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.07)' },
  zoneDot: { width: 10, height: 10, borderRadius: 5 },
  zoneNum: { fontSize: 13, color: Colors.white, fontWeight: '600', width: 50 },
  zoneName: { fontSize: 12, color: Colors.muted, flex: 1 },
  zoneRange: { fontSize: 12, color: Colors.offWhite, fontWeight: '600' },
  integrationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  integrationLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  integrationIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  integrationName: { fontSize: 14, color: Colors.white, fontWeight: '600' },
  integrationSub: { fontSize: 11, color: Colors.muted, marginTop: 1 },
  stravaBtn: { backgroundColor: '#FC4C02', paddingHorizontal: 14, paddingVertical: 7, borderRadius: 10 },
  stravaBtnConnected: { backgroundColor: 'rgba(255,255,255,0.15)' },
  stravaBtnText: { fontSize: 12, fontWeight: '700', color: Colors.white },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  goalText: { fontSize: 14, color: Colors.offWhite },
  scheduleNote: { fontSize: 12, color: Colors.muted, marginBottom: 14, marginTop: -4 },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 4 },
  dayBtn: {
    flex: 1,
    aspectRatio: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(100,181,246,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(100,181,246,0.25)',
    gap: 2,
  },
  dayBtnActive: {
    backgroundColor: 'rgba(255,107,157,0.2)',
    borderColor: Colors.primary,
  },
  dayBtnText: { fontSize: 13, fontWeight: '800', color: Colors.muted },
  dayBtnTextActive: { color: Colors.white },
  restLabel: { fontSize: 7, color: '#64B5F6', fontWeight: '700', letterSpacing: 0.3 },
  scheduleSummary: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 12 },
  scheduleSummaryText: { fontSize: 12, color: Colors.muted },
});
