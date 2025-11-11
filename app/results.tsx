import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import { BackgroundCheckerboard } from '@/components/BackgroundCheckerboard';
import { GradientOverlay } from '@/components/GradientOverlay';
import { PixelButton } from '@/components/PixelButton';
import { ScoreBadge } from '@/components/ScoreBadge';
import { GameOverStatBadge } from '@/components/GameOverStatBadge';
import { useScore } from '@/hooks/useScore';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';
import { Platform } from 'react-native';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { bestRecord } = useScore();
  const { pause } = useBackgroundMusic();
  const buttonSoundRef = useRef<Audio.Sound | null>(null);
  const backSoundRef = useRef<Audio.Sound | null>(null);
  const winSoundRef = useRef<Audio.Sound | null>(null);
  const gameOverSoundRef = useRef<Audio.Sound | null>(null);

  const score = parseInt(params.score as string, 10) || 0;
  const time = parseInt(params.time as string, 10) || 0;
  const attempts = parseInt(params.attempts as string, 10) || 0;
  const level = parseInt(params.level as string, 10) || 1;
  const won = params.won === 'true';
  const lives = parseInt(params.lives as string, 10) || 0;

  // Pausar música de fondo y precargar sonidos al montar el componente
  useEffect(() => {
    void pause(); // Pausar música de fondo del juego
    
    const loadSoundsAndPlay = async () => {
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

        // Precargar sonido de victoria
        const { sound: winSound } = await Audio.Sound.createAsync(
          require('@/assets/sfx/gameWinSound.mp3'),
          { shouldPlay: false, volume: 0.7 }
        );
        winSoundRef.current = winSound;

        // Precargar sonido de derrota
        const { sound: gameOverSound } = await Audio.Sound.createAsync(
          require('@/assets/sfx/gameOverSound.mp3'),
          { shouldPlay: false, volume: 0.7 }
        );
        gameOverSoundRef.current = gameOverSound;

        // Una vez cargados los sonidos, reproducir el correspondiente
        // Detener cualquier sonido que esté reproduciéndose
        if (winSoundRef.current) {
          try {
            const winStatus = await winSoundRef.current.getStatusAsync();
            if (winStatus.isLoaded && winStatus.isPlaying) {
              await winSoundRef.current.stopAsync();
            }
          } catch (error) {
            // Ignorar errores
          }
        }
        if (gameOverSoundRef.current) {
          try {
            const gameOverStatus = await gameOverSoundRef.current.getStatusAsync();
            if (gameOverStatus.isLoaded && gameOverStatus.isPlaying) {
              await gameOverSoundRef.current.stopAsync();
            }
          } catch (error) {
            // Ignorar errores
          }
        }

        // Reproducir el sonido correspondiente
        if (won && winSoundRef.current) {
          try {
            const sound = winSoundRef.current;
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              await sound.setPositionAsync(0);
              await sound.playAsync();
            }
          } catch (error) {
            console.warn('Error al reproducir sonido de victoria:', error);
          }
        } else if (!won && gameOverSoundRef.current) {
          try {
            const sound = gameOverSoundRef.current;
            const status = await sound.getStatusAsync();
            if (status.isLoaded) {
              await sound.setPositionAsync(0);
              await sound.playAsync();
            }
          } catch (error) {
            console.warn('Error al reproducir sonido de derrota:', error);
          }
        }
      } catch (error) {
        console.warn('Error al precargar sonidos:', error);
      }
    };

    void loadSoundsAndPlay();

    return () => {
      // Detener y limpiar todos los sonidos al desmontar
      const cleanupSound = async (sound: Audio.Sound | null) => {
        if (sound) {
          try {
            const status = await sound.getStatusAsync();
            if (status.isLoaded && status.isPlaying) {
              await sound.stopAsync();
            }
            await sound.unloadAsync();
          } catch (error) {
            // Ignorar errores al limpiar
          }
        }
      };

      void cleanupSound(buttonSoundRef.current);
      void cleanupSound(backSoundRef.current);
      void cleanupSound(winSoundRef.current);
      void cleanupSound(gameOverSoundRef.current);

      buttonSoundRef.current = null;
      backSoundRef.current = null;
      winSoundRef.current = null;
      gameOverSoundRef.current = null;
    };
  }, [won]);

  // Formatear tiempo como MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const playButtonSound = useCallback(async () => {
    try {
      const sound = buttonSoundRef.current;
      if (sound) {
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

  // Detener sonidos de resultado (victoria/derrota)
  const stopResultSounds = useCallback(async () => {
    try {
      // Detener sonido de victoria
      if (winSoundRef.current) {
        const winStatus = await winSoundRef.current.getStatusAsync();
        if (winStatus.isLoaded && winStatus.isPlaying) {
          await winSoundRef.current.stopAsync();
        }
      }
      // Detener sonido de derrota
      if (gameOverSoundRef.current) {
        const gameOverStatus = await gameOverSoundRef.current.getStatusAsync();
        if (gameOverStatus.isLoaded && gameOverStatus.isPlaying) {
          await gameOverSoundRef.current.stopAsync();
        }
      }
    } catch (error) {
      // Ignorar errores al detener sonidos
    }
  }, []);

  const handlePlayAgain = useCallback(async () => {
    // Detener sonidos de resultado antes de navegar
    await stopResultSounds();
    void playButtonSound();
    router.push({
      pathname: '/game',
      params: { level: level.toString() },
    });
  }, [stopResultSounds, playButtonSound, router, level]);

  const handleQuit = useCallback(async () => {
    // Detener sonidos de resultado antes de navegar
    await stopResultSounds();
    void playBackSound();
    router.push('/select-level');
  }, [stopResultSounds, playBackSound, router]);

  return (
    <View style={styles.wrapper}>
      <BackgroundCheckerboard />
      <GradientOverlay />
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{won ? 'VICTORY!' : 'GAME OVER'}</Text>
            <Text style={styles.subtitle}>
              {won ? 'Congratulations!' : 'Good luck on the next one'}
            </Text>
          </View>

          <View style={styles.scoreSection}>
            <ScoreBadge score={score} />
          </View>

          <View style={styles.statsSection}>
            <GameOverStatBadge icon="⏱️" label="Time" value={formatTime(time)} />
            <GameOverStatBadge icon="🎯" label="Attempts" value={attempts.toString()} />
            <GameOverStatBadge icon="🏆" label="Difficulty" value={`Lvl. ${level}`} />
            {!won && <GameOverStatBadge icon="❤️" label="Lives Remaining" value={`x${lives}`} />}
          </View>

          {bestRecord && won && (
            <View style={styles.recordSection}>
              <Text style={styles.recordTitle}>BEST RECORD</Text>
              <View style={styles.recordBadges}>
                <GameOverStatBadge icon="⭐" label="Best Score" value={bestRecord.bestScore.toString()} />
                <GameOverStatBadge icon="⏱️" label="Best Time" value={formatTime(bestRecord.bestTime)} />
                <GameOverStatBadge icon="🎯" label="Best Attempts" value={bestRecord.bestAttempts.toString()} />
              </View>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonRow}>
              <View style={styles.buttonWrapper}>
                <PixelButton
                  label="PLAY AGAIN"
                  size="small"
                  variant="gradient"
                  onPress={handlePlayAgain}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <PixelButton
                  label="QUIT"
                  size="small"
                  variant="gradient"
                  onPress={handleQuit}
                />
              </View>
            </View>
          </View>
        </View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    marginTop: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  title: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 20,
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
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 10,
    color: '#FFFFFF',
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
  scoreSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  recordTitle: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 12,
    color: GameColors.textBrown,
    marginBottom: 16,
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
  recordBadges: {
    width: '100%',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
});

