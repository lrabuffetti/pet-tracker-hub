import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";
import { Button, Input } from "@repo/ui";
import { useLogin } from "@repo/ui/hooks/useLogin";
import { authScreenStyles as styles } from "@/constants/authScreenStyles";

export default function Login() {
  const router = useRouter();
  const {
    email,
    password,
    isSubmitting,
    errorMessage,
    isFormValid,
    showEmailError,
    showPasswordError,
    handleLogin,
    setEmail,
    setPassword,
  } = useLogin({
    onSuccessRedirect: () => router.replace("/dashboard"),
  });

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
        {showEmailError && (
          <Text style={styles.fieldError}>Invalid email</Text>
        )}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        {showPasswordError && (
          <Text style={styles.fieldError}>Invalid password</Text>
        )}
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
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}
