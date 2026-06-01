import { Stack, useRouter, useSegments } from 'expo-router';
import { AppProvider, useApp } from '../src/context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

function AuthGate() {
  const { user, isLoading } = useApp();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;
    const inOnboarding = segments[0] === 'onboarding';
    if (!user && !inOnboarding) {
      router.replace('/onboarding');
    } else if (user && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1A0A2E', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#FF6B9D" size="large" />
      </View>
    );
  }
  return null;
}

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <AuthGate />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="active-run" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="post-run" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="custom-plan" />
      </Stack>
    </AppProvider>
  );
}
