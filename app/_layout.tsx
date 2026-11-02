import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { BackgroundMusicProvider } from '@/providers/BackgroundMusicProvider';

// Prevenir que la pantalla de splash se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    PressStart2P_400Regular,
  });
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Esperar a que las fuentes estén cargadas
        if (fontsLoaded || fontError) {
          // Ocultar el splash nativo cuando las fuentes estén listas
          await SplashScreen.hideAsync();
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn(e);
        setAppIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  if (!appIsReady) {
    return null;
  }

  return (
    <BackgroundMusicProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="select-level" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false }} />
        <Stack.Screen name="credits" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </BackgroundMusicProvider>
  );
}
