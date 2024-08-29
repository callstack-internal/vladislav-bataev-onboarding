// LocationWeatherComponent.tsx

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { CityWeatherInfo } from '@/components/cities/cityWeatherInfo'
import { WeatherDetail } from '@/components/cities/weatherDetail'

interface LocationWeatherUIProps {
  currentLocation: { latitude: number; longitude: number } | null;
  weatherData: any | null;
  topInset: number;
  weatherDetails: { label: string; value: string | number; unit?: string; testID: string }[];
}

export const LocationWeatherComponent: React.FC<LocationWeatherUIProps> = ({
  currentLocation,
  weatherData,
  topInset,
  weatherDetails,
}) => {
  return (
    <View style={[{ paddingTop: topInset }, styles.container]}>
      {currentLocation && weatherData && (
        <>
          <Text style={styles.header}>Your location weather</Text>
          <CityWeatherInfo
            cityName={weatherData.name}
            weatherData={{
              temperature: weatherData.main.temp,
              description: weatherData.weather[0].description,
              iconUrl: `${weatherData.iconUrl}`,
            }}
            testID="location_weather"
          />
          <View style={styles.details}>
            {weatherDetails.map(detail => (
              <WeatherDetail
                key={detail.testID}
                label={detail.label}
                value={detail.value}
                unit={detail.unit}
                testID={detail.testID}
              />
            ))}
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
  },
})
