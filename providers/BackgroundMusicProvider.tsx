import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Platform } from 'react-native';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

type MusicTrack = 'menu' | 'level1' | 'level2' | 'level3';

type BackgroundMusicContextValue = {
  ensurePlaying: (track?: MusicTrack, forcePlay?: boolean) => Promise<void>;
  pause: () => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  isPlaying: boolean;
};

const BackgroundMusicContext = createContext<BackgroundMusicContextValue | undefined>(undefined);

const getTrackSource = (track: MusicTrack) => {
  switch (track) {
    case 'menu':
      return require('@/assets/music/DwarvenMine.mp3');
    case 'level1':
    case 'level2':
      return require('@/assets/music/Pyramid.mp3');
    case 'level3':
      return require('@/assets/music/DarkFactory.mp3');
    default:
      return require('@/assets/music/DwarvenMine.mp3');
  }
};

const clampVolume = (volume: number) => {
  if (Number.isNaN(volume)) {
    return 1;
  }
  return Math.min(1, Math.max(0, volume));
};

export function BackgroundMusicProvider({ children }: { children: React.ReactNode }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const currentTrackRef = useRef<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userInteractedRef = useRef(false);

  const loadSound = useCallback(async (track: MusicTrack) => {
    // Si ya está cargada la misma canción, retornar el sonido actual
    if (soundRef.current && currentTrackRef.current === track) {
      return soundRef.current;
    }

    // Si hay un sonido cargado diferente, detenerlo y descargarlo completamente
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await soundRef.current.stopAsync();
        }
        await soundRef.current.unloadAsync();
      } catch (error) {
        // Ignorar errores al descargar
      }
      soundRef.current = null;
      currentTrackRef.current = null;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.warn('No se pudo configurar el modo de audio', error);
    }

    const source = getTrackSource(track);
    const { sound } = await Audio.Sound.createAsync(
      source,
      {
        volume: 0.6,
        isLooping: true,
        shouldPlay: false,
      },
      (status) => {
        if (!status.isLoaded) {
          return;
        }
        setIsPlaying(status.isPlaying ?? false);
      },
    );

    soundRef.current = sound;
    currentTrackRef.current = track;
    return sound;
  }, []);

  const ensurePlaying = useCallback(async (track: MusicTrack = 'menu', forcePlay: boolean = false) => {
    try {
      const sound = await loadSound(track);
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        if (!status.isPlaying) {
          try {
            await sound.playAsync();
            // Si se reproduce exitosamente, marcar que el usuario ha interactuado (en web)
            if (Platform.OS === 'web') {
              userInteractedRef.current = true;
            }
          } catch (playError: any) {
            // En web, si es un error de autoplay, no mostrar el error en consola
            // Solo intentar de nuevo si el usuario ya ha interactuado o si forcePlay es true
            if (Platform.OS === 'web' && playError?.name === 'NotAllowedError') {
              if (forcePlay || userInteractedRef.current) {
                // Si el usuario ya interactuó o se fuerza, intentar de nuevo
                try {
                  await sound.playAsync();
                  userInteractedRef.current = true;
                } catch (retryError) {
                  // Silenciar el error en el segundo intento
                }
              }
              // Si no se puede reproducir por autoplay, simplemente no hacer nada
              return;
            }
            // Para otros errores o plataformas, mostrar advertencia
            if (Platform.OS !== 'web' || forcePlay) {
              console.warn('No se pudo reproducir la música de fondo', playError);
            }
          }
        }
        // Verificar nuevamente después de un breve delay para asegurar que se reproduzca
        setTimeout(async () => {
          const newStatus = await sound.getStatusAsync();
          if (newStatus.isLoaded && !newStatus.isPlaying) {
            try {
              await sound.playAsync();
              if (Platform.OS === 'web') {
                userInteractedRef.current = true;
              }
            } catch (playError: any) {
              // En web, ignorar errores de autoplay silenciosamente
              if (Platform.OS === 'web' && playError?.name === 'NotAllowedError') {
                return;
              }
              if (forcePlay || Platform.OS !== 'web') {
                console.warn('Error al reproducir música en segundo intento:', playError);
              }
            }
          }
        }, 100);
      }
    } catch (error: any) {
      // En web, ignorar errores de autoplay silenciosamente
      if (Platform.OS === 'web' && error?.name === 'NotAllowedError') {
        return;
      }
      console.warn('No se pudo reproducir la música de fondo', error);
    }
  }, [loadSound]);

  const pause = useCallback(async () => {
    try {
      const sound = soundRef.current;
      if (!sound) {
        return;
      }
      const status = await sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await sound.pauseAsync();
      }
    } catch (error) {
      console.warn('No se pudo pausar la música de fondo', error);
    }
  }, []);

  const setVolume = useCallback(async (volume: number) => {
    try {
      const sound = soundRef.current;
      if (!sound) {
        return;
      }
      const nextVolume = clampVolume(volume);
      await sound.setVolumeAsync(nextVolume);
    } catch (error) {
      console.warn('No se pudo ajustar el volumen de la música de fondo', error);
    }
  }, []);

  useEffect(() => {
    // No reproducir automáticamente al montar, cada pantalla lo hará explícitamente
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync().catch(() => {
          // Silenciar cualquier error durante el desmontaje
        });
        soundRef.current = null;
        currentTrackRef.current = null;
      }
    };
  }, []);

  const value = useMemo<BackgroundMusicContextValue>(
    () => ({
      ensurePlaying,
      pause,
      setVolume,
      isPlaying,
    }),
    [ensurePlaying, pause, setVolume, isPlaying],
  );

  return <BackgroundMusicContext.Provider value={value}>{children}</BackgroundMusicContext.Provider>;
}

export function useBackgroundMusic() {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error('useBackgroundMusic debe utilizarse dentro de un BackgroundMusicProvider');
  }
  return context;
}


