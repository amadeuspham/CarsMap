import React from 'react';
import { UIManager, Platform } from 'react-native';

import AppContainer from './routes';

export default function App() {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){ 
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <AppContainer/>
  );
}
