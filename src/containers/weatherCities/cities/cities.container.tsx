import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { CitiesComponent } from '@/containers/weatherCities/cities/cities.component.tsx'
import {
  WeatherCities,
  WeatherCitiesScreenNavProps,
} from '@/navigation/commonStack/citiesStack/cities.navigation.types.ts'
import { Screens } from '@/navigation/screen.types.ts'
import { City } from '@/types/cities.types'
import { useCitiesVm } from '@/utils/viewModelsUtils/cities.vm.utils.ts'

export const CitiesContainer = observer(({
  navigation,
}: WeatherCitiesScreenNavProps<WeatherCities.Cities>) => {
  const citiesVm = useCitiesVm()

  const onCityPress = async (city: City) => {
    const weatherData = citiesVm.getWeatherByCityId(city.id)

    if (weatherData) {
      navigation.navigate(Screens.WeatherCities.DetailedCity, {
        cityName: city.name,
        cityId: city.id,
      })
    }
  }

  if (Object.keys(citiesVm.citiesWeather).length === 0) {
    return null
  }

  return (
    <CitiesComponent
      onCityPress={onCityPress}
      citiesWeather={citiesVm.citiesWeather}
      cityData={citiesVm.cityData}
    />
  )
})
