import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    minWidth: 300,
    maxWidth: 350,
    position: 'relative',
    marginTop: 60,
  },
  shadowLayer: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: -3,
    bottom: -3,
    borderRadius: 8,
    backgroundColor: GameColors.shadowDark,
    zIndex: 0,
  },
  gradient: {
    borderRadius: 8,
    padding: 3,
    zIndex: 1,
  },
  borderContainer: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GameColors.borderDark,
    paddingHorizontal: 20,
    paddingVertical: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GameColors.borderLight,
    opacity: 0.6,
  },
  borderLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 2,
    backgroundColor: GameColors.borderLight,
    opacity: 0.6,
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.8,
  },
  borderRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 2,
    backgroundColor: GameColors.shadowDark,
    opacity: 0.8,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  title: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 24,
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px #2C1A0A',
      },
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  text: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 4,
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px #2C1A0A',
      },
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
  highlightText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 12,
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px #2C1A0A',
      },
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  nameText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: 11,
    color: '#FFF2DB',
    textAlign: 'center',
    marginTop: 6,
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px #2C1A0A',
      },
      default: {
        textShadowColor: GameColors.textOutline,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
});