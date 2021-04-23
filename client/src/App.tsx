import {lazy} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from './store/reducers'

const Auth = lazy(() => import('./pages/Auth'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  const {token} = useSelector((state: RootState) => state.auth)

  return (
    <Switch>
      <Route exact path="/">
        {token ? <Redirect to="/dialogs" /> : <Auth />}
      </Route>
      <Route exact path="/dialogs">
        {token ? <Chat /> : <Redirect to="/" />}
      </Route>
    </Switch>
  )
}

export default App
