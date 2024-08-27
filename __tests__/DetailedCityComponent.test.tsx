import React from 'react';
import { render } from '@testing-library/react-native';
import {DetailedCityComponent} from '../src/containers/weatherCities/detailedCity/detailedCity.component';

describe('DetailedCityComponent', () => {
  const mockCityWeatherInfo = {
    temperature: 72,
    description: 'Sunny',
    iconUrl: 'https://openweathermap.org/img/wn/01d@4x.png',
  };

  const mockWeatherDetails = [
    { label: 'Humidity', value: 65, unit: '%' },
    { label: 'Pressure', value: 1012, unit: 'hPa' },
    { label: 'Wind Speed', value: 10, unit: 'mph' },
  ];

  it('renders the CityWeatherInfo component with correct props', () => {
    const { getByText, getByTestId } = render(
      <DetailedCityComponent
        cityName="Kyiv, UA"
        cityWeatherInfo={mockCityWeatherInfo}
        weatherDetails={mockWeatherDetails}
      />
    );

    expect(getByText('Kyiv, UA')).toBeTruthy();
    expect(getByText('Sunny')).toBeTruthy();
    expect(getByText('72.0 °F')).toBeTruthy();

    const image = getByTestId('weather-icon');
    expect(image.props.source.uri).toBe(mockCityWeatherInfo.iconUrl);
  });

  it('renders the correct number of WeatherDetail components', () => {
    const { getByText } = render(
      <DetailedCityComponent
        cityName="Kyiv, UA"
        cityWeatherInfo={mockCityWeatherInfo}
        weatherDetails={mockWeatherDetails}
      />
    );

    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('65 %')).toBeTruthy();
    expect(getByText('Pressure')).toBeTruthy();
    expect(getByText('1012 hPa')).toBeTruthy();
    expect(getByText('Wind Speed')).toBeTruthy();
    expect(getByText('10 mph')).toBeTruthy();
  });

  it('handles null cityWeatherInfo gracefully', () => {
    const { queryByText } = render(
      <DetailedCityComponent
        cityName="Kyiv, UA"
        cityWeatherInfo={null}
        weatherDetails={mockWeatherDetails}
      />
    );

    expect(queryByText('Sunny')).toBeNull();
    expect(queryByText('72.0 °F')).toBeNull();
    expect(queryByText('Kyiv, UA')).toBeTruthy();
  });
});
