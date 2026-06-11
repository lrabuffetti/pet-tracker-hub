import { useState } from "react";
import { verifyEmail } from "../services/verifyEmail";
import { REGEX_EMAIL, REGEX_VERIFICATION_CODE } from "../utils/validation";

type UseVerifyOptions = {
  onSuccessRedirect?: () => void;
};

export const useVerify = (
  initialEmail = "",
  options?: UseVerifyOptions,
) => {
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const showEmailError = email !== "" && !REGEX_EMAIL.test(email);
  const showCodeError = code !== "" && !REGEX_VERIFICATION_CODE.test(code);

  const isFormValid =
    email !== "" &&
    REGEX_EMAIL.test(email) &&
    REGEX_VERIFICATION_CODE.test(code);

  const handleVerify = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const result = await verifyEmail(email, code);
      setSuccessMessage(result.message);

      if (options?.onSuccessRedirect) {
        setTimeout(() => {
          options.onSuccessRedirect?.();
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to verify email",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
    setErrorMessage,
    setSuccessMessage,
  };
};
