import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { WeatherStackList } from '@/navigation/commonStack/citiesStack/cities.navigation.types.ts'


export enum RootScreen {
  WeatherCities = 'WeatherCities',
}

export type RootStackList = {
  [RootScreen.WeatherCities]: NavigatorScreenParams<WeatherStackList>;
}

export type RootStackScreenProps<T extends keyof RootStackList> =
  NativeStackScreenProps<RootStackList, T>

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line
    interface RootParamList extends RootStackList {}
  }
}
