import React, { useEffect, useState, useRef } from 'react';
import { Platform, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';
import { StyleSheet } from 'react-native';

type EasterEggMessageProps = {
  visible: boolean;
  onHide?: () => void;
  duration?: number;
};

export function EasterEggMessage({ visible, onHide, duration = 3000 }: EasterEggMessageProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const rotation = useSharedValue(0);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onHideRef = useRef(onHide);
  const isMountedRef = useRef(true);
  const visibleRef = useRef(visible);

  const hideMessage = () => {
    if (isMountedRef.current) {
      setShouldRender(false);
      if (onHideRef.current) {
        onHideRef.current();
      }
    }
  };

  useEffect(() => {
    onHideRef.current = onHide;
  }, [onHide]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (visible && isMountedRef.current) {
      opacity.value = 0;
      scale.value = 0.5;
      rotation.value = -10;
      setShouldRender(true);
      
      // Animación de entrada dramática
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSequence(
        withSpring(1.2, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 10, stiffness: 150 })
      );
      rotation.value = withSequence(
        withSpring(5, { damping: 8 }),
        withSpring(-5, { damping: 8 }),
        withSpring(0, { damping: 10 })
      );

      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current || !visibleRef.current) {
          return;
        }
        opacity.value = withTiming(0, { duration: 300 }, () => {
          runOnJS(hideMessage)();
        });
        scale.value = withTiming(0.8, { duration: 300 });
      }, duration);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }
  }, [visible, duration, opacity, scale, rotation, shouldRender]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View style={[styles.overlay, animatedStyle]} pointerEvents="none">
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>You found the secret dev mode!</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  messageContainer: {
    backgroundColor: GameColors.backgroundDark,
    borderWidth: 4,
    borderColor: GameColors.textGold,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 20,
    ...Platform.select({
      web: {
        boxShadow: '0 0 20px rgba(189, 154, 75, 0.8)',
      } as any,
      default: {
        shadowColor: GameColors.textGold,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 20,
      },
    }),
  },
  messageText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 16,
    color: GameColors.textGold,
    textAlign: 'center',
    letterSpacing: 2,
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
  },
});

