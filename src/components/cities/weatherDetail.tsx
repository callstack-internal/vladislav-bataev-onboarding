import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface WeatherDetailProps {
  label: string;
  value: string | number;
  unit?: string;
  testID?: string;
}

export const WeatherDetail = ({
  label,
  value,
  unit,
  testID
}: WeatherDetailProps) => {
  return (
    <View style={styles.detailRow}>
      <Text
        testID={`label_${testID}`}
        style={styles.detailLabel}
      >
        {label}
      </Text>
      <Text
        testID={`value_unit_${testID}`}
        style={styles.detailValue}
      >
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
