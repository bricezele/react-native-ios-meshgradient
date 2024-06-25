import React, { useEffect, useState } from 'react';

import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { MeshGradientView } from 'react-native-ios-meshgradient';

const GRADIENT_SPEED = 0.05;

export default function SiriAnimation(): React.JSX.Element {
  const { width, height } = useWindowDimensions();
  const [maskTimer, setMaskTimer] = useState(0.0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMaskTimer((prev) => prev + GRADIENT_SPEED);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const sinInRange = (
    range: [number, number],
    offset: number,
    timeScale: number,
    t: number
  ): number => {
    const amplitude = (range[1] - range[0]) / 2;
    const midPoint = (range[1] + range[0]) / 2;
    return midPoint + amplitude * Math.sin(timeScale * t + offset);
  };

  const points = [
    [0, 0],
    [0.0, 0],
    [1, 0],
    [
      sinInRange([-0.8, -0.2], 0.439, 0.342, maskTimer),
      sinInRange([0.3, 0.7], 3.42, 0.984, maskTimer),
    ],
    [
      sinInRange([0.1, 0.8], 0.239, 0.084, maskTimer),
      sinInRange([0.2, 0.8], 5.21, 0.242, maskTimer),
    ],
    [
      sinInRange([1.0, 1.5], 0.939, 0.084, maskTimer),
      sinInRange([0.4, 0.8], 0.25, 0.642, maskTimer),
    ],
    [
      sinInRange([-0.8, 0.0], 1.439, 0.442, maskTimer),
      sinInRange([1.4, 1.9], 3.42, 0.984, maskTimer),
    ],
    [
      sinInRange([0.3, 0.6], 0.339, 0.784, maskTimer),
      sinInRange([1.0, 1.2], 1.22, 0.772, maskTimer),
    ],
    [
      sinInRange([1.0, 1.5], 0.939, 0.056, maskTimer),
      sinInRange([1.3, 1.7], 0.47, 0.342, maskTimer),
    ],
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
        style={[{ width, height }, styles.meshGradient]}
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
  meshGradient: {
    zIndex: 1,
    position: 'absolute',
  },
  animatedRectangle: {
    position: 'absolute',
    zIndex: 2,
  },
});
