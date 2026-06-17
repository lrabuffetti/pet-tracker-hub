import { useState } from "react";
import { useAuth } from "./useAuth";
import { REGEX_EMAIL, REGEX_PASSWORD } from "../utils/validation";

type UseLoginOptions = {
  onSuccessRedirect?: () => void;
};

export const useLogin = (options?: UseLoginOptions) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showEmailError = email !== "" && !REGEX_EMAIL.test(email);
  const showPasswordError = password !== "" && !REGEX_PASSWORD.test(password);

  const isFormValid =
    email !== "" &&
    REGEX_EMAIL.test(email) &&
    password !== "" &&
    REGEX_PASSWORD.test(password);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await login(email, password);
      options?.onSuccessRedirect?.();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to log in",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    setErrorMessage,
  };
};
