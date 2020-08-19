import React, { useState } from "react";
import PropTypes from "prop-types";

import { Platform, StyleSheet, Animated } from "react-native";

const CardFlip = ({
  duration = 600,
  flipZoom = 0.2,
  perspective = 800,
  style = {},
  children,
  getNextCard = () => {},
  getFlippedCard = () => {},
  onFlipStart = () => {},
  onFlipEnd = () => {}
}) => {

  const [state, setState] = useState({
    sides: children,
    rotateOrientation: "y",
    progress: new Animated.Value(0),
    rotation: new Animated.ValueXY({ x: 50, y: 50 }),
    zoom: new Animated.Value(0),
  })

  const setInitialState = () => {
    const { sides } = state
    const newSides = [getFlippedCard(), sides[1]]
    
    setState({
      ...state,
      sides: newSides
    })
  }

  const flip = () => {
    setInitialState()

    _flipTo({
      x: 50,
      y: 100
    });
  }

  const _flipTo = (toValue) => {
    const { rotation, progress, zoom } = state;
    onFlipStart();
    Animated.parallel([
      // Inverts text
      Animated.timing(progress, {
        toValue: 100,
        duration,
        useNativeDriver: true
      }),
      Animated.sequence([
        Animated.timing(zoom, {
          toValue: 100,
          duration: duration / 2,
          useNativeDriver: true
        }),
        Animated.timing(zoom, {
          toValue: 0,
          duration: duration / 2,
          useNativeDriver: true
        })
      ]),
      Animated.timing(rotation, {
        toValue,
        duration: duration,
        useNativeDriver: true
      })
    ]).start(() => {
      onFlipEnd();
      const { sides } = state
      const newSides = [sides[1], getNextCard()]
      
      setState({
        ...state,
        sides: newSides,
        progress: new Animated.Value(0),
        rotation: new Animated.ValueXY({ x: 50, y: 50 }),
        zoom: new Animated.Value(0)
      });
    });
  }

  const getCardATransformation = () => {
    //0, 50, 100
    const { progress, rotation } = state;

    const sideAOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [100, 0],
      extrapolate: "clamp"
    });

    const sideATransform = {
      opacity: sideAOpacity,
      zIndex: 1,
      transform: [{ perspective }]
    };
  
    // cardA Y-rotation
    const aYRotation = rotation.y.interpolate({
      inputRange: [0, 50, 100, 150],
      outputRange: ["-180deg", "0deg", "180deg", "0deg"],
      extrapolate: "clamp"
    });
    sideATransform.transform.push({ rotateY: aYRotation });
    
    return sideATransform;
  }

  const getCardBTransformation = () => {
    const { progress, rotation } = state;

    const sideBOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    const sideBTransform = {
      opacity: sideBOpacity,
      zIndex: 0,
      transform: [{ perspective: -1 * perspective }]
    };
    let bYRotation;
    if (Platform.OS === "ios") {
      // cardB Y-rotation
      bYRotation = rotation.y.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ["0deg", "180deg", "0deg", "-180deg"],
        extrapolate: "clamp"
      });
    } else {
      // cardB Y-rotation
      bYRotation = rotation.y.interpolate({
        inputRange: [0, 50, 100, 150],
        outputRange: ["0deg", "-180deg", "0deg", "180deg"],
        extrapolate: "clamp"
      });
    }
    sideBTransform.transform.push({ rotateY: bYRotation });
    return sideBTransform;
  }

  const { zoom, sides } = state;

  // Handle cardA transformation
  const cardATransform = getCardATransformation();

  // Handle cardB transformation
  const cardBTransform = getCardBTransformation();

  // Handle cardPopup
  const cardZoom = zoom.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 1 + flipZoom],
    extrapolate: "clamp"
  });

  const scaling = {
    transform: [{ scale: cardZoom }]
  };

  return (
    <Animated.View onTouchEnd={flip} style={[style, scaling]}>
      <Animated.View style={[styles.cardContainer, cardATransform]}>
        {sides[0]}
      </Animated.View>
      <Animated.View style={[styles.cardContainer, cardBTransform]}>
        {sides[1]}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});

CardFlip.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  duration: PropTypes.number,
  flipZoom: PropTypes.number,
  onFlip: PropTypes.func,
  onFlipEnd: PropTypes.func,
  onFlipStart: PropTypes.func,
  perspective: PropTypes.number
};

export default CardFlip 