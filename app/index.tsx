import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import { BackgroundCheckerboard } from '@/components/BackgroundCheckerboard';
import { GradientOverlay } from '@/components/GradientOverlay';
import { Title } from '@/components/Title';
import { StatsRow } from '@/components/StatsRow';
import { CardGrid } from '@/components/CardGrid';
import { PixelButton } from '@/components/PixelButton';
import { Footer } from '@/components/Footer';
import { EasterEggMessage } from '@/components/EasterEggMessage';
import { GameColors } from '@/constants/gameColors';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

/**
 * Pantalla principal del juego Memory Quest
 * Combina todos los componentes en un layout vertical
 */
export default function MainScreen() {
  const router = useRouter();
  const { ensurePlaying, pause } = useBackgroundMusic();
  const [easterEggVisible, setEasterEggVisible] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const buttonSoundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    // Intentar reproducir música automáticamente al montar
    // En web, esto puede fallar silenciosamente debido a políticas de autoplay
    const playMusic = async () => {
      await ensurePlaying('menu', false);
    };
    void playMusic();
    
    return () => {
      void pause();
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
      }
      if (buttonSoundRef.current) {
        buttonSoundRef.current.unloadAsync().catch(() => {});
        buttonSoundRef.current = null;
      }
    };
  }, [ensurePlaying, pause]);

  const playEasterEggSound = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sfx/gta-cheat-sound.mp3'),
        { shouldPlay: true, volume: 0.8 }
      );
      soundRef.current = sound;
    } catch (error) {
      console.warn('No se pudo reproducir el sonido del easter egg', error);
    }
  }, []);

  const handleFooterPress = useCallback(() => {
    // Limpiar timeout anterior
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Incrementar contador
    clickCountRef.current += 1;

    // Si llegó a 5 clics, activar easter egg
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      setEasterEggVisible(true);
      void playEasterEggSound();
    }

    // Resetear contador después de 2 segundos sin clics
    clickTimeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  }, [playEasterEggSound]);

  const handleEasterEggHide = useCallback(() => {
    setEasterEggVisible(false);
  }, []);

  const playButtonSound = useCallback(async () => {
    try {
      // Si hay un sonido anterior, descargarlo primero
      if (buttonSoundRef.current) {
        await buttonSoundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sfx/buttonClick.wav'),
        { shouldPlay: true, volume: 0.7 }
      );
      buttonSoundRef.current = sound;
      // Limpiar después de reproducir
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
          if (buttonSoundRef.current === sound) {
            buttonSoundRef.current = null;
          }
        }
      });
    } catch (error) {
      console.warn('No se pudo reproducir el sonido del botón', error);
    }
  }, []);

  const handlePlayPress = useCallback(() => {
    void playButtonSound();
    // Intentar reproducir música cuando el usuario interactúa (en web, esto desbloquea el autoplay)
    void ensurePlaying('menu', true);
    router.push('/select-level');
  }, [playButtonSound, router, ensurePlaying]);

  const handleCreditsPress = useCallback(() => {
    void playButtonSound();
    // Intentar reproducir música cuando el usuario interactúa
    void ensurePlaying('menu', true);
    router.push({ pathname: '/credits' as any });
  }, [playButtonSound, router, ensurePlaying]);

  const handleMorePress = useCallback(() => {
    void playButtonSound();
    // Intentar reproducir música cuando el usuario interactúa
    void ensurePlaying('menu', true);
    router.push({ pathname: '/more' as any });
  }, [playButtonSound, router, ensurePlaying]);

  return (
    <View style={styles.wrapper}>
      <BackgroundCheckerboard />
      <GradientOverlay />
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.content}>
        <View style={styles.topSection}>
          <Title />
          <StatsRow />
          <CardGrid />
        </View>
        <View style={styles.buttonsContainer}>
          <PixelButton
            label="PLAY"
            size="large"
            imageSource={require('@/assets/images/buttons/playButton.png')}
            pressedImageSource={require('@/assets/images/buttons/playButtonPressed.png')}
            variant="image"
            onPress={handlePlayPress}
          />
        </View>
        <View style={styles.secondaryButtonsContainer}>
          <View style={styles.buttonWrapper}>
            <PixelButton
              label="CREDITS"
              size="small"
              imageSource={require('@/assets/images/buttons/creditsButton.png')}
              pressedImageSource={require('@/assets/images/buttons/creditsButtonPressed.png')}
              variant="image"
              onPress={handleCreditsPress}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <PixelButton
              label="MORE"
              size="small"
              imageSource={require('@/assets/images/buttons/moreButton.png')}
              pressedImageSource={require('@/assets/images/buttons/moreButtonPressed.png')}
              variant="image"
              onPress={handleMorePress}
            />
          </View>
        </View>
        <Footer onPress={handleFooterPress} />
        </View>
      </SafeAreaView>
      <EasterEggMessage visible={easterEggVisible} onHide={handleEasterEggHide} duration={3000} />
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 16,
  },
  buttonsContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonWrapper: {
    marginHorizontal: 6,
  },
});

