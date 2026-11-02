import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { BackgroundCheckerboard } from '@/components/BackgroundCheckerboard';
import { GradientOverlay } from '@/components/GradientOverlay';
import { GameStatsRow } from '@/components/GameStatsRow';
import { GameHeader } from '@/components/GameHeader';
import { SuccessMessage } from '@/components/SuccessMessage';
import { Countdown } from '@/components/Countdown';
import { DiscoveredDeck } from '@/components/DiscoveredDeck';
import { Card } from '@/components/Card';
import { useGame } from '@/hooks/useGame';
import { useScore } from '@/hooks/useScore';
import { GAME_LEVELS } from '@/constants/gameLevels';
import { GameLevel } from '@/types/game';
import { calculateScore } from '@/utils/score';
import { GameColors } from '@/constants/gameColors';
import { useBackgroundMusic } from '@/providers/BackgroundMusicProvider';

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const level = parseInt(params.level as string, 10) as GameLevel;

  // Validar nivel
  const validLevel = (level >= 1 && level <= 3 ? level : 1) as GameLevel;
  const levelConfig = GAME_LEVELS[validLevel];

  // Música según el nivel
  const { ensurePlaying, pause } = useBackgroundMusic();

  // Estado para mensaje de éxito
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const wrongPairSoundRef = useRef<Audio.Sound | null>(null);
  const correctPairSoundRef = useRef<Audio.Sound | null>(null);

  // Precargar sonidos
  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Precargar sonido de par incorrecto
        const { sound: wrongSound } = await Audio.Sound.createAsync(
          require('@/assets/sfx/wrongPair.mp3'),
          { shouldPlay: false, volume: 0.7 }
        );
        wrongPairSoundRef.current = wrongSound;

        // Precargar sonido de par correcto
        const { sound: correctSound } = await Audio.Sound.createAsync(
          require('@/assets/sfx/startSound.wav'),
          { shouldPlay: false, volume: 0.7 }
        );
        correctPairSoundRef.current = correctSound;
      } catch (error) {
        console.warn('Error al precargar sonidos:', error);
      }
    };

    void loadSounds();

    return () => {
      if (wrongPairSoundRef.current) {
        wrongPairSoundRef.current.unloadAsync().catch(() => {});
        wrongPairSoundRef.current = null;
      }
      if (correctPairSoundRef.current) {
        correctPairSoundRef.current.unloadAsync().catch(() => {});
        correctPairSoundRef.current = null;
      }
    };
  }, []);

  // Callback para ocultar el mensaje de éxito
  const handleHideSuccessMessage = useCallback(() => {
    setShowSuccessMessage(false);
  }, []);

  // Callback cuando se encuentra un par
  const handlePairFound = useCallback(async () => {
    setShowSuccessMessage(true);
    // Reproducir sonido de par correcto
    try {
      const sound = correctPairSoundRef.current;
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.didJustFinish || status.positionMillis > 0) {
            await sound.setPositionAsync(0);
          }
          await sound.playAsync();
        }
      }
    } catch (error) {
      console.warn('No se pudo reproducir el sonido de par correcto', error);
    }
    // Feedback háptico en móvil
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  // Callback cuando se encuentra un par incorrecto
  const handleWrongPair = useCallback(async () => {
    try {
      const sound = wrongPairSoundRef.current;
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          if (status.didJustFinish || status.positionMillis > 0) {
            await sound.setPositionAsync(0);
          }
          await sound.playAsync();
        }
      }
    } catch (error) {
      console.warn('No se pudo reproducir el sonido de par incorrecto', error);
    }
    // Feedback háptico en móvil
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  }, []);

  // Callback para salir del nivel
  const handleExit = () => {
    // Navegar a la pantalla de selección de nivel
    router.push('/select-level');
  };

  const {
    cards,
    attempts,
    timeUsed,
    isGameComplete,
    isGameStarted,
    countdownActive,
    flippedCardsCount,
    lives,
    isGameLost,
    handleCardPress,
    completeCountdown,
  } = useGame(validLevel, handlePairFound, handleWrongPair);

  const { calculateAndSaveScore } = useScore();
  const hasNavigatedRef = useRef(false);
  const isMountedRef = useRef(true);
  const navigationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debug: Verificar estado del juego
  useEffect(() => {
    if (cards.length > 0) {
      console.log('[GameScreen] Estado del juego:', {
        cardsCount: cards.length,
        level: validLevel,
        isGameStarted,
        isGameComplete,
        attempts,
        timeUsed,
      });
    }
  }, [cards.length, validLevel, isGameStarted, isGameComplete, attempts, timeUsed]);

  // Calcular puntaje actual (actualizado en tiempo real, solo después del countdown)
  const currentScore = isGameStarted && !countdownActive
    ? calculateScore(timeUsed, attempts, validLevel)
    : 0;

  // Reproducir música según el nivel
  useEffect(() => {
    const musicTrack = validLevel === 3 ? 'level3' : (validLevel === 2 ? 'level2' : 'level1');
    void ensurePlaying(musicTrack);
    
    return () => {
      void pause();
    };
  }, [validLevel, ensurePlaying, pause]);

  // Limpiar timeouts cuando el componente se desmonte
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };
  }, []);

  // Ocultar mensaje de éxito cuando el juego termina, se pierde, o durante countdown
  useEffect(() => {
    if (isGameComplete || isGameLost || countdownActive || !isGameStarted) {
      setShowSuccessMessage(false);
    }
  }, [isGameComplete, isGameLost, countdownActive, isGameStarted]);

  // Cuando el juego se complete (victoria), navegar a resultados
  // Solo si el juego ha comenzado (después del countdown)
  useEffect(() => {
    if (isGameComplete && isGameStarted && !countdownActive && !isGameLost && timeUsed > 0 && attempts > 0 && !hasNavigatedRef.current && isMountedRef.current) {
      hasNavigatedRef.current = true;
      
      // Limpiar timeout anterior si existe
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
      
      const handleGameComplete = async () => {
        // Verificar que el componente aún esté montado y no se haya navegado ya
        if (!isMountedRef.current || !hasNavigatedRef.current) {
          return;
        }
        
        try {
          const result = await calculateAndSaveScore(timeUsed, attempts, validLevel, true, lives);
          
          // Verificar nuevamente antes de navegar
          if (isMountedRef.current && hasNavigatedRef.current) {
            hasNavigatedRef.current = false; // Marcar como navegando para evitar doble navegación
            try {
              router.replace({
                pathname: '/results',
                params: {
                  score: result.score.toString(),
                  time: timeUsed.toString(),
                  attempts: attempts.toString(),
                  level: validLevel.toString(),
                  isNewRecord: result.isNewRecord.toString(),
                  won: 'true',
                  lives: lives.toString(),
                },
              });
            } catch (navError) {
              console.error('Error navigating to results:', navError);
            }
          }
        } catch (error) {
          console.error('Error completing game:', error);
          if (isMountedRef.current) {
            hasNavigatedRef.current = false; // Reset para permitir reintento solo si está montado
          }
        }
      };
      
      // Pequeño delay para permitir que las animaciones terminen
      navigationTimeoutRef.current = setTimeout(() => {
        handleGameComplete();
      }, 800);
    }
    
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameComplete, isGameStarted, countdownActive, isGameLost, timeUsed, attempts, validLevel, lives]);

  // Cuando el juego se pierda (sin vidas), navegar a resultados
  useEffect(() => {
    if (isGameLost && isGameStarted && !countdownActive && !hasNavigatedRef.current && isMountedRef.current) {
      hasNavigatedRef.current = true;
      
      // Limpiar timeout anterior si existe
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
      
      const handleGameLost = async () => {
        // Verificar que el componente aún esté montado y no se haya navegado ya
        if (!isMountedRef.current || !hasNavigatedRef.current) {
          return;
        }
        
        try {
          // Calcular puntaje incluso si perdió (será 0 o muy bajo)
          const result = await calculateAndSaveScore(timeUsed, attempts, validLevel, false, lives);
          
          // Verificar nuevamente antes de navegar
          if (isMountedRef.current && hasNavigatedRef.current) {
            hasNavigatedRef.current = false; // Marcar como navegando para evitar doble navegación
            try {
              router.replace({
                pathname: '/results',
                params: {
                  score: result.score.toString(),
                  time: timeUsed.toString(),
                  attempts: attempts.toString(),
                  level: validLevel.toString(),
                  isNewRecord: 'false',
                  won: 'false',
                  lives: lives.toString(),
                },
              });
            } catch (navError) {
              console.error('Error navigating to results:', navError);
            }
          }
        } catch (error) {
          console.error('Error handling game loss:', error);
          if (isMountedRef.current) {
            hasNavigatedRef.current = false; // Reset para permitir reintento solo si está montado
          }
        }
      };
      
      // Pequeño delay para permitir que las animaciones terminen
      navigationTimeoutRef.current = setTimeout(() => {
        handleGameLost();
      }, 1000); // Delay un poco más largo para que se vea que perdió
    }
    
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
        navigationTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameLost, isGameStarted, countdownActive, timeUsed, attempts, validLevel, lives]);

  // Calcular dimensiones del grid (responsive para móvil)
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const horizontalPadding = Platform.select({
    web: 16,
    default: 12,
  });
  const gap = Platform.select({
    web: 8,
    default: 6,
  });
  
  // Reducir tamaño de cartas en 25% (factor de escala 0.75)
  const scaleFactor = 0.75;
  const cardsPerRow = levelConfig.columns;
  
  // Calcular el ancho disponible considerando el padding del contenedor
  // El scrollContent tiene paddingHorizontal, así que lo consideramos
  const containerPadding = horizontalPadding * 2;
  const availableWidth = screenWidth - containerPadding;
  
  // Calcular el ancho de cada carta para que quepan exactamente en el espacio disponible
  const totalGapWidth = gap * (cardsPerRow - 1);
  const calculatedCardWidth = Math.max(50, Math.floor((availableWidth - totalGapWidth) / cardsPerRow));
  
  // Calcular el ancho total del grid (ancho de todas las cartas + gaps)
  const gridTotalWidth = (calculatedCardWidth * cardsPerRow) + totalGapWidth;
  
  // Asegurar que el grid no exceda el ancho disponible (por seguridad)
  const finalGridWidth = Math.min(gridTotalWidth, availableWidth);
  
  // Determinar tamaño de carta según nivel (para referencia, pero usamos calculatedCardWidth)
  const getCardSize = (): 'small' | 'medium' | 'large' => {
    if (validLevel === 3) return 'small';
    if (validLevel === 2) return 'medium';
    return 'medium';
  };
  
  const cardSize = getCardSize();
  
  // Calcular altura de carta manteniendo proporción (75/105 ≈ 0.714)
  const cardAspectRatio = 75 / 105;
  const calculatedCardHeight = Math.max(70, Math.floor(calculatedCardWidth / cardAspectRatio)); // Mínimo 70px

  // No validar aquí porque las cartas se generan asíncronamente
  // El componente debe renderizarse siempre y mostrar las cartas cuando estén disponibles

  return (
    <View style={styles.wrapper}>
      <BackgroundCheckerboard />
      <GradientOverlay />
      {countdownActive && (
        <Countdown onComplete={completeCountdown} duration={1} />
      )}
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.gameContent}>
        <GameHeader onExit={handleExit} level={validLevel} />
        <SuccessMessage
          visible={showSuccessMessage}
          onHide={handleHideSuccessMessage}
          duration={600}
        />
        <View style={styles.mainContent}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            style={styles.scrollView}
          >
            <View style={styles.content}>
              <GameStatsRow time={timeUsed} score={currentScore} level={validLevel} lives={lives} />

              {cards.length > 0 && calculatedCardWidth > 0 && calculatedCardHeight > 0 ? (
                <View style={styles.cardsContainer}>
                  <View style={[styles.grid, { width: finalGridWidth }]}>
                    {cards.map((card, index) => {
                      const row = Math.floor(index / cardsPerRow);
                      const col = index % cardsPerRow;
                      const isLastInRow = col === cardsPerRow - 1;
                      return (
                        <View
                          key={card.id}
                          style={[
                            styles.cardWrapper,
                            {
                              width: calculatedCardWidth,
                              height: calculatedCardHeight,
                              marginRight: isLastInRow ? 0 : gap,
                              marginBottom: gap,
                            },
                          ]}
                        >
                          <Card
                            id={card.id}
                            imageSource={card.imageSource}
                            isFlipped={card.isFlipped}
                            isMatched={card.isMatched}
                            onPress={() => handleCardPress(card.id)}
                            disabled={countdownActive || isGameComplete || (flippedCardsCount >= 2 && !card.isFlipped)}
                            size={cardSize}
                          />
                        </View>
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>
                    {cards.length === 0 
                      ? 'Cargando cartas...' 
                      : `Calculando dimensiones... (W: ${calculatedCardWidth}, H: ${calculatedCardHeight})`}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
          <View style={styles.deckContainer}>
            <DiscoveredDeck cards={cards} />
          </View>
        </View>
      </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: GameColors.backgroundDark,
  },
  container: {
    flex: 1,
  },
  gameContent: {
    flex: 1,
    zIndex: 1,
    position: 'relative',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Platform.select({
      web: 16,
      default: 12,
    }),
    paddingBottom: Platform.select({
      web: 100,
      default: 110,
    }),
  },
  deckContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Platform.select({
      web: 16,
      default: 12,
    }),
    flex: 1,
    justifyContent: 'flex-start',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: Platform.select({
      web: 16,
      default: 12,
    }),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontFamily: 'PressStart2P_400Regular',
    fontSize: 12,
    color: '#FFF2DB',
  },
});

