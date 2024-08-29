// WeatherLocationVm.ts

import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'
import { NativeModules } from 'react-native'

import { Logger } from '@/core/logger.ts'
import { CONSTANTS } from '@/utils/constants'


const { LocationManager } = NativeModules

interface WeatherDetailData {
  label: string;
  value: string | number;
  unit?: string;
  testID: string;
}

export class WeatherLocationVm {
  currentLocation: { latitude: number; longitude: number } | null = null
  weatherData: any | null = null
  error: string | null = null

  constructor() {
    makeAutoObservable(this)
  }

  async fetchWeatherData(latitude: number, longitude: number): Promise<any> {
    try {
      const url = `${CONSTANTS.API_URL}${CONSTANTS.WEATHER}?lat=${latitude}&lon=${longitude}&appid=${CONSTANTS.API_KEY}&units=imperial`
      const response = await axios.get(url)
      return response.data
    } catch (err) {
      this.setError('Failed to fetch weather data')
      throw new Error('Failed to fetch weather data')
    }
  }

  async getCurrentLocationAndWeather() {
    try {
      const loc = await LocationManager.getCurrentLocation()
      runInAction(() => {
        this.currentLocation = loc
      })

      const weather = await this.fetchWeatherData(loc.latitude, loc.longitude)
      runInAction(() => {
        this.weatherData = {
          ...weather,
          iconUrl: `${CONSTANTS.WEATHER_ICON_URL}/${weather.weather[0].icon}@2x.png`,
        }
      })
    } catch (err: any) {
      runInAction(() => {
        this.setError(`Error in getCurrentLocationAndWeather: ${err.message}`)
      })
      Logger.logError(`Error in getCurrentLocationAndWeather: ${err}`)
    }
  }

  get weatherDetails(): WeatherDetailData[] {
    if (!this.weatherData) return []

    const { main, wind, clouds, visibility, sys } = this.weatherData

    return [
      {
        label: 'Feels Like',
        value: main.feels_like,
        unit: '°F',
        testID: 'feels_like',
      },
      {
        label: 'Temperature Min',
        value: main.temp_min,
        unit: '°F',
        testID: 'temp_min',
      },
      {
        label: 'Temperature Max',
        value: main.temp_max,
        unit: '°F',
        testID: 'temp_max',
      },
      {
        label: 'Humidity',
        value: main.humidity,
        unit: '%',
        testID: 'humidity',
      },
      {
        label: 'Wind Speed',
        value: wind.speed,
        unit: 'mph',
        testID: 'wind_speed',
      },
      {
        label: 'Wind Direction',
        value: wind.deg,
        unit: '°',
        testID: 'wind_deg',
      },
      {
        label: 'Pressure',
        value: main.pressure,
        unit: 'hPa',
        testID: 'pressure',
      },
      {
        label: 'Cloudiness',
        value: clouds.all,
        unit: '%',
        testID: 'clouds',
      },
      {
        label: 'Visibility',
        value: visibility / 1000,
        unit: 'km',
        testID: 'visibility',
      },
      {
        label: 'Sunrise',
        value: new Date(sys.sunrise * 1000).toLocaleTimeString(),
        testID: 'sunrise',
      },
      {
        label: 'Sunset',
        value: new Date(sys.sunset * 1000).toLocaleTimeString(),
        testID: 'sunset',
      },
    ]
  }

  setError(message: string) {
    this.error = message
  }

  startAutoRefresh(interval: number) {
    void this.getCurrentLocationAndWeather()
    const intervalId = setInterval(() => {
      void this.getCurrentLocationAndWeather()
    }, interval)

    return () => clearInterval(intervalId)
  }
}
