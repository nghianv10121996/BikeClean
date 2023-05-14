import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UserContextProvider } from './utils/Provider/UserProvider';
import Toast from 'react-native-toast-message';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <UserContextProvider>
        <Navigation colorScheme={colorScheme} />
      </UserContextProvider>
      <Toast
        position='bottom'
        bottomOffset={20}
      />
      {/* <StatusBar backgroundColor="#A4CFF1" /> */}
    </SafeAreaProvider>
  );
}
