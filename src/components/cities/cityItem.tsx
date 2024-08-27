import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'


import { CityWeatherInfo } from '@/components/cities/cityWeatherInfo.tsx'
import { City } from '@/types/cities.types'

interface CityItemProps {
  city: City;
  onPress: (city: any) => void;
  weatherData: {
    temperature: number;
    description: string;
    iconUrl: string;
  };
}

export const CityItem = ({ city, onPress, weatherData }: CityItemProps) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={styles.container}
      onPress={() => onPress(city)}
    >
      <CityWeatherInfo
        cityName={city.name}
        weatherData={weatherData}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
})
