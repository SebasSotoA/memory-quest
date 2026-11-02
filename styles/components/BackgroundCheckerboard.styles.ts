import { StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: GameColors.backgroundDark,
  },
  containerWeb: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: GameColors.backgroundDark,
    // En web, el gradiente overlay proporciona suficiente variación visual
  },
  tile: {
    position: 'absolute',
  },
});