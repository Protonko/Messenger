import {Switch, Route} from 'react-router-dom';
import {Auth} from './pages/Auth';
import {Chat} from './pages/Chat'

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Auth />
      </Route>
      <Route exact path="/dialogs">
        <Chat />
      </Route>
    </Switch>
  )
}

export default App
