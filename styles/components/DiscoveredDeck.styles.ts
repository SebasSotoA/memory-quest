import { Platform, StyleSheet } from 'react-native';
import { GameColors } from '@/constants/gameColors';
import { GameFonts } from '@/constants/gameFonts';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 100,
    paddingVertical: Platform.select({
      web: 8,
      default: 12,
    }),
    paddingHorizontal: Platform.select({
      web: 16,
      default: 12,
    }),
    backgroundColor: 'rgba(11, 60, 29, 0.8)',
    borderTopWidth: 2,
    borderTopColor: GameColors.borderDark,
    ...Platform.select({
      web: {
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.3)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
      },
    }),
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.select({
      web: 8,
      default: 6,
    }),
  },
  headerText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 10,
      default: 8,
    }),
    color: GameColors.textCream,
    marginRight: 8,
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  countText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 10,
      default: 8,
    }),
    color: GameColors.textGold,
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontFamily: GameFonts.pixelFont,
    fontSize: Platform.select({
      web: 10,
      default: 8,
    }),
    color: GameColors.textCream,
    opacity: 0.5,
    ...Platform.select({
      web: {
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
      } as any,
      default: {
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 0,
      },
    }),
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Platform.select({
      web: 4,
      default: 2,
    }),
  },
  cardContainer: {
    marginHorizontal: Platform.select({
      web: 6,
      default: 4,
    }),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 50,
    height: 70,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: GameColors.textCream,
    backgroundColor: '#fff',
    ...Platform.select({
      web: {
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
      } as any,
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 4,
      },
    }),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
});