import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ios-meshgradient' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type IosMeshgradientProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'IosMeshgradientView';

export const IosMeshgradientView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<IosMeshgradientProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
