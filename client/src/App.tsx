import type {RootState} from 'store/reducers'
import type {IAuthToken} from 'models/auth'
import {lazy, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {api} from 'api'
import {CookieHandler} from 'utils/CookieHandler'
import {setUserData} from 'store/actions/auth'
import {parseJWT} from 'utils/parseJWT'

const Auth = lazy(() => import('./pages/Auth'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  const dispatch = useDispatch()
  const {token: tokenFromStore} = useSelector((state: RootState) => state.auth)
  const tokenFromCookie = CookieHandler.getCookie('token')
  const token = tokenFromCookie || tokenFromStore

  useEffect(() => {
    api.defaults.headers.common['token'] = token

    if (tokenFromCookie && !tokenFromStore) {
      dispatch(setUserData(parseJWT<IAuthToken>(tokenFromCookie).data))
    }
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
