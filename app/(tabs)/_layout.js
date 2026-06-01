import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../src/utils/colors';

function TabIcon({ name, color, label, emoji }) {
  return (
    <View style={styles.tabItem}>
      {emoji
        ? <Text style={styles.tabEmoji}>{emoji}</Text>
        : <Ionicons name={name} size={22} color={color} />}
      <Text style={[styles.tabLabel, { color }]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FF6B9D',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.35)',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} color={color} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} label="Train" />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'bar-chart' : 'bar-chart-outline'} color={color} label="Stats" />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'flame' : 'flame-outline'} color={color} label="Challenges" />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon emoji={focused ? '🏆' : undefined} name="trophy-outline" color={color} label="Awards" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} label="Me" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(18,8,38,0.98)',
    borderTopColor: 'rgba(255,107,157,0.18)',
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 14,
    paddingTop: 8,
  },
  tabItem: { alignItems: 'center', gap: 2 },
  tabEmoji: { fontSize: 20 },
  tabLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 0.4 },
});
