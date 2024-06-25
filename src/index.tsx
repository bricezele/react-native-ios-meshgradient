import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';
import type { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';

const LINKING_ERROR =
  `The package 'react-native-meshgradient' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type MeshgradientProps = {
  colors: string[];
  points: number[][];
  width: number;
  height: number;
  style?: StyleProp<ViewStyle> | undefined;
};

const ComponentName = 'MeshgradientView';

export const MeshGradientView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<MeshgradientProps>(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };
