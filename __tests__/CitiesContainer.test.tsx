import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CitiesContainer } from '@/containers/weatherCities/cities/cities.container';
import { Screens } from '@/navigation/screen.types';
import { WeatherCitiesVm } from '@/containers/weatherCities/weatherCities.vm';
import { WeatherCitiesContext } from '@/utils/viewModelsUtils/cities.vm.utils';
import { NavigationContainer } from '@react-navigation/native';
import { TEST_CITIES } from '../src/utils/constants';

jest.mock('../src/core/logger', () => {
  return {
    Logger: {
      logInfo: jest.fn(),
      logWarn: jest.fn(),
      logError: jest.fn(),
      deletePreviousLogs: jest.fn(),
      logDeviceInfo: jest.fn(),
      share: jest.fn(),
    },
  };
});

describe('CitiesContainer', () => {
  const mockNavigate = jest.fn();
  const mockRoute = {};

  const renderComponent = () => {
    const weatherCitiesVm = new WeatherCitiesVm(TEST_CITIES);

    return render(
      <WeatherCitiesContext.Provider value={weatherCitiesVm}>
        <NavigationContainer>
          <CitiesContainer
            navigation={{ navigate: mockNavigate } as any}
            route={mockRoute as any}
          />
        </NavigationContainer>
      </WeatherCitiesContext.Provider>
    );
  };

  it('renders correctly when citiesWeather data is available', async () => {
    const { findByText } = renderComponent();

    expect(await findByText('Kyiv, UA')).toBeTruthy();
    expect(await findByText('Sunny')).toBeTruthy();
    expect(await findByText('75.0 °F')).toBeTruthy();

    expect(await findByText('Sumy, UA')).toBeTruthy();
    expect(await findByText('Clouds')).toBeTruthy();
    expect(await findByText('68.0 °F')).toBeTruthy();
  });

  it('navigates to the DetailedCity screen on city press', async () => {
    const { findByText } = renderComponent();

    const cityItem = await findByText('Kyiv, UA');
    fireEvent.press(cityItem);

    expect(mockNavigate).toHaveBeenCalledWith(Screens.WeatherCities.DetailedCity, {
      cityName: 'Kyiv, UA',
      cityId: 703448,
    });
  });
});
