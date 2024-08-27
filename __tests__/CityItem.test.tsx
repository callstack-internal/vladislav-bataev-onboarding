import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CityItem } from '@/components/cities/CityItem'; // Adjust the import path as necessary
import { City } from '@/types/cities.types';

describe('CityItem Component', () => {
  const mockCity: City = { id: 1, name: 'Kyiv, UA' };
  const mockWeatherData = {
    temperature: 72,
    description: 'Sunny',
    iconUrl: 'https://openweathermap.org/img/wn/01d@4x.png',
  };
  const mockOnPress = jest.fn();

  it('renders CityWeatherInfo with correct props', () => {
    const { getByText } = render(
      <CityItem city={mockCity} onPress={mockOnPress} weatherData={mockWeatherData} />
    );

    expect(getByText('Kyiv, UA')).toBeTruthy();
    expect(getByText('Sunny')).toBeTruthy();
  });

  it('calls onPress with the correct city data when pressed', () => {
    const { getByRole } = render(
      <CityItem city={mockCity} onPress={mockOnPress} weatherData={mockWeatherData} />
    );

    fireEvent.press(getByRole('button'));
    expect(mockOnPress).toHaveBeenCalledWith(mockCity);
  });
});
