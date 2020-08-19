import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import FlippedCardIcon from '../../assets/flippedCardIcon.svg'
import Dash from 'react-native-dash'
import Lamp from '../../assets/lamp.svg'

const opacityOnTouch = 0

const Card = ({ title, description, tip, trick, type, onClick }) => (
  <>
    {type === 'FLIPPED' ? (
      <TouchableOpacity activeOpacity={opacityOnTouch} style={styles(type).flippedCard} onPress={onClick}>
        <FlippedCardIcon height='145%' width='145%'/>
      </TouchableOpacity>
    ) : type === 'BACK_CARD' ? (
      <TouchableOpacity activeOpacity={opacityOnTouch} style={styles(type).backCard} onPress={onClick}>
        <FlippedCardIcon height='145%' width='145%'/>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity activeOpacity={opacityOnTouch} style={styles(type).card} onPress={onClick}>
        <View style={styles(type).cardContent}>
          <View style={styles(type).titleView}>
            <Text style={styles(type).title}>{title}</Text>
          </View>
          <View style={styles(type).contentView}>
            <Text style={styles(type).contentText}>{description}</Text>
            {tip ? (
              <View>
                <Dash dashColor='white' dashThickness={1} dashGap={3} dashLength={1}/>
                <View style={styles(type).tipRow}>
                  <Lamp style={{marginRight: 5}}/>
                  <Text style={styles(type).tipText}>{tip}</Text>
                </View>
              </View>
            ) : null}
          </View> 
          <View style={styles(type).trickView}>
            <Text style={styles(type).trickText}>{trick}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )}
  </>
)

export default Card

const styles = type => {
  const typeColors = {
    FLIPPED: {
      main: '#5477ED',
      border: '#F6F6F6'
    },
    BACK_CARD: {
      main: '#5477ED',
      border: '#F6F6F6'
    },
    NORMAL: {
      main: '#5477ED',
      contrast: '#465EAC',
      border: '#FFFFFF'
    },
    GOOD_LUCK: {
      main: '#23B751',
      contrast: '#639673',
      border: '#FFFFFF'
    },
    BAD_LUCK: {
      main: '#EDAC54',
      contrast: '#B99A8B',
      border: '#FFFFFF'
    }
  }

  return StyleSheet.create({
    card: {
      width: '100%',
      height: '100%',
      backgroundColor: typeColors[type].main,
      borderRadius: 20,
      borderWidth: 10,
      borderColor: typeColors[type].border,
    },
    backCard: {
      position: 'absolute',
      left: 6,
      borderRadius: 20,
      borderWidth: 10,
      width: '95%',
      height: '98%',
      backgroundColor: typeColors[type].main,
      borderColor: typeColors[type].border,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    flippedCard: {
      width: '100%',
      height: '100%',
      backgroundColor: typeColors[type].main,
      borderRadius: 20,
      borderWidth: 10,
      borderColor: typeColors[type].border,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardContent: {
      height: '100%',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    titleView: {
      width: '100%',
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: 'white',
      textAlign: 'center',
      justifyContent: 'center',
      fontSize: 57,
      padding: 10,
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 1,
      fontFamily: 'RobotoMedium',
    },
    contentView: {
      width: '100%',
      backgroundColor: typeColors[type].contrast,
      borderTopWidth: 5,
      borderBottomWidth: 5,
      borderColor: '#FFFFFF',
    },
    contentText: {
      color: 'white',
      fontFamily: 'Roboto',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 1,
      width: '100%',
      padding: 5,
      fontSize: 29,
    },
    tipRow: {
      padding: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    tipText: {
      color: 'white',
      fontSize: 19,
      marginRight: 10,
      fontFamily: 'Roboto',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 1,
    },
    trickView: {
      width: '100%',
      borderTopStartRadius: 1,
      borderTopEndRadius: 1,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
      borderTopWidth: 5,
      borderColor: '#FFFFFF',
      backgroundColor: typeColors[type].contrast,
      fontFamily: 'Roboto',
    },
    trickText: {
      color: 'white',
      fontSize: 23,
      padding: 3,
      textShadowColor: 'rgba(0, 0, 0, 0.4)',
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 1,
      alignSelf: 'center',
      fontFamily: 'Roboto',
    },
  })
}
