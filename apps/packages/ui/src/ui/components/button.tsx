import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

interface ButtonProps extends Omit<PressableProps, "onPress" | "style"> {
  children: ReactNode;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle> | CSSProperties;
  onPress?: PressableProps["onPress"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  appName?: string;
}

export const Button = ({
  children,
  className,
  textClassName,
  style,
  onPress,
  onClick,
  disabled,
  type = "button",
  appName,
  ...pressableProps
}: ButtonProps) => {
  const handlePress = (event: any) => {
    if (disabled) return;
    if (onPress) onPress(event);
    if (onClick) onClick(event);
    if (!onPress && !onClick && appName)
      alert(`Hello from your ${appName} app!`);
  };

  if (Platform.OS === "web") {
    return (
      <button
        type={type}
        disabled={disabled}
        className={className}
        style={style as CSSProperties}
        onClick={handlePress}
      >
        {typeof children === "string" ? (
          textClassName ? (
            <span className={textClassName}>{children}</span>
          ) : (
            children
          )
        ) : (
          children
        )}
      </button>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={className}
      style={[
        styles.button,
        style as StyleProp<ViewStyle>,
        disabled && styles.disabled,
      ]}
      {...pressableProps}
    >
      {typeof children === "string" ? (
        <Text
          className={textClassName}
          style={textClassName ? undefined : styles.text}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
});
