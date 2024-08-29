import { RootScreen, RootStackList } from './root.navigation.types'

import { GenericScreenType } from '@/navigation/common.ts'
import { WeatherCities, WeatherStackList } from '@/navigation/commonStack/citiesStack/cities.navigation.types.ts'
import { TabBarScreens, TabBarStackList } from '@/navigation/commonStack/tabs/tab.navigation.types.ts'

type ScreensTypes = {
  Root: GenericScreenType<RootStackList>;
  Tabs: GenericScreenType<TabBarStackList>
  WeatherCities: GenericScreenType<WeatherStackList>;
};

export const Screens: ScreensTypes = {
  Root: {
    Tabs: RootScreen.Tabs,
  },
  Tabs: {
    CitiesWeather: TabBarScreens.CitiesWeather,
    LocationWeather: TabBarScreens.LocationWeather
  },
  WeatherCities: {
    Cities: WeatherCities.Cities,
    DetailedCity: WeatherCities.DetailedCity,
  },
}
