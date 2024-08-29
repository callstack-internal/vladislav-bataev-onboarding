import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { CityItem } from '@/components/cities/cityItem.tsx'
import { City } from '@/types/cities.types.ts'

interface CitiesComponentProps {
  onCityPress: (city: City, uniqueID: string) => void;
  citiesWeather: Record<number, any>;
  cityData: City[];
}

export const CitiesComponent = ({
  onCityPress,
  citiesWeather,
  cityData,
}: CitiesComponentProps) => {
  const renderItem = ({ item, index }: { item: City, index: number }) => (
    <CityItem
      testID={`city_${index}`}
      city={item}
      onPress={onCityPress}
      weatherData={citiesWeather[item.id] || null}
    />
  )

  const keyExtractor = (item: City) => item.id.toString()

  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={cityData}
        renderItem={renderItem}
        estimatedItemSize={50}
        keyExtractor={keyExtractor}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
})
