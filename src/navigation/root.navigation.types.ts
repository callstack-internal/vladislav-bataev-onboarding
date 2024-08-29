import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { TabBarStackList } from '@/navigation/commonStack/tabs/tab.navigation.types.ts'

export enum RootScreen {
  Tabs = 'Tabs',
}

export type RootStackList = {
  [RootScreen.Tabs]: NavigatorScreenParams<TabBarStackList>;
}

export type RootStackScreenProps<T extends keyof RootStackList> =
  NativeStackScreenProps<RootStackList, T>

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line
    interface RootParamList extends RootStackList {}
  }
}
