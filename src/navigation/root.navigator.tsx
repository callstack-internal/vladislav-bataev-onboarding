import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import React, { Fragment, ReactElement } from 'react'

import { commonNavigatorOptions } from './common'
import { Screens } from './screen.types'

import { CitiesStackNavigator } from '@/navigation/commonStack/citiesStack/cities.navigator.tsx'
import { navigationRef, navigationService } from '@/services/navigation.service'

const RootStack = createNativeStackNavigator()

export const RootNavigator = observer((): ReactElement | null => {
  return (
    <NavigationContainer
      onStateChange={navigationService.onStateChange}
      ref={navigationRef}
    >
      <RootStack.Navigator screenOptions={commonNavigatorOptions}>
        <Fragment>
          <RootStack.Screen
            name={Screens.Root.WeatherCities}
            component={CitiesStackNavigator}
          />
        </Fragment>
      </RootStack.Navigator>
    </NavigationContainer>
  )
})
