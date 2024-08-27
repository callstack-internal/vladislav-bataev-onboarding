import { WeatherCitiesVm } from '@/containers/weatherCities/weatherCities.vm.ts'
import createVmContext from '@/utils/contextCreator/genericContextCreator.ts'

const { context: WeatherCitiesContext, useVmContext: useCitiesVm } = createVmContext<WeatherCitiesVm>({} as WeatherCitiesVm)

export { WeatherCitiesContext, useCitiesVm }
