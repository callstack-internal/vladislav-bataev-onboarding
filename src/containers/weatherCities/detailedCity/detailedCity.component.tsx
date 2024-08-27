import React from 'react'
import { StyleSheet, View } from 'react-native'

import { CityWeatherInfo } from '@/components/cities/cityWeatherInfo.tsx'
import { WeatherDetail } from '@/components/cities/weatherDetail.tsx'

interface DetailedCityComponentProps {
  cityName: string;
  cityWeatherInfo: {
    temperature: number;
    description: string;
    iconUrl: string;
  } | null;
  weatherDetails: Array<{ label: string; value: number | string; unit?: string }>;
}

export const DetailedCityComponent = ({
  cityName,
  cityWeatherInfo,
  weatherDetails,
}: DetailedCityComponentProps) => {
  return (
    <View style={styles.container}>
      <CityWeatherInfo
        cityName={cityName}
        weatherData={cityWeatherInfo}
      />
      <View style={styles.details}>
        {weatherDetails.map((detail, index) => (
          <WeatherDetail
            key={index}
            label={detail.label}
            value={detail.value}
            unit={detail.unit}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
  },
})
