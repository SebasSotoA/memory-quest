import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { SplashCheckerboard } from './SplashCheckerboard';
import { Footer } from './Footer';
import { styles } from '@/styles/components/SplashScreen.styles'

type SplashScreenProps = {
  onFinish: () => void;
};

/**
 * Componente de pantalla de splash
 * Muestra una carta girando sobre fondo checkerboard
 * Se oculta automáticamente después de unos segundos
 */
export function SplashScreen({ onFinish }: SplashScreenProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Animación de rotación continua y suave
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1, // Repetir infinitamente
      false
    );

    // Animación sutil de escala para dar más vida
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, {
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
        }),
        withTiming(1, {
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      false
    );

    // Ocultar el splash después de 3 segundos
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer);
      // Detener las animaciones al desmontar
      rotation.value = 0;
      scale.value = 1;
    };
  }, [onFinish, rotation, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <SplashCheckerboard />
      <View style={styles.content}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <Image
            source={require('@/assets/images/cardAssets/BackBlue1.png')}
            style={styles.card}
            contentFit="contain"
          />
        </Animated.View>
      </View>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
}
