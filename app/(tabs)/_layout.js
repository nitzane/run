import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../src/utils/colors';

function TabIcon({ name, color, focused, label }) {
  return (
    <View style={styles.tabItem}>
      <Ionicons name={name} size={24} color={color} />
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
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} color={color} focused={focused} label="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="training"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} focused={focused} label="Train" />
          ),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'flame' : 'flame-outline'} color={color} focused={focused} label="Challenges" />
          ),
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'trophy' : 'trophy-outline'} color={color} focused={focused} label="Awards" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} color={color} focused={focused} label="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(20,10,40,0.97)',
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    height: 80,
    paddingBottom: 16,
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
