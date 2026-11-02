import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/styles/components/GameHeader.styles';
import { ConfirmModal } from './ConfirmModal';
import { PixelButton } from './PixelButton';

type GameHeaderProps = {
  onExit: () => void;
  level: number;
};

export function GameHeader({ onExit, level }: GameHeaderProps) {
  const [showExitModal, setShowExitModal] = useState(false);

  const handleExitPress = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    onExit();
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContent}>
          <View style={styles.exitButtonContainer}>
            <PixelButton
              label=""
              size="small"
              imageSource={require('@/assets/images/buttons/quitTextButton.png')}
              pressedImageSource={require('@/assets/images/buttons/quitTextButtonPressed.png')}
              variant="image"
              onPress={handleExitPress}
            />
          </View>
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>NIVEL {level}</Text>
          </View>
          <View style={styles.spacer} />
        </View>
      </View>
      <ConfirmModal
        visible={showExitModal}
        title="SALIR DEL NIVEL"
        message="¿Estás seguro de que quieres salir? Tu progreso no se guardará."
        onConfirm={handleConfirmExit}
        onCancel={handleCancelExit}
        confirmText="SALIR"
        cancelText="CANCELAR"
      />
    </>
  );
}