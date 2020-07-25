import React, { useState } from 'react';
import { SafeAreaView } from 'react-native'
import Card from './src/components/card'
import deck from './src/deck'

const App = () => {
  const initialFlippedCard = {
    title: '',
    description: '',
    tip: '',
    trick: ''
  }
  const takeNewCard = () => setCurrentCard(deck[Math.floor(Math.random() * deck.length)])
  const [currentCard, setCurrentCard] = useState(initialFlippedCard)

  return (
    <SafeAreaView flex={1} justifyContent="center" alignItems="center">
      <Card {...currentCard} onClick={takeNewCard}/>
    </SafeAreaView>
  );
};

export default App;
