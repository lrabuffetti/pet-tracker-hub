'use client'

import { Platform, StyleSheet, Text, View } from 'react-native'

export default function PlatformInfo() {
  const platform = Platform.OS

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Running on {platform}</Text>
      <Text style={styles.subtitle}>
        This component uses shared React Native primitives and works on web via
        react-native-web.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: '#eef2ff',
    borderRadius: 12,
    marginTop: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
})
