import React from 'react'
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'

export const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#0000ff"
      />
      <Text style={styles.text}>Loading data, please wait...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
})
