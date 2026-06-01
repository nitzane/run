import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../src/context/AppContext';
import { BADGES, getXPLevel } from '../../src/data/badges';
import { Colors } from '../../src/utils/colors';
import GlassCard from '../../src/components/GlassCard';

const CATEGORIES = ['All', 'milestone', 'distance', 'speed', 'zone', 'streak', 'special'];

export default function AchievementsScreen() {
  const insets = useSafeAreaInsets();
  const { unlockedBadges, stats } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const totalXP = unlockedBadges.reduce((sum, id) => {
    const b = BADGES.find(b => b.id === id);
    return sum + (b ? b.xp : 0);
  }, 0);

  const { level, title, progress, nextXP } = getXPLevel(totalXP);

  const filteredBadges = BADGES.filter(b =>
    activeCategory === 'All' || b.category === activeCategory
  );

  return (
    <LinearGradient colors={['#1A0A2E', '#2D1B69', '#11001C']} style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Achievements</Text>
          <Text style={styles.pageSubtitle}>{unlockedBadges.length} / {BADGES.length} badges earned</Text>
        </View>

        {/* XP / Level Card */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <GlassCard padding={0}>
            <LinearGradient colors={['rgba(255,215,0,0.2)', 'rgba(255,107,157,0.1)']} style={styles.levelCard}>
              <View style={styles.levelLeft}>
                <Text style={styles.levelNum}>Level {level}</Text>
                <Text style={styles.levelTitle}>{title}</Text>
                <View style={styles.xpBar}>
                  <View style={[styles.xpFill, { width: `${progress * 100}%` }]}>
                    <LinearGradient colors={['#FFD700', '#FFA726']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
                  </View>
                </View>
                <Text style={styles.xpText}>{totalXP} XP · Next level at {nextXP} XP</Text>
              </View>
              <View style={styles.levelBadge}>
                <LinearGradient colors={['#FFD700', '#FFA726']} style={styles.levelBadgeCircle}>
                  <Text style={styles.levelBadgeNum}>{level}</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          </GlassCard>
        </View>

        {/* Category filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Badge Grid */}
        <View style={styles.badgeGrid}>
          {filteredBadges.map(badge => {
            const unlocked = unlockedBadges.includes(badge.id);
            return (
              <View key={badge.id} style={styles.badgeWrapper}>
                <GlassCard style={[styles.badgeCard, !unlocked && styles.badgeCardLocked]} padding={12}>
                  <View style={[styles.badgeIconCircle, !unlocked && styles.badgeIconLocked]}>
                    <Text style={[styles.badgeEmoji, !unlocked && { opacity: 0.3 }]}>{badge.icon}</Text>
                  </View>
                  <Text style={[styles.badgeName, !unlocked && styles.badgeNameLocked]}>{badge.title}</Text>
                  <Text style={[styles.badgeDesc, !unlocked && { opacity: 0.4 }]} numberOfLines={2}>{badge.description}</Text>
                  <View style={styles.badgeXP}>
                    <Text style={[styles.badgeXPText, !unlocked && { opacity: 0.4 }]}>+{badge.xp} XP</Text>
                    {unlocked && <Ionicons name="checkmark-circle" size={14} color="#66BB6A" />}
                  </View>
                </GlassCard>
              </View>
            );
          })}
        </View>

        {/* Stats Summary */}
        <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
          <GlassCard>
            <Text style={styles.sectionTitle}>Your Journey</Text>
            <View style={styles.journeyGrid}>
              <View style={styles.journeyItem}>
                <Text style={styles.journeyVal}>{stats.totalRuns}</Text>
                <Text style={styles.journeyLabel}>Total Runs</Text>
              </View>
              <View style={styles.journeyItem}>
                <Text style={styles.journeyVal}>{stats.totalDistanceKm.toFixed(0)}</Text>
                <Text style={styles.journeyLabel}>km Total</Text>
              </View>
              <View style={styles.journeyItem}>
                <Text style={styles.journeyVal}>{stats.currentStreak}</Text>
                <Text style={styles.journeyLabel}>Day Streak</Text>
              </View>
              <View style={styles.journeyItem}>
                <Text style={styles.journeyVal}>{unlockedBadges.length}</Text>
                <Text style={styles.journeyLabel}>Badges</Text>
              </View>
            </View>
          </GlassCard>
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
  levelCard: { padding: 20, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  levelLeft: { flex: 1 },
  levelNum: { fontSize: 22, fontWeight: '800', color: Colors.white },
  levelTitle: { fontSize: 14, color: Colors.muted, marginBottom: 10 },
  xpBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  xpFill: { height: '100%', borderRadius: 4 },
  xpText: { fontSize: 11, color: Colors.muted },
  levelBadge: { marginLeft: 16 },
  levelBadgeCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  levelBadgeNum: { fontSize: 28, fontWeight: '800', color: '#1A0A2E' },
  filterScroll: { marginBottom: 16 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: 13, color: Colors.muted, fontWeight: '600' },
  filterTextActive: { color: Colors.white },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 14, gap: 0 },
  badgeWrapper: { width: '33.33%', padding: 6 },
  badgeCard: { alignItems: 'center', borderRadius: 16 },
  badgeCardLocked: { opacity: 0.6 },
  badgeIconCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  badgeIconLocked: { backgroundColor: 'rgba(255,255,255,0.05)' },
  badgeEmoji: { fontSize: 24 },
  badgeName: { fontSize: 11, fontWeight: '700', color: Colors.white, textAlign: 'center', marginBottom: 2 },
  badgeNameLocked: { color: Colors.muted },
  badgeDesc: { fontSize: 9, color: Colors.muted, textAlign: 'center', lineHeight: 13 },
  badgeXP: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  badgeXPText: { fontSize: 10, color: '#FFD700', fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.white, marginBottom: 12 },
  journeyGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  journeyItem: { alignItems: 'center' },
  journeyVal: { fontSize: 26, fontWeight: '800', color: Colors.white },
  journeyLabel: { fontSize: 11, color: Colors.muted, marginTop: 2 },
});
