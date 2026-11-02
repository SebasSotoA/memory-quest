import { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { styles } from '@/styles/components/ConfirmModal.styles';

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function ConfirmModal({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'CONFIRMAR',
  cancelText = 'CANCELAR',
}: ConfirmModalProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, { damping: 12, stiffness: 150 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      scale.value = withTiming(0.8, { duration: 200 }, () => {
        runOnJS(setIsVisible)(false);
      });
    }
  }, [visible, opacity, scale]);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value * 0.7, // Overlay semitransparente
    };
  });

  const modalStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="auto">
      <Animated.View 
        style={[styles.overlay, overlayStyle]} 
        pointerEvents="auto"
      />
      <Animated.View 
        style={[styles.modal, modalStyle]}
        pointerEvents="auto"
      >
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonsContainer}>
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => [
                styles.button,
                styles.cancelButton,
                pressed && styles.buttonPressed,
              ]}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={({ pressed }) => [
                styles.button,
                styles.confirmButton,
                pressed && styles.buttonPressed,
              ]}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

