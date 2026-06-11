import { Text, View } from "react-native";
import { Button, Input } from "@repo/ui";
import { useVerify } from "@repo/ui/hooks/useVerify";
import { useLocalSearchParams, useRouter } from "expo-router";
import { authScreenStyles as styles } from "@/constants/authScreenStyles";

const Verification = () => {
  const router = useRouter();
  const { email: emailFromQuery } = useLocalSearchParams<{ email?: string }>();
  const initialEmail =
    typeof emailFromQuery === "string" ? emailFromQuery : "";

  const {
    email,
    code,
    isSubmitting,
    errorMessage,
    successMessage,
    isFormValid,
    showEmailError,
    showCodeError,
    handleVerify,
    setEmail,
    setCode,
  } = useVerify(initialEmail, {
    onSuccessRedirect: () => router.replace("/login"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          We&apos;ve sent a verification code to your email.
        </Text>
        <Input
          type="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        {showEmailError && (
          <Text style={styles.fieldError}>Invalid email</Text>
        )}
        <Input
          type="number"
          value={code}
          onChangeText={setCode}
          placeholder="Enter the code"
          maxLength={6}
        />
        {showCodeError && (
          <Text style={styles.fieldError}>Code must be 6 digits</Text>
        )}
        <Button
          variant="primary"
          onPress={handleVerify}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </View>
      {successMessage && (
        <Text style={styles.successMessage}>{successMessage}</Text>
      )}
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default Verification;
