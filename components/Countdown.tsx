import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { styles } from '@/styles/components/Countdown.styles';

type CountdownProps = {
  onComplete: () => void;
  duration?: number; // Duración en segundos por número (default: 1)
};

export function Countdown({ onComplete, duration = 1 }: CountdownProps) {
  const [count, setCount] = useState(3);
  const [isVisible, setIsVisible] = useState(true);
  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (count > 0 && isVisible) {
      // Animación de entrada
      scale.value = withSequence(
        withSpring(1.5, { damping: 8, stiffness: 100 }),
        withTiming(1, { duration: 200 })
      );
      opacity.value = withTiming(1, { duration: 100 });
      rotation.value = withSequence(
        withSpring(0, { damping: 10 }),
        withSpring(5, { damping: 8 }),
        withSpring(-5, { damping: 8 }),
        withSpring(0, { damping: 10 })
      );

      // Cambiar al siguiente número después de la duración
      const timeout = setTimeout(() => {
        if (count > 1) {
          // Reset para el siguiente número
          scale.value = 0.5;
          opacity.value = 0;
          setCount(count - 1);
        } else {
          // Último número, completar después de mostrar
          opacity.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(setIsVisible)(false);
            runOnJS(onComplete)();
          });
        }
      }, duration * 1000);

      return () => clearTimeout(timeout);
    }
  }, [count, duration, onComplete, scale, opacity, rotation, isVisible]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  if (!isVisible || count === 0) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View style={[styles.container, animatedStyle]}>
        <Text style={styles.countText}>{count}</Text>
      </Animated.View>
    </View>
  );
}
