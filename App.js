import React from 'react';
import { StyleSheet, Text, View, UIManager, Platform } from 'react-native';

import AppContainer from './routes';

export default function App() {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental){ 
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <AppContainer/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
