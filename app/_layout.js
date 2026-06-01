import { Stack } from 'expo-router';
import { AppProvider } from '../src/context/AppContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="active-run" options={{ presentation: 'fullScreenModal' }} />
        <Stack.Screen name="post-run" options={{ presentation: 'fullScreenModal' }} />
      </Stack>
    </AppProvider>
  );
}
