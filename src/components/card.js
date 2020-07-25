import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'

export default Card = ({ title, description, tip, trick, onClick }) => (
  <TouchableOpacity style={styles.card} onPress={onClick}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>
      <View style={styles.tipsAndTricks}>
        <Text style={styles.tip}>{tip ? `Dica: ${tip}` : null}</Text>
        <Text style={styles.trick}>{trick}</Text>
      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: '90%',
    backgroundColor: 'blue',
    borderRadius: 20
  },
  cardContent: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20
  },
  cardTitle: {
    color: 'white',
    fontSize: 60,
    alignSelf: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 35,
  },
  tipsAndTricks: {
    width: '100%'
  },
  tip: {
    color: 'white',
    fontSize: 28,
  },
  trick: {
    color: 'white',
    fontSize: 28,
    alignSelf: 'center'
  },
});
