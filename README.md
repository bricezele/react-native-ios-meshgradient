# React Native iOS MeshGradient

A React Native plugin that brings the SwiftUI MeshGradient API to React Native applications.

## Installation

```bash
npm install react-native-ios-meshgradient
```

or

```bash
yarn add react-native-ios-meshgradient
```

## Usage

Import the `MeshGradientView` component from the package:

```javascript
import { MeshGradientView } from 'react-native-ios-meshgradient';
```

## API

### MeshGradientView

The main component that renders a mesh gradient.

#### Props

| Prop     | Type                | Required | Description                                                   |
|----------|---------------------|----------|---------------------------------------------------------------|
| width    | number              | Yes      | The number of columns in the gradient mesh                    |
| height   | number              | Yes      | The number of rows in the gradient mesh                       |
| points   | [number, number][]  | Yes      | Array of coordinate pairs for each point in the gradient mesh |
| colors   | string[]            | Yes      | Array of color strings for each point in the gradient mesh    |
| style    | ViewStyle           | No       | Additional styles for the gradient view                       |

## Example

```tsx
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
  },
});
```

This example creates a 3x3 mesh gradient that fills the entire screen.

## Notes
- This component is only available for iOS 18+
- The `points` array should contain normalized coordinates representing the position of each color in the gradient mesh.
- The `colors` array should contain color strings in any valid CSS color format (hex, rgb, rgba, etc.).
- The number of points and colors should match the `width * height` value.

Learn more on [**MeshGradient SwiftUI API**](https://developer.apple.com/documentation/SwiftUI/MeshGradient)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

We're thrilled that you're considering contributing to our React Native MeshGradient plugin! This project is open to all developers, regardless of their experience level. Here's how you can participate:

### Opening Issues

- If you find a bug, please open an issue describing the problem, steps to reproduce it, and your environment (React Native version, OS, etc.).
- To propose new features, open an issue explaining your idea and its use case.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
