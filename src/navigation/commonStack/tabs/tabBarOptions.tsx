import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text, Image, ImageSourcePropType, TextStyle } from 'react-native'

interface TabBarOptionsParams {
  icon: ImageSourcePropType;
  iconSecondary: ImageSourcePropType;
  title: string;
  labelStyle?: TextStyle;
}

export const createTabBarOptions = ({
  icon,
  iconSecondary,
  title,
  labelStyle = { fontSize: 11 },
}: TabBarOptionsParams): BottomTabNavigationOptions => {
  const focusedLabelStyle: TextStyle = { fontSize: 11, fontWeight: 'bold', color: '#000000' }

  return {
    tabBarLabel: ({ focused }: { focused: boolean }) => (
      <Text style={focused ? focusedLabelStyle : labelStyle}>
        {title}
      </Text>
    ),
    tabBarIcon: ({ size, focused }: { size: number; focused: boolean }) => (
      <Image
        style={{
          width: size,
          height: size,
        }}
        source={focused ? icon : iconSecondary}
      />
    ),
    title,
  }
}
