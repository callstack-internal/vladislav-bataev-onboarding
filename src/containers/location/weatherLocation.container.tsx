
import { useFocusEffect } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { LocationWeatherComponent } from '@/containers/location/weatherLocation.component.tsx'
import { WeatherLocationVm } from '@/containers/location/weatherLocation.vm.ts'

export const LocationWeatherContainer = observer(() => {
  const { top } = useSafeAreaInsets()
  const [weatherLocationVM] = useState<WeatherLocationVm>(() => new WeatherLocationVm())

  useFocusEffect(
    React.useCallback(() => {
      const clearAutoRefresh = weatherLocationVM.startAutoRefresh(15000)

      return () => clearAutoRefresh()
    }, [weatherLocationVM])
  )

  return (
    <LocationWeatherComponent
      currentLocation={weatherLocationVM.currentLocation}
      weatherData={weatherLocationVM.weatherData}
      weatherDetails={weatherLocationVM.weatherDetails}
      topInset={top}
    />
  )
})
