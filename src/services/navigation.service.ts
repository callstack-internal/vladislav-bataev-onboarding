import { createNavigationContainerRef, StackActions } from '@react-navigation/native'

import { Logger } from '@/core/logger.ts'
import { RootStackList } from '@/navigation/root.navigation.types'
import { appStore } from '@/stores/app.store'

const navigationRef = createNavigationContainerRef<RootStackList>()

class NavigationService {
  public push(routeName: string, params: Record<string, any> = {}): void {
    if (navigationRef.isReady()) {
      navigationRef.current?.dispatch(
        StackActions.push(routeName, params)
      )
    } else {
      Logger.logError('Navigation isn\'t ready to push.')
    }
  }

  public navigate(screen: any, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.current?.navigate(screen, params)
    }
  }

  public goBack() {
    if (navigationRef.isReady()) {
      navigationRef.current?.goBack()
    }
  }

  public onStateChange = () => {
    const currentRouteName = navigationRef.getCurrentRoute()?.name
    if (appStore.currentScreen !== currentRouteName) {
      Logger.logInfo(`[Navigation] Screen change: ${appStore.currentScreen} -> ${currentRouteName ?? ''}`)
    }
    appStore.setCurrentScreen(currentRouteName ?? '')
  }
}

const navigationService = new NavigationService()

export {
  navigationRef,
  navigationService
}

