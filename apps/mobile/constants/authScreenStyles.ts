import { StyleSheet } from "react-native";

export const authScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  form: {
    width: "100%",
    maxWidth: 360,
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  footerText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 16,
  },
  footerLink: {
    color: "#2e78b7",
    textDecorationLine: "underline",
    fontSize: 16,
  },
  fieldError: {
    color: "red",
    marginLeft: 12,
    fontSize: 14,
  },
  successMessage: {
    marginTop: 24,
    color: "green",
    textAlign: "center",
    fontSize: 16,
  },
  errorMessage: {
    marginTop: 24,
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});
