import { observer } from 'mobx-react-lite'
import React from 'react'

import { DetailedCityComponent } from '@/containers/weatherCities/detailedCity/detailedCity.component.tsx'
import {
  WeatherCities,
  WeatherCitiesScreenNavProps,
} from '@/navigation/commonStack/citiesStack/cities.navigation.types.ts'
import { useCitiesVm } from '@/utils/viewModelsUtils/cities.vm.utils.ts'

export const DetailedCityContainer = observer(({
  route,
}: WeatherCitiesScreenNavProps<WeatherCities.DetailedCity>) => {
  const { cityId, cityName } = route.params
  const citiesVm = useCitiesVm()

  return (
    <DetailedCityComponent
      cityName={cityName}
      cityWeatherInfo={citiesVm.getCityWeatherInfo(cityId)}
      weatherDetails={citiesVm.getWeatherDetails(cityId)}
    />
  )
})
