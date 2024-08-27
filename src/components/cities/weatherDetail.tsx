import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface WeatherDetailProps {
  label: string;
  value: string | number;
  unit?: string;
}

export const WeatherDetail = ({ label, value, unit }: WeatherDetailProps) => {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>
        {value} {unit}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 18,
    color: '#333',
  },
  detailValue: {
    fontSize: 18,
    color: '#333',
  },
})
