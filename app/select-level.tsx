import React, { useCallback, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { BackgroundCheckerboard } from '@/components/BackgroundCheckerboard';
import { GradientOverlay } from '@/components/GradientOverlay';
import { PixelButton } from '@/components/PixelButton';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';
import { GameLevel } from '@/types/game';
import { LEVEL_LABELS, LEVEL_DESCRIPTIONS } from '@/constants/gameLevels';
import { Platform } from 'react-native';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

export default function SelectLevelScreen() {
  const router = useRouter();
  const { ensurePlaying, pause } = useBackgroundMusic();
  const buttonSoundRef = useRef<Audio.Sound | null>(null);
  const backSoundRef = useRef<Audio.Sound | null>(null);

  // Precargar sonidos al montar el componente
  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Precargar sonido de botón
        const { sound: buttonSound } = await Audio.Sound.createAsync(
          require('@/assets/sfx/buttonClick.wav'),
          { shouldPlay: false, volume: 0.7 }
        );
        buttonSoundRef.current = buttonSound;

        // Precargar sonido de retroceso
        const { sound: backSound } = await Audio.Sound.createAsync(
          require('@/assets/sfx/backButtonClick.mp3'),
          { shouldPlay: false, volume: 0.7 }
        );
        backSoundRef.current = backSound;
      } catch (error) {
        console.warn('Error al precargar sonidos:', error);
      }
    };

    void loadSounds();
    void ensurePlaying('menu');
    
    return () => {
      void pause();
      if (buttonSoundRef.current) {
        buttonSoundRef.current.unloadAsync().catch(() => {});
        buttonSoundRef.current = null;
      }
      if (backSoundRef.current) {
        backSoundRef.current.unloadAsync().catch(() => {});
        backSoundRef.current = null;
      }
    };
  }, [ensurePlaying, pause]);

  const playButtonSound = useCallback(async () => {
    try {
      const sound = buttonSoundRef.current;
      if (sound) {
        // Reiniciar el sonido si ya se reprodujo
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.didJustFinish || status.positionMillis > 0) {
            await sound.setPositionAsync(0);
          }
          await sound.playAsync();
        }
      }
    } catch (error) {
      console.warn('No se pudo reproducir el sonido del botón', error);
    }
  }, []);

  const playBackSound = useCallback(async () => {
    try {
      const sound = backSoundRef.current;
      if (sound) {
        // Reiniciar el sonido si ya se reprodujo
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.didJustFinish || status.positionMillis > 0) {
            await sound.setPositionAsync(0);
          }
          await sound.playAsync();
        }
      }
    } catch (error) {
      console.warn('No se pudo reproducir el sonido del botón de retroceso', error);
    }
  }, []);

  const handleLevelSelect = useCallback((level: GameLevel) => {
    void playButtonSound();
    router.push({
      pathname: '/game',
      params: { level: level.toString() },
    });
  }, [playButtonSound, router]);

  const handleBack = useCallback(() => {
    void playBackSound();
    router.push('/');
  }, [playBackSound, router]);

  return (
    <View style={styles.wrapper}>
      <BackgroundCheckerboard />
      <GradientOverlay />
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>SELECT LEVEL</Text>
          </View>

          <View style={styles.levelsContainer}>
            <View style={styles.levelButtonContainer}>
              <PixelButton
                label={LEVEL_LABELS[1]}
                size="large"
                variant="gradient"
                onPress={() => handleLevelSelect(1)}
              />
              <Text style={styles.levelDescription}>{LEVEL_DESCRIPTIONS[1]}</Text>
            </View>

            <View style={styles.levelButtonContainer}>
              <PixelButton
                label={LEVEL_LABELS[2]}
                size="large"
                variant="gradient"
                onPress={() => handleLevelSelect(2)}
              />
              <Text style={styles.levelDescription}>{LEVEL_DESCRIPTIONS[2]}</Text>
            </View>

            <View style={styles.levelButtonContainer}>
              <PixelButton
                label={LEVEL_LABELS[3]}
                size="large"
                variant="gradient"
                onPress={() => handleLevelSelect(3)}
              />
              <Text style={styles.levelDescription}>{LEVEL_DESCRIPTIONS[3]}</Text>
            </View>
          </View>

          <View style={styles.backButtonContainer}>
            <PixelButton
              label="BACK"
              size="small"
              variant="gradient"
              onPress={handleBack}
            />
          </View>
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
  titleContainer: {
    marginTop: 32,
    marginBottom: 48,
    alignItems: 'center',
  },
  title: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 18,
    color: GameColors.textGold,
    ...Platform.select({
      web: {
        textShadow: '3px 3px 0px ' + GameColors.textGoldDark,
      } as any,
      default: {
        textShadowColor: GameColors.textGoldDark,
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 0,
      },
    }),
    letterSpacing: 2,
  },
  levelsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  levelButtonContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  levelDescription: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 10,
    color: GameColors.textBrown,
    marginTop: 8,
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px ' + GameColors.textOutline,
      } as any,
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
  backButtonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});

