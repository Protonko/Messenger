import {Switch, Route} from 'react-router-dom';
import {Auth} from './pages/Auth';

const App = () => {
  return (
    <Switch>
      <Route path="/">
        <Auth />
      </Route>
    </Switch>
  )
}

export default App
