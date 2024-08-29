import { http, HttpResponse } from 'msw'

import { CONSTANTS } from '../src/utils/constants'

export const handlers = [
  http.get(`${CONSTANTS.API_URL}${CONSTANTS.GROUP}`, () => {
    const mockWeatherData = [
      {
        id: 703448,
        main: {
          temp: 75,
          humidity: 50,
          pressure: 1012,
        },
        weather: [
          {
            description: 'Sunny',
            icon: '01d',
          },
        ],
        wind: {
          speed: 5,
        },
        clouds: {
          all: 0,
        },
      },
      {
        id: 692194,
        main: {
          temp: 68,
          humidity: 60,
          pressure: 1015,
        },
        weather: [
          {
            description: 'Clouds',
            icon: '01d',
          },
        ],
        wind: {
          speed: 10,
        },
        clouds: {
          all: 50,
        },
      },
    ]

    return HttpResponse.json({
      list: mockWeatherData,
    })
  }),
]
