import {StrictMode} from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import 'assets/scss/style.scss'
import App from './App';

render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
  document.getElementById('root')
);
