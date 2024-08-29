import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'

import { MergedStackScreenProps } from '@/navigation/common'
import { WeatherStackList } from '@/navigation/commonStack/citiesStack/cities.navigation.types.ts'

export enum TabBarScreens {
  CitiesWeather = 'CitiesWeather',
  LocationWeather = 'LocationWeather',
}

export type TabBarStackList = {
  [TabBarScreens.CitiesWeather]: NavigatorScreenParams<WeatherStackList>;
  [TabBarScreens.LocationWeather]: NavigatorScreenParams<any>;
};

type TabBarStackScreenProps<T extends keyof TabBarStackList> =
    BottomTabScreenProps<TabBarStackList, T>;

export type TabScreenNavProps<T extends keyof TabBarStackList> =
  CompositeScreenProps<TabBarStackScreenProps<T>, MergedStackScreenProps>;
