import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { City } from '@/types/cities.types';
import { CitiesComponent } from '../src/containers/weatherCities/cities/cities.component';

describe('CitiesComponent', () => {
  const mockCities: City[] = [
    { id: 1, name: 'Kyiv, UA' },
    { id: 2, name: 'Sumy, UA' },
  ];

  const mockCitiesWeather = {
    1: { temperature: 72, description: 'Sunny', iconUrl: 'https://openweathermap.org/img/wn/01d@4x.png' },
    2: { temperature: 68, description: 'Cloudy', iconUrl: 'https://openweathermap.org/img/wn/02d@4x.png' },
  };

  const mockOnCityPress = jest.fn();

  it('renders a list of cities', () => {
    const { getByText } = render(
      <CitiesComponent
        onCityPress={mockOnCityPress}
        citiesWeather={mockCitiesWeather}
        cityData={mockCities}
      />
    );

    expect(getByText('Kyiv, UA')).toBeTruthy();
    expect(getByText('Sumy, UA')).toBeTruthy();
  });

  it('calls onCityPress with the correct city data and uniqueID when a city is pressed', () => {
    const { getByText } = render(
      <CitiesComponent
        onCityPress={mockOnCityPress}
        citiesWeather={mockCitiesWeather}
        cityData={mockCities}
      />
    );

    fireEvent.press(getByText('Kyiv, UA'));
    expect(mockOnCityPress).toHaveBeenCalledWith(mockCities[0], 'city_0');

    fireEvent.press(getByText('Sumy, UA'));
    expect(mockOnCityPress).toHaveBeenCalledWith(mockCities[1], 'city_1');
  });

  it('passes the correct weather data to each CityItem', () => {
    const { getByText } = render(
      <CitiesComponent
        onCityPress={mockOnCityPress}
        citiesWeather={mockCitiesWeather}
        cityData={mockCities}
      />
    );

    expect(getByText('Sunny')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
  });
});
