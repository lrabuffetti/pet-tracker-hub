import { Text, View, Alert } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Input } from "@repo/ui";
import { REGEX_EMAIL, REGEX_PASSWORD } from "@repo/ui/validation";
import { authScreenStyles as styles } from "@/constants/authScreenStyles";

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
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button
          variant="primary"
          onPress={handleLogin}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <Text style={styles.footerText}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={styles.footerLink}>
            Sign up
          </Link>
        </Text>
      </View>
    </View>
  );
}
