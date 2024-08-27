import { RootScreen, RootStackList } from './root.navigation.types'

import { GenericScreenType } from '@/navigation/common.ts'
import { WeatherCities, WeatherStackList } from '@/navigation/commonStack/citiesStack/cities.navigation.types.ts'

type ScreensTypes = {
  Root: GenericScreenType<RootStackList>;
  WeatherCities: GenericScreenType<WeatherStackList>;
};

export const Screens: ScreensTypes = {
  Root: {
    WeatherCities: RootScreen.WeatherCities,
  },
  WeatherCities: {
    Cities: WeatherCities.Cities,
    DetailedCity: WeatherCities.DetailedCity,
  },
}
