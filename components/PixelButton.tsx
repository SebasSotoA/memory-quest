import React, { useState } from 'react';
import { Text, Pressable, View} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { GameColors } from '@/constants/gameColors';
import { styles } from '@/styles/components/PixelButton.styles';

type PixelButtonProps = {
  label?: string;
  onPress?: () => void;
  size?: 'large' | 'small';
  imageSource?: any;
  pressedImageSource?: any;
  variant?: 'gradient' | 'image';
};

/**
 * Componente de botón pixelado reutilizable
 * Soporta estados normal y pressed
 * Puede usar gradiente o imágenes
 */
export function PixelButton({
  label,
  onPress,
  size = 'small',
  imageSource,
  pressedImageSource,
  variant = 'gradient',
}: PixelButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonStyle = size === 'large' ? styles.largeButton : styles.smallButton;
  const textStyle = size === 'large' ? styles.largeText : styles.smallText;

  // Manejar eventos de presión de forma más robusta
  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    // Mantener el estado pressed visible un momento antes de resetear
    setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  if (variant === 'image' && imageSource) {
    const imageStyle = size === 'large' ? styles.largeImageButton : styles.smallImageButton;
    
    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.imageButtonContainer,
          size === 'small' && styles.imageButtonContainerSmall,
        ]}
        // Área táctil más grande para mejor UX en móvil
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        // Deshabilitar el efecto ripple de Android
        android_ripple={null}
      >
        <View style={[styles.imageWrapper, imageStyle]}>
          {/* Imagen normal - siempre renderizada */}
          <Image
            source={imageSource}
            style={[
              imageStyle,
              styles.buttonImage,
              styles.imageBase,
              { opacity: isPressed && pressedImageSource ? 0 : 1 },
            ]}
            contentFit="contain"
            cachePolicy="memory-disk"
            transition={0}
          />
          {/* Imagen presionada - solo si existe */}
          {pressedImageSource && (
            <Image
              source={pressedImageSource}
              style={[
                imageStyle,
                styles.buttonImage,
                styles.imagePressedOverlay,
                { opacity: isPressed ? 1 : 0 },
              ]}
              contentFit="contain"
              cachePolicy="memory-disk"
              transition={0}
            />
          )}
        </View>
      </Pressable>
    );
  }

  // Botón con gradiente (para PLAY)
  return (
    <View style={styles.buttonWrapper}>
      {/* Sombra para efecto 3D */}
      <View style={[styles.shadowLayer, size === 'large' && styles.shadowLayerLarge]} />
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          buttonStyle,
          isPressed && styles.pressedButton,
        ]}
        // Área táctil más grande para mejor UX en móvil
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        // Deshabilitar el efecto ripple de Android
        android_ripple={null}
      >
        {/* @ts-expect-error - expo-linear-gradient compatibility with React 19 */}
        <LinearGradient
          colors={GameColors.gradient.colors}
          locations={GameColors.gradient.locations}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={[
            styles.borderContainer,
            size === 'small' && styles.borderContainerSmall,
            isPressed && styles.pressedBorder
          ]}>
            {/* Bordes para efecto embossed */}
            {!isPressed && (
              <>
                <View style={styles.borderTop} />
                <View style={styles.borderLeft} />
              </>
            )}
            <View style={[styles.borderBottom, isPressed && styles.pressedBorderBottom]} />
            <View style={[styles.borderRight, isPressed && styles.pressedBorderRight]} />
            
            <Text style={[textStyle, isPressed && styles.pressedText]}>{label}</Text>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
}