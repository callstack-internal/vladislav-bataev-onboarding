import React from 'react';
import { render } from '@testing-library/react-native';
import { WeatherDetail } from '@/components/cities/WeatherDetail';

describe('WeatherDetail Component', () => {
  it('renders the label and value correctly without a unit', () => {
    const { getByText } = render(
      <WeatherDetail label="Humidity" value={65} />
    );

    expect(getByText('Humidity')).toBeTruthy();
    expect(getByText('65')).toBeTruthy();
  });

  it('renders the label, value, and unit correctly', () => {
    const { getByText } = render(
      <WeatherDetail label="Wind Speed" value={10} unit="mph" />
    );

    expect(getByText('Wind Speed')).toBeTruthy();
    expect(getByText('10 mph')).toBeTruthy();
  });

  it('handles string values correctly', () => {
    const { getByText } = render(
      <WeatherDetail label="Description" value="Clear Sky" />
    );

    expect(getByText('Description')).toBeTruthy();
    expect(getByText('Clear Sky')).toBeTruthy();
  });
});
