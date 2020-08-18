import React, { useState } from 'react'
import Card from './Card'
import deck from '../deck'
import { StyleSheet, View } from 'react-native'
import CardFlip from './CardFlip';

const Deck = () => {
  const [currentCard, setCurrentCard] = useState({ type: 'FLIPPED' })
  const [nextCard, setNextCard] = useState(deck[Math.floor(Math.random() * deck.length)])
  
  const takeNewCard = () => {
    setTimeout(() => {
      setCurrentCard(nextCard)
      setNextCard(deck[Math.floor(Math.random() * deck.length)])
    }, 2000)
  }

  return (
    <View style={styles.deck}>
      <View style={styles.backCard3}/>
      <View style={styles.backCard2}/>
      <Card type='BACK_CARD'/>
      <CardFlip style={styles.card}>
        <Card {...currentCard} onClick={takeNewCard}/>
        <Card {...nextCard} onClick={takeNewCard}/>
      </CardFlip>
    </View>
  )
}

const styles = StyleSheet.create({
  deck: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    height: '98%',
  },
  card: {
    width: '95%',
    height: '98%',
  },
  backCard2: {  
    position: 'absolute',
    left: 2,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    width: '95%',
    height: '98%',
    backgroundColor: '#EDAC54',
  },
  backCard3: {
    position: 'absolute',
    left: -1,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    width: '95%',
    height: '98%',
    backgroundColor: '#23B751',
  }
})

export default Deck