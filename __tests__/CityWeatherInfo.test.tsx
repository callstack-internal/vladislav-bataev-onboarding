import React from 'react';
import { render } from '@testing-library/react-native';
import { CityWeatherInfo } from '@/components/cities/CityWeatherInfo';

describe('CityWeatherInfo Component', () => {
  const mockWeatherData = {
    temperature: 72,
    description: 'Sunny',
    iconUrl: 'https://openweathermap.org/img/wn/01d@4x.png',
  };

  it('renders the city name', () => {
    const { getByText } = render(
      <CityWeatherInfo
        cityName="Kyiv, UA"
        weatherData={null}
        testID="city_0"
      />
    );
    expect(getByText('Kyiv, UA')).toBeTruthy();
  });

  it('renders the weather data when provided', () => {
    const { getByText, getByTestId } = render(
      <CityWeatherInfo
        cityName="Kyiv, UA"
        weatherData={mockWeatherData}
        testID="city_0"
      />
    );

    const image = getByTestId('weather_icon_city_0');
    expect(image).toBeTruthy();
    expect(image.props.source.uri).toBe(mockWeatherData.iconUrl);

    expect(getByText('Sunny')).toBeTruthy();
    expect(getByText('72.0 °F')).toBeTruthy();
  });

  it('does not render weather data if weatherData is null', () => {
    const { queryByText, queryByTestId } = render(
      <CityWeatherInfo
        cityName="Kyiv, UA"
        weatherData={null}
        testID="city_0"
      />
    );

    expect(queryByTestId('weather_icon_city_0')).toBeNull();
    expect(queryByText('Sunny')).toBeNull();
    expect(queryByText(/°F/)).toBeNull();
  });
});
