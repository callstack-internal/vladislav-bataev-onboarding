import axios from 'axios'
import { makeAutoObservable, runInAction, autorun } from 'mobx'

import { Logger } from '@/core/logger.ts'
import { City } from '@/types/cities.types'
import { CONSTANTS, CITIES } from '@/utils/constants.ts'

export class WeatherCitiesVm {
  _citiesWeather: Record<number, any> = {}
  _cityData: City[] = CITIES

  constructor() {
    makeAutoObservable(this)

    autorun(() => {
      this.fetchWeatherDataForCities(this.cityData.map(city => city.id))
    })
  }

  get citiesWeather(): Record<number, any> {
    return this._citiesWeather
  }

  get cityData(): City[] {
    return this._cityData
  }

  getWeatherByCityId(cityId: number) {
    return this._citiesWeather[cityId] || null
  }

  setCitiesWeather(citiesWeather: Record<number, any>) {
    this._citiesWeather = citiesWeather
  }

  setCityData(cityData: City[]) {
    this._cityData = cityData
  }

  getCityWeatherInfo(cityId: number) {
    const weather = this._citiesWeather[cityId]
    return weather ? {
      temperature: weather.temperature,
      description: weather.description,
      iconUrl: weather.iconUrl
    } : null
  }

  getWeatherDetails(cityId: number) {
    const weather = this._citiesWeather[cityId]
    if (!weather) return []

    const { humidity, pressure, windSpeed, cloudCover } = weather

    return [
      { label: 'Humidity', value: humidity, unit: '%' },
      { label: 'Pressure', value: pressure, unit: 'hPa' },
      { label: 'Wind Speed', value: windSpeed, unit: 'mph' },
      { label: 'Cloud Cover', value: cloudCover, unit: '%' },
    ]
  }

  async fetchWeatherDataForCities(cityIds: number[]) {
    try {
      const weatherData = await this.fetchWeatherData(cityIds)
      runInAction(() => {
        this._citiesWeather = this.transformWeatherData(weatherData)
      })
    } catch (error) {
      this.handleFetchError(error)
    }
  }

  private async fetchWeatherData(cityIds: number[]): Promise<any> {
    const response = await axios.get(
      `${CONSTANTS.API_URL}?id=${cityIds.join(',')}&appid=${CONSTANTS.API_KEY}&units=imperial`
    )
    return response.data
  }

  private transformWeatherData(data: any): Record<number, any> {
    return data.list.reduce((acc: Record<number, any>, city: any) => {
      acc[city.id] = {
        temperature: city.main.temp,
        description: city.weather[0].description,
        humidity: city.main.humidity,
        pressure: city.main.pressure,
        windSpeed: city.wind.speed,
        cloudCover: city.clouds.all,
        iconUrl: `${CONSTANTS.WEATHER_ICON_URL}/${city.weather[0].icon}@4x.png`,
      }
      return acc
    }, {})
  }

  private handleFetchError(error: any) {
    Logger.logError(`Failed to fetch weather data for cities: ${error}`)
  }
}
