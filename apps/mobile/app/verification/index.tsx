import { View, Text } from "react-native";
import { Button, Input } from "@repo/ui";
import { useState } from "react";
import { authScreenStyles as styles } from "@/constants/authScreenStyles";

const Verification = () => {
  const [code, setCode] = useState("");

  const handleVerify = () => {
    console.log(code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.subtitle}>
          We&apos;ve sent a verification code to your email.
        </Text>
        <Input
          value={code}
          onChangeText={setCode}
          placeholder="Enter the code"
          maxLength={6}
          type="number"
        />
        <Button variant="primary" onPress={handleVerify} disabled={!code}>
          Verify
        </Button>
      </View>
    </View>
  );
};

export default Verification;
