import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { RequireAuth } from "@repo/ui/components/RequireAuth";
import { useAuth } from "@repo/ui/hooks/useAuth";

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <RequireAuth onUnauthenticated={() => router.replace("/login")}>
      <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        {user && <Text style={styles.email}>{user.email}</Text>}
        <Pressable
          onPress={() => {
            logout().then(() => router.replace("/login"));
          }}
        >
          <Text style={styles.logout}>Log out</Text>
        </Pressable>
      </View>
    </RequireAuth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  logout: {
    fontSize: 16,
    color: "#2e78b7",
    textDecorationLine: "underline",
  },
});
