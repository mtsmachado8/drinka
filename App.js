/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <SafeAreaView flex={1} justifyContent="center" alignItems="center">
      <View style={styles.card}>
        <Text style={styles.cardTitle}>História</Text>
        <Text style={styles.cardText}>
          Comece a contar uma história. Cada pessoa terá que repetir toda a
          história anterior e acrescentar uma frase!
        </Text>
        <View>
          <Text style={styles.tipsAndTricks}>Dica: Era uma vez...</Text>
          <Text style={styles.tipsAndTricks}>Quem errar bebe!!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tipsAndTricks: {
    color: 'white',
    fontSize: 28,
  },
  titleView: {
    alignSelf: 'center',
  },
  card: {
    width: '90%',
    height: '90%',
    backgroundColor: 'blue',
    borderRadius: 20,
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'flex-start',
  },
  cardText: {
    color: 'white',
    fontSize: 35,
  },
  cardTitle: {
    color: 'white',
    fontSize: 60,
    alignSelf: 'center',
  },
});

export default App;
