import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

interface CityWeatherInfoProps {
  cityName: string;
  weatherData: {
    temperature: number;
    description: string;
    iconUrl: string;
  } | null;
  testID: string,
}

export const CityWeatherInfo = ({
  cityName,
  weatherData,
  testID,
}: CityWeatherInfoProps) => {
  return (
    <View
      style={styles.header}
    >
      {weatherData && (
        <Image
          accessibilityRole="image"
          testID={`weather_icon_${testID}`}
          source={{ uri: weatherData.iconUrl }}
          style={styles.weatherIcon}
        />
      )}
      <View
        style={styles.headerTextContainer}
      >
        <Text
          testID={`city_name_${testID}`}
          style={styles.cityName}
        >
          {cityName}
        </Text>
        {weatherData && (
          <Text
            testID={`description_${testID}`}
            style={styles.description}
          >
            {weatherData.description}
          </Text>
        )}
      </View>
      {weatherData && (
        <View style={styles.temperatureContainer}>
          <Text
            testID={`temperature_${testID}`}
            style={styles.temperature}
          >
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
    paddingRight: 15,
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
