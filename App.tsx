import { observer } from 'mobx-react-lite'
import React from 'react'

import { ErrorBoundary } from './src/core/errorBoundary'
import { RootNavigator } from './src/navigation/root.navigator'

const App = observer((): React.JSX.Element | null => {

  return (
    <ErrorBoundary>
      <RootNavigator />
    </ErrorBoundary>
  )
})

export default App

