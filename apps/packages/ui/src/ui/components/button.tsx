import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "link";

interface ButtonProps extends Omit<PressableProps, "onPress" | "style"> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle> | CSSProperties;
  onPress?: PressableProps["onPress"];
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  appName?: string;
}

const VARIANT_CLASSES: Record<
  ButtonVariant,
  { className: string; textClassName: string }
> = {
  primary: {
    className:
      "w-full rounded-xl bg-indigo-600 py-3 disabled:cursor-not-allowed disabled:opacity-50",
    textClassName: "text-lg font-bold text-white",
  },
  secondary: {
    className:
      "w-full rounded-xl border border-gray-200 bg-gray-100 py-3 disabled:cursor-not-allowed disabled:opacity-50",
    textClassName: "text-lg font-semibold text-gray-900",
  },
  outlined: {
    className:
      "w-full rounded-xl border-2 border-indigo-600 bg-transparent py-3 disabled:cursor-not-allowed disabled:opacity-50",
    textClassName: "text-lg font-semibold text-indigo-600",
  },
  link: {
    className:
      "bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-50",
    textClassName: "text-base font-medium text-[#2e78b7] underline",
  },
};

const VARIANT_WEB_STYLES: Record<ButtonVariant, CSSProperties> = {
  primary: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#4f46e5",
    padding: "12px 20px",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 18,
    border: "none",
    cursor: "pointer",
  },
  secondary: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    padding: "12px 20px",
    color: "#111827",
    fontWeight: 600,
    fontSize: 18,
    border: "1px solid #e5e7eb",
    cursor: "pointer",
  },
  outlined: {
    width: "100%",
    borderRadius: 12,
    backgroundColor: "transparent",
    padding: "12px 20px",
    color: "#4f46e5",
    fontWeight: 600,
    fontSize: 18,
    border: "2px solid #4f46e5",
    cursor: "pointer",
  },
  link: {
    backgroundColor: "transparent",
    padding: 0,
    color: "#2e78b7",
    fontWeight: 500,
    fontSize: 16,
    textDecoration: "underline",
    border: "none",
    cursor: "pointer",
  },
};

const VARIANT_STYLES: Record<
  ButtonVariant,
  { button: ViewStyle; text: TextStyle }
> = {
  primary: {
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
      fontWeight: "700",
      fontSize: 18,
    },
  },
  secondary: {
    button: {
      backgroundColor: "#f3f4f6",
      borderWidth: 1,
      borderColor: "#e5e7eb",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#111827",
      fontWeight: "600",
      fontSize: 18,
    },
  },
  outlined: {
    button: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: "#4f46e5",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#4f46e5",
      fontWeight: "600",
      fontSize: 18,
    },
  },
  link: {
    button: {
      backgroundColor: "transparent",
      paddingVertical: 0,
      paddingHorizontal: 0,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#2e78b7",
      fontWeight: "500",
      fontSize: 16,
      textDecorationLine: "underline",
    },
  },
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export const Button = ({
  children,
  variant = "primary",
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
  const variantClasses = VARIANT_CLASSES[variant];
  const variantStyles = VARIANT_STYLES[variant];
  const containerClassName = joinClassNames(
    variantClasses.className,
    className,
  );
  const labelClassName = joinClassNames(
    variantClasses.textClassName,
    textClassName,
  );
  const useNativeTextStyles =
    Platform.OS !== "web" && !textClassName && !className;

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
        style={{
          ...VARIANT_WEB_STYLES[variant],
          ...(disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}),
          ...(style as CSSProperties),
        }}
        onClick={handlePress}
      >
        {children}
      </button>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={containerClassName}
      style={[
        useNativeTextStyles ? variantStyles.button : undefined,
        style as StyleProp<ViewStyle>,
        disabled && styles.disabled,
      ]}
      {...pressableProps}
    >
      {typeof children === "string" ? (
        <Text
          className={labelClassName}
          style={useNativeTextStyles ? variantStyles.text : undefined}
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
  disabled: {
    opacity: 0.5,
  },
});
