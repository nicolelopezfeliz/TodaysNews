import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import { useEffect } from 'react';
import { fbInit } from './src/services/firebaseService';

const loadFonts = () => {
  //let barlowL = require('./fonts/Barlow-Light.ttf');
  //let barlowR = require('./fonts/Barlow-Regular.ttf');

  return Font.loadAsync({
    'Barlow-Light': require('./fonts/Barlow-Light.ttf'),
    'Barlow-Regular': require('./fonts/Barlow-Regular.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() =>  {
    fbInit();
  }, [])

  if (!fontLoaded) {
    return (
      <AppLoading 
      startAsync={loadFonts}
      onFinish={() => setFontLoaded(true)}
      onError={console.log('error ocurred')}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});
