import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0b0b10' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#0b0b10' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Border Beam · Expo' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
