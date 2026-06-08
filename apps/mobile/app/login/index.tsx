import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Button } from "@repo/ui";
import { REGEX_EMAIL, REGEX_PASSWORD } from "@repo/ui/validation";

export default function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = REGEX_EMAIL.test(email) && REGEX_PASSWORD.test(password);

  const handleLogin = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    Alert.alert("Login successful!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <Button
          onPress={handleLogin}
          disabled={isSubmitting || !isFormValid}
          className="w-full bg-indigo-600 rounded-xl py-3"
          textClassName="text-white font-bold text-lg"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <Text style={styles.signupText}>
          Don't have an account?{" "}
          <Link href="/signup" style={styles.signupLink}>
            Sign up
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    marginTop: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  signupText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 16,
  },
  signupLink: {
    color: "#2e78b7",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
