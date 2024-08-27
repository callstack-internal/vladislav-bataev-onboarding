import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

interface CityWeatherInfoProps {
  cityName: string;
  weatherData: {
    temperature: number;
    description: string;
    iconUrl: string;
  } | null;
}

export const CityWeatherInfo = ({ cityName, weatherData }: CityWeatherInfoProps) => {
  return (
    <View style={styles.header}>
      {weatherData && (
        <Image
          accessibilityRole="image"
          testID="weather-icon"
          source={{ uri: weatherData.iconUrl }}
          style={styles.weatherIcon}
        />
      )}
      <View style={styles.headerTextContainer}>
        <Text style={styles.cityName}>{cityName}</Text>
        {weatherData && (
          <Text style={styles.description}>{weatherData.description}</Text>
        )}
      </View>
      {weatherData && (
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>
            {weatherData.temperature.toFixed(1)} °F
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#888',
  },
  temperatureContainer: {
    justifyContent: 'center',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#888',
  },
})
