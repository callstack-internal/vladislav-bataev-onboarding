import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { observer } from 'mobx-react-lite'
import React, { ReactElement } from 'react'

import { Icons } from '@/assets/icons'
import { LocationWeatherContainer } from '@/containers/location/weatherLocation.container.tsx'
import { CitiesStackNavigator } from '@/navigation/commonStack/citiesStack/cities.navigator'
import { TabBarStackList } from '@/navigation/commonStack/tabs/tab.navigation.types'
import { createTabBarOptions } from '@/navigation/commonStack/tabs/tabBarOptions'
import { Screens } from '@/navigation/screen.types'

const Tab = createBottomTabNavigator<TabBarStackList>()

export const TabNavigator = observer((): ReactElement | null => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      backBehavior={'none'}
    >
      <Tab.Screen
        name={Screens.Tabs.CitiesWeather}
        component={CitiesStackNavigator}
        options={createTabBarOptions({
          icon: Icons.Sun,
          iconSecondary: Icons.SunOutline,
          title: 'Cities' })}
      />
      <Tab.Screen
        name={Screens.Tabs.LocationWeather}
        component={LocationWeatherContainer}
        options={createTabBarOptions({
          icon: Icons.Pin,
          iconSecondary: Icons.PinOutline,
          title: 'My Weather' })}
      />
    </Tab.Navigator>
  )
})
