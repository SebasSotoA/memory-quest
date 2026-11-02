import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2000,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  modal: {
    width: Platform.select<number | string>({
    web: 320,
    default: '85%',
    }),
    maxWidth: 400,
    backgroundColor: GameColors.gradient.colors[4], // '#FFF2DB'
    borderRadius: 8,
    borderWidth: 4,
    borderColor: GameColors.borderDark,
    ...Platform.select({
      web: {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 20,
      },
    }),
  },
  content: {
    padding: Platform.select({
      web: 24,
      default: 20,
    }),
    alignItems: 'center',
  },
  title: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 18,
      default: 16,
    }),
    color: GameColors.textOutline,
    textAlign: 'center',
    marginBottom: Platform.select({
      web: 16,
      default: 12,
    }),
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.6)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  message: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 12,
      default: 10,
    }),
    color: GameColors.textOutline,
    textAlign: 'center',
    marginBottom: Platform.select({
      web: 24,
      default: 20,
    }),
    lineHeight: Platform.select({
      web: 18,
      default: 16,
    }),
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: Platform.select({
      web: 12,
      default: 10,
    }),
  },
  button: {
    flex: 1,
    paddingVertical: Platform.select({
      web: 12,
      default: 10,
    }),
    paddingHorizontal: Platform.select({
      web: 16,
      default: 14,
    }),
    borderRadius: 4,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: {
        boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 0,
        elevation: 3,
      },
    }),
  },
  cancelButton: {
    backgroundColor: GameColors.backgroundDark,
    borderColor: GameColors.borderDark,
  },
  confirmButton: {
    backgroundColor: GameColors.gradient.colors[0], // '#BD9A4B'
    borderColor: GameColors.borderDark,
  },
  buttonPressed: {
    transform: [{ translateY: 2 }],
    opacity: 0.9,
  },
  cancelButtonText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 10,
      default: 8,
    }),
    color: GameColors.textCream,
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px rgba(0, 0, 0, 0.8)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
  confirmButtonText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 10,
      default: 8,
    }),
    color: GameColors.textCream,
    ...Platform.select({
      web: {
        textShadow: '1px 1px 0px rgba(0, 0, 0, 0.8)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
      },
    }),
  },
});