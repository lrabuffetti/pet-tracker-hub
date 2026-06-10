import { Text, View } from "react-native";
import { Button, Input } from "@repo/ui";
import { Link, useRouter } from "expo-router";
import { useSignUp } from "@repo/ui/hooks/useSignUp";
import { authScreenStyles as styles } from "@/constants/authScreenStyles";

const SignUp = () => {
  const router = useRouter();
  const {
    isSubmitting,
    email,
    password,
    confirmPassword,
    errorMessage,
    successMessage,
    isFormValid,
    handleSignup,
    setEmail,
    setPassword,
    setConfirmPassword,
    showEmailError,
    showPasswordError,
    showConfirmPasswordError,
  } = useSignUp({
    onMobileSuccessRedirect: () => router.push("/verification"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create an account</Text>
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
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {showConfirmPasswordError && (
          <Text style={styles.fieldError}>Passwords do not match</Text>
        )}
        <Button
          variant="primary"
          onPress={handleSignup}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Link href="/login" style={styles.footerLink}>
            Login
          </Link>
        </Text>
      </View>
      {successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default SignUp;
