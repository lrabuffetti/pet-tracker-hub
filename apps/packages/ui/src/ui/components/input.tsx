import {
  Platform,
  StyleSheet,
  TextInput,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
} from "react-native";
import type { CSSProperties } from "react";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "decimal"
  | "tel"
  | "url";

type InputTypeConfig = {
  webType: string;
  keyboardType?: TextInputProps["keyboardType"];
  inputMode?: TextInputProps["inputMode"];
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
};

const INPUT_TYPE_CONFIG: Record<InputType, InputTypeConfig> = {
  text: {
    webType: "text",
    keyboardType: "default",
    inputMode: "text",
    autoCapitalize: "sentences",
  },
  email: {
    webType: "email",
    keyboardType: "email-address",
    inputMode: "email",
    autoCapitalize: "none",
    autoComplete: "email",
  },
  password: {
    webType: "password",
    secureTextEntry: true,
    autoCapitalize: "none",
    autoComplete: "password",
  },
  number: {
    webType: "text",
    keyboardType: "number-pad",
    inputMode: "numeric",
    autoCapitalize: "none",
  },
  decimal: {
    webType: "text",
    keyboardType: "decimal-pad",
    inputMode: "decimal",
    autoCapitalize: "none",
  },
  tel: {
    webType: "tel",
    keyboardType: "phone-pad",
    inputMode: "tel",
    autoCapitalize: "none",
  },
  url: {
    webType: "url",
    keyboardType: "url",
    inputMode: "url",
    autoCapitalize: "none",
  },
};

const INPUT_WEB_STYLE: CSSProperties = {
  width: "100%",
  borderRadius: 12,
  border: "1px solid #d1d5db",
  padding: 12,
  marginBottom: 12,
  outline: "none",
  fontSize: 16,
  boxSizing: "border-box",
};

interface InputProps
  extends Omit<
    TextInputProps,
    | "onChangeText"
    | "keyboardType"
    | "secureTextEntry"
    | "inputMode"
    | "style"
  > {
  value: string;
  onChangeText: (text: string) => void;
  type?: InputType;
  className?: string;
  style?: StyleProp<TextStyle> | CSSProperties;
  disabled?: boolean;
}

export const Input = ({
  value,
  onChangeText,
  type = "text",
  className,
  style,
  autoCapitalize,
  autoComplete,
  placeholder,
  disabled,
  maxLength,
  editable = true,
  ...textInputProps
}: InputProps) => {
  const config = INPUT_TYPE_CONFIG[type];
  const useNativeStyles = Platform.OS !== "web" && !className;

  if (Platform.OS === "web") {
    return (
      <input
        type={config.webType}
        inputMode={config.inputMode}
        value={value}
        placeholder={placeholder}
        disabled={disabled || editable === false}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize ?? config.autoCapitalize}
        autoComplete={autoComplete ?? config.autoComplete}
        className={className}
        style={{
          ...INPUT_WEB_STYLE,
          ...(style as CSSProperties),
        }}
        onChange={(event) => onChangeText(event.target.value)}
      />
    );
  }

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      editable={editable && !disabled}
      maxLength={maxLength}
      keyboardType={config.keyboardType}
      inputMode={config.inputMode}
      secureTextEntry={config.secureTextEntry}
      autoCapitalize={autoCapitalize ?? config.autoCapitalize}
      autoComplete={autoComplete ?? config.autoComplete}
      className={className}
      style={[
        useNativeStyles ? styles.input : undefined,
        style as StyleProp<TextStyle>,
      ]}
      {...textInputProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
});
