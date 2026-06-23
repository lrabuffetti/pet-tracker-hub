// NativeWind adds `className` support to React Native components at build
// time, but this package doesn't depend on nativewind directly, so we
// replicate the relevant part of its type augmentation here.
import "react-native";

declare module "react-native" {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface PressableProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
}
