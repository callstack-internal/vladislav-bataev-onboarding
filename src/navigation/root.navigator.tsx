import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { observer } from 'mobx-react-lite'
import React, { ReactElement } from 'react'

import { commonNavigatorOptions } from './common'
import { Screens } from './screen.types'

import { TabNavigator } from '@/navigation/commonStack/tabs/tab.navigator.tsx'
import { navigationRef, navigationService } from '@/services/navigation.service'

const RootStack = createNativeStackNavigator()

export const RootNavigator = observer((): ReactElement | null => {
  return (
    <NavigationContainer
      onStateChange={navigationService.onStateChange}
      ref={navigationRef}
    >
      <RootStack.Navigator screenOptions={commonNavigatorOptions}>
        <RootStack.Screen
          name={Screens.Root.Tabs}
          component={TabNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  )
})
