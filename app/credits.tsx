import React, { useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import { BackgroundCheckerboard } from '@/components/BackgroundCheckerboard';
import { GradientOverlay } from '@/components/GradientOverlay';
import { PixelButton } from '@/components/PixelButton';
import { CreditsContent } from '@/components/CreditsContent';
import { GameColors } from '@/constants/gameColors';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

/**
 * Pantalla de créditos del juego
 * Muestra información sobre los desarrolladores
 */
export default function CreditsScreen() {
  const { ensurePlaying, pause } = useBackgroundMusic();
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    void ensurePlaying('menu');
    
    return () => {
      void pause();
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
    };
  }, [ensurePlaying, pause]);

  const playBackSound = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sfx/backButtonClick.mp3'),
        { shouldPlay: true, volume: 0.7 }
      );
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          if (soundRef.current === sound) {
            soundRef.current = null;
          }
        }
      });
    } catch (error) {
      console.warn('No se pudo reproducir el sonido del botón de retroceso', error);
    }
  }, []);

  const handleBackPress = useCallback(() => {
    void playBackSound();
    router.back();
  }, [playBackSound]);

  return (
    <View style={styles.wrapper}>
      <BackgroundCheckerboard />
      <GradientOverlay />
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.quitButtonContainer}>
            <PixelButton
              label=""
              size="small"
              imageSource={require('@/assets/images/buttons/quitButton.png')}
              pressedImageSource={require('@/assets/images/buttons/quitButtonPressed.png')}
              variant="image"
              onPress={handleBackPress}
            />
          </View>
          <CreditsContent />
        </View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: GameColors.backgroundDark,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
    paddingVertical: 32,
  },
  quitButtonContainer: {
    position: 'absolute',
    top: 16,
    right: 4,
    zIndex: 10,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

