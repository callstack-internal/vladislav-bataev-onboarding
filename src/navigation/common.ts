import { CompositeScreenProps, NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export const commonNavigatorOptions = {
  headerShown: false,
}

export type GenericScreenType<T> = {
  [K in keyof T]: K;
};

export type MergedStackScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ParamListBase, string>,
  { navigation: NavigationProp<ParamListBase>; route: RouteProp<ParamListBase, string> }
>;
