import React, { useState } from "react";
import PropTypes from "prop-types";

import { Platform, StyleSheet, Animated } from "react-native";

const CardFlip = ({
  duration = 5000,
  flipZoom = 0.09,
  perspective = 800,
  style = {},
  children,
  getNextCard,
  onFlip,
  onFlipStart,
  onFlipEnd
}) => {

  const [state, setState] = useState({
    side: 0,
    sides: children,
    rotateOrientation: "y",
    progress: new Animated.Value(0),
    rotation: new Animated.ValueXY({ x: 50, y: 50 }),
    zoom: new Animated.Value(0),
  })

  const flip = () => {
    const { side } = state;
    _flipTo({
      x: 50,
      y: side === 0 ? 100 : 50
    });
    setState({
      ...state,
      side: side === 0 ? 1 : 0,
    });
  }

  const _flipTo = (toValue) => {
    const { rotation, progress, zoom, side } = state;
    onFlip(side === 0 ? 1 : 0);
    onFlipStart(side === 0 ? 1 : 0);
    Animated.parallel([
      // Inverts text
      Animated.timing(progress, {
        toValue: side === 0 ? 100 : 0,
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
      onFlipEnd(side === 0 ? 1 : 0);
    });
  }

  const getCardATransformation = () => {
    //0, 50, 100
    const { progress, rotation, side } = state;

    const sideAOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [100, 0],
      extrapolate: "clamp"
    });

    const sideATransform = {
      opacity: sideAOpacity,
      zIndex: side === 0 ? 1 : 0,
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
    const { progress, rotation, side } = state;

    const sideBOpacity = progress.interpolate({
      inputRange: [50, 51],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    const sideBTransform = {
      opacity: sideBOpacity,
      zIndex: side === 0 ? 0 : 1,
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

CardFlip.defaultProps = {
  style: {},
  duration: 500,
  flipZoom: 0.09,
  perspective: 800,
  onFlip: () => { },
  onFlipStart: () => { },
  onFlipEnd: () => { }
};

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