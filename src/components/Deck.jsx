import React, { useState } from 'react'
import Card from './Card'
import deck from '../deck'
import { StyleSheet, View } from 'react-native'
import CardFlip from './CardFlip';

const Deck = () => {
  const [currentCard, setCurrentCard] = useState({ type: 'FLIPPED' })
  const [nextCard, setNextCard] = useState(deck[Math.floor(Math.random() * deck.length)])
  
  const takeNewCard = () => {
    setCurrentCard(nextCard)
    setNextCard(deck[Math.floor(Math.random() * deck.length)])
    return <Card {...nextCard}/>
  }

  const getFlippedCard = () => <Card type='FLIPPED'/>

  return (
    <View style={styles.deck}>
      <View style={styles.backCard3}/>
      <View style={styles.backCard2}/>
      <View style={styles.backCard}/>
      <Card type='BACK_CARD'/>
      <CardFlip style={styles.card} getFlippedCard={getFlippedCard} getNextCard={takeNewCard}>
        <Card {...currentCard}/>
        <Card {...nextCard}/>
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
  backCard: {  
    position: 'absolute',
    left: 3,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    width: '95%',
    height: '98%',
    backgroundColor: '#5477ED',
  },
  backCard2: {  
    position: 'absolute',
    left: 0,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: '95%',
    height: '98%',
    backgroundColor: '#EDAC54',
  },
  backCard3: {
    position: 'absolute',
    left: -3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    width: '95%',
    height: '98%',
    backgroundColor: '#23B751',
  }
})

export default Deck