import React from 'react'

import { Logger } from './logger'

export class ErrorBoundary extends React.Component<any> {
  componentDidCatch(error: any, errorInfo: any) {
    Logger.logError(`[RENDER CRASH] ${JSON.stringify(error)} ${JSON.stringify(errorInfo)}`)
  }

  render() {
    return this.props.children
  }
}
