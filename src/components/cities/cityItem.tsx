import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { CityWeatherInfo } from '@/components/cities/cityWeatherInfo.tsx'
import { City } from '@/types/cities.types'

interface CityItemProps {
  city: City;
  onPress: (city: any, uniqueID: string) => void;
  weatherData: {
    temperature: number;
    description: string;
    iconUrl: string;
  };
  testID: string;
}

export const CityItem = ({
  city,
  onPress,
  weatherData,
  testID,
}: CityItemProps) => {
  return (
    <TouchableOpacity
      testID={testID}
      accessible={false}
      accessibilityRole="button"
      style={styles.container}
      onPress={() => onPress(city, testID)}
    >
      <CityWeatherInfo
        testID={testID}
        cityName={city.name}
        weatherData={weatherData}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
})
