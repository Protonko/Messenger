import {StrictMode} from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store';
import 'assets/scss/style.scss'
import App from './App'

render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)
