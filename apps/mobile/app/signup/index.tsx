import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "@repo/ui";
import { Link } from "expo-router";
import { useSignUp } from "@repo/ui/hooks/useSignUp";

const SignUp = () => {
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
  } = useSignUp();

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Create an account</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {showEmailError && (
          <Text style={styles.matchErrorMessage}>Invalid email</Text>
        )}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        {showPasswordError && (
          <Text style={styles.matchErrorMessage}>Invalid password</Text>
        )}
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          secureTextEntry
        />
        {showConfirmPasswordError && (
          <Text style={styles.matchErrorMessage}>Passwords do not match</Text>
        )}
        <Button
          onPress={handleSignup}
          disabled={isSubmitting || !isFormValid}
          className="w-full bg-indigo-600 rounded-xl py-3"
          textClassName="text-white font-bold text-lg"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
        <Text style={styles.signupText}>
          Already have an account?{" "}
          <Link href="/login" style={styles.signupLink}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    marginTop: 24,
  },
  form: {
    width: "100%",
    maxWidth: 360,
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 12,
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
  successMessage: {
    marginTop: 24,
    color: "green",
    textAlign: "center",
    fontSize: 16,
  },
  matchErrorMessage: {
    color: "red",
    marginLeft: 12,
    fontSize: 14,
  },
  errorMessage: {
    marginTop: 24,
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SignUp;
