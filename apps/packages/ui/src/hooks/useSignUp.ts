import { useState } from "react";
import { Platform } from "react-native";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../utils/validation";
import { signUp } from "../services/signUp";

type UseSignUpOptions = {
  onMobileSuccessRedirect?: () => void;
};

export const useSignUp = (options?: UseSignUpOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const showEmailError = email !== "" && !REGEX_EMAIL.test(email);
  const showPasswordError = password !== "" && !REGEX_PASSWORD.test(password);
  const showConfirmPasswordError =
    confirmPassword !== "" && confirmPassword !== password;

  const isFormValid =
    email !== "" &&
    REGEX_EMAIL.test(email) &&
    password !== "" &&
    REGEX_PASSWORD.test(password) &&
    confirmPassword !== "" &&
    confirmPassword === password;

  const handleSignup = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    let succeeded = false;

    try {
      const result = await signUp(email, password);
      setSuccessMessage(result.message);
      succeeded = true;
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to sign up",
      );
    } finally {
      setIsSubmitting(false);

      if (Platform.OS !== "web" && succeeded) {
        setTimeout(() => {
          options?.onMobileSuccessRedirect?.();
        }, 3000);
      }
    }
  };

  return {
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
    setErrorMessage,
    setSuccessMessage,
    showEmailError,
    showPasswordError,
    showConfirmPasswordError,
  };
};
