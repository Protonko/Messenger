import {StrictMode, Suspense} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import 'assets/scss/style.scss'
import App from './App'
import {Loader} from './components/common/Loader'
import {Sizes} from './models/common/sizes'

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Suspense fallback={<Loader center={true} size={Sizes.LARGE} />}>
          <App />
        </Suspense>
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
