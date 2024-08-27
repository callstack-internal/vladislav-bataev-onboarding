import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { MergedStackScreenProps } from '@/navigation/common'

export enum WeatherCities {
  Cities = 'Cities',
  DetailedCity = 'DetailedCity',
}

export type WeatherStackList = {
  [WeatherCities.Cities]: undefined;
  [WeatherCities.DetailedCity]: {
    cityName: string,
    cityId: number,
  };
};

type WeatherCitiesStackScreenProps<T extends keyof WeatherStackList> =
  NativeStackScreenProps<WeatherStackList, T>;

export type WeatherCitiesScreenNavProps<T extends keyof WeatherStackList> =
  CompositeScreenProps<
    WeatherCitiesStackScreenProps<T>,
    MergedStackScreenProps>;
