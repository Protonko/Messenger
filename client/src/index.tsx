import {StrictMode, Suspense} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {Sizes} from 'models/common/sizes'
import 'assets/scss/style.scss'
import store from 'store'
import App from 'App'
import {Loader} from 'components/common/Loader'
import ErrorBoundary from 'components/ErrorBoundary'

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Loader center={true} size={Sizes.LARGE} />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
)
