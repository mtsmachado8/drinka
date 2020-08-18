import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { AppLoading } from 'expo'
import Deck from './src/components/Deck';

const App = () => {
  let [fontsLoaded] = useFonts({
    'Roboto': Roboto_400Regular,
    'RobotoMedium': Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <AppLoading/>
    )
  }

  return (
    <ImageBackground source={require('./assets/table.png')} style={styles.table}>
      <SafeAreaView justifyContent='center' alignItems='center' flex={1} style={styles.safeView}>
        <Deck/>
      </SafeAreaView>
    </ImageBackground>
  );                                                    
};

const styles = StyleSheet.create({
  table: {
    width: '100%',
    height: '100%',
  },
  safeView: {
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
})

export default App;
