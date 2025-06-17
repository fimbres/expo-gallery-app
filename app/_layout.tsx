import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { store } from "../state/stores/photos-store";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Figtree': require('../assets/fonts/figtree-variable-fonts.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </Provider>
  );
}
