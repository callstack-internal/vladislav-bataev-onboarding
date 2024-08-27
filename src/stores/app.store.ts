import { makeAutoObservable } from 'mobx'

interface AppInfo {
  isAppLoaded: boolean,
}

class AppStore {
  public appInfo: AppInfo = {} as AppInfo
  private _currentScreen = ''

  constructor() {
    this.appInfo = {
      isAppLoaded: false,
    }
    makeAutoObservable(this)
  }

  get currentScreen(): string {
    return this._currentScreen
  }

  setCurrentScreen = (screen: string) => {
    this._currentScreen = screen
  }
}

export const appStore = new AppStore()
