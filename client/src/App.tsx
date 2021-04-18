import {Switch, Route, Redirect} from 'react-router-dom';
import {Auth} from './pages/Auth';
import {Chat} from './pages/Chat'
import {useSelector} from 'react-redux'
import {RootState} from './store/reducers'

const App = () => {
  const {token} = useSelector((state: RootState) => state.auth)

  return (
    <Switch>
      <Route exact path="/">
        {token ? <Redirect to="/dialogs" /> : <Auth/>}
      </Route>
      <Route exact path="/dialogs">
        {token ? <Chat /> : <Redirect to="/" />}
      </Route>
    </Switch>
  )
}

export default App
