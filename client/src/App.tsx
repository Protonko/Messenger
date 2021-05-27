import {lazy, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {api} from 'api'
import {getCookie} from 'utils/getCookie'
import {useSelector} from 'react-redux'
import {RootState} from 'store/reducers'

const Auth = lazy(() => import('./pages/Auth'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  const tokenFromCookie = getCookie('token')
  const {token: tokenFromStore} = useSelector((state: RootState) => state.auth)
  const token = tokenFromCookie || tokenFromStore

  useEffect(() => {
    api.defaults.headers.common['token'] = token
  }, [token])

  return (
    <Switch>
      <Route exact path="/">
        {token ? <Redirect to="dialogs" /> : <Auth />}
      </Route>
      <Route exact path="/dialogs">
        {token ? <Chat /> : <Redirect to="/" />}
      </Route>
    </Switch>
  )
}

export default App
