import moment from 'moment'
import { Dimensions, Platform } from 'react-native'
import {
  getAndroidId,
  getApiLevel,
  getAvailableLocationProviders,
  getBrand,
  getDevice,
  getDeviceId,
  getDeviceName,
  getFreeDiskStorage,
  getHardware,
  getMaxMemory,
  getProduct,
  getReadableVersion,
  getSystemName,
  getSystemVersion,
  getUniqueId,
  getUsedMemory,
  hasGms,
  hasHms,
  hasNotch,
  isLocationEnabled,
  supportedAbis
} from 'react-native-device-info'
import RNFS from 'react-native-fs'
import { logger, consoleTransport, fileAsyncTransport } from 'react-native-logs'
import Share from 'react-native-share'

const { width, height } = Dimensions.get('window')

class LoggerClass {
  private logger: any
  private logPrefix = 'applog_'
  private todayFileName = `${this.logPrefix}${moment().format('YYYYMMDD')}.txt`
  private yesterdayFileName = `${this.logPrefix}${moment().subtract(1, 'days').format('YYYYMMDD')}.txt`

  constructor() {
    const config = __DEV__ ?
      {
        transport: consoleTransport,
        transportOptions: {
          colors: 'ansi',
        },
      } : {
        transport: fileAsyncTransport,
        transportOptions: {
          FS: RNFS,
          fileName: this.todayFileName,
          filePath: RNFS.DocumentDirectoryPath
        },
      }
    this.logger = logger.createLogger(config)
    this.deletePreviousLogs()
      .finally(() => {
        this.logDeviceInfo()
      })
  }

  deletePreviousLogs() {
    return RNFS.readDir(RNFS.DocumentDirectoryPath)
      .then((result) => {
        return Promise.resolve(
          Promise.all(result
            .filter(x => x.path.includes(this.logPrefix))
            .filter(x => ![this.todayFileName, this.yesterdayFileName].includes(x.name))
            .map(x => {
              return RNFS.unlink(x.path)
                .catch(() => {
                  // Do nothing
                })
            })))
      })
  }

  public logInfo(value: string): void {
    this.logger?.info(value)
  }

  public logWarn(value: string): void {
    this.logger?.warn(value)
  }

  public logError(value: string): void {
    this.logger?.error(value)
  }

  private logDeviceInfo(): void {
    const start = '______________________________________________________'
    const methods: Record<any, any>[] = [
      { method: getSystemName, description: 'System' },
      { method: getSystemVersion, description: 'System version' },
      { method: getReadableVersion, description: 'App version' },
      { method: getBrand, description: 'Device brand' },
      { method: getDeviceId, description: 'Device ID' },
      { method: getDeviceName, description: 'Device name' },
      { method: getUniqueId, description: 'Device unique ID' },
      { method: getFreeDiskStorage, description: 'Available storage size' },
      { method: getUsedMemory, description: 'App memory usage (in bytes)' },
      { method: hasNotch, description: 'Device has a notch' },
      { method: getAvailableLocationProviders, description: 'Location providers' },
      { method: isLocationEnabled, description: 'Device has location services turned on at the device-level' },
      { method: supportedAbis, description: 'List of supported processor architecture version' },
      { method: () => `${width}x${height}`, description: 'width x height' },
    ]
    if (Platform.OS === 'android') {
      methods.push(...[
        { method: getAndroidId, description: 'Android ID (unique to each combination of app-signing key, user, and device)' },
        { method: getApiLevel, description: 'API level' },
        { method: getDevice, description: 'The name of the industrial design' },
        { method: getHardware, description: 'The name of the hardware' },
        { method: getMaxMemory, description: 'The maximum amount of memory that the VM will attempt to use, in bytes' },
        { method: getProduct, description: 'The name of the overall productScreen' },
        { method: hasGms, description: 'Device supports Google Mobile Services' },
        { method: hasHms, description: 'Device supports Huawei Mobile Services' }])
    }
    Promise.all(methods.map(x => {
      return Promise.resolve(x.method()).then(result => `${x.description}: ${JSON.stringify(result)}`)
    }))
      .then(result => {
        this.logInfo(`${start}\n${result.join('\n')}`)
      })
  }

  share(): Promise<any> {
    // Add previous days if needed
    const path = `file:${RNFS.DocumentDirectoryPath}/${this.todayFileName}`
    return Share.open({
      title: 'Weather App Logs',
      url: path
    })
      .catch(() => {
        // Do nothing
      })
  }
}

export const Logger = new LoggerClass()
