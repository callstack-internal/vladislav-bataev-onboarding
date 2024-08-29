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
  accessible?: boolean;
}

export const CityItem = ({
  city,
  onPress,
  weatherData,
  testID,
  accessible = false,
}: CityItemProps) => {
  return (
    <TouchableOpacity
      testID={testID}
      accessible={accessible}
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
