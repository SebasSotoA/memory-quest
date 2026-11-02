import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  subtitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    marginBottom: 4,
    overflow: 'visible',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 4,
    overflow: 'visible',
  },
  underline: {
    width: 130,
    height: 2,
    backgroundColor: '#4CAF50',
    marginTop: 8,
    borderRadius: 1,
  },
});