import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'

import { CitiesContainer } from '@/containers/weatherCities/cities/cities.container.tsx'
import { DetailedCityContainer } from '@/containers/weatherCities/detailedCity/detailedCity.container.tsx'
import { WeatherCitiesVm } from '@/containers/weatherCities/weatherCities.vm.ts'
import { WeatherStackList } from '@/navigation/commonStack/citiesStack/cities.navigation.types.ts'
import { Screens } from '@/navigation/screen.types.ts'
import { CITIES } from '@/utils/constants.ts'
import { WeatherCitiesContext } from '@/utils/viewModelsUtils/cities.vm.utils.ts'

const WeatherCitiesStack = createNativeStackNavigator<WeatherStackList>()

export const CitiesStackNavigator = () => {
  const [weatherCitiesVm] = useState<WeatherCitiesVm>(() => new WeatherCitiesVm(CITIES))

  return (
    <WeatherCitiesContext.Provider value={weatherCitiesVm}>
      <WeatherCitiesStack.Navigator initialRouteName={Screens.WeatherCities.Cities}>
        <WeatherCitiesStack.Screen
          name={Screens.WeatherCities.Cities}
          component={CitiesContainer}
        />
        <WeatherCitiesStack.Screen
          options={{ title: 'Weather details' }}
          name={Screens.WeatherCities.DetailedCity}
          component={DetailedCityContainer}
        />
      </WeatherCitiesStack.Navigator>
    </WeatherCitiesContext.Provider>
  )
}
