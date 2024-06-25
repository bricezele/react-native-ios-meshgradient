import React from 'react';

import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { MeshGradientView } from 'react-native-ios-meshgradient';

export default function App(): React.JSX.Element {
  const { width, height } = useWindowDimensions();

  const points = [
    [0, 0],
    [0.5, 0],
    [1, 0],
    [0, 0.5],
    [0.5, 0.5],
    [1, 0.5],
    [0, 1],
    [0.5, 1],
    [1, 1],
  ];

  const colors = [
    '#FFFF00',
    '#800080',
    '#4B0082',
    '#FFA500',
    '#FF0000',
    '#0000FF',
    '#4B0082',
    '#008000',
    '#00FFFF',
  ];

  return (
    <View style={styles.container}>
      <MeshGradientView
        width={3}
        height={3}
        points={points}
        colors={colors}
        style={{ width, height }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
