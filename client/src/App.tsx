import type {RootState} from 'store/reducers'
import type {IAuthToken} from 'models/auth'
import {lazy, useEffect} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {api} from 'api'
import {CookieHandler} from 'utils/CookieHandler'
import {setUserData} from 'store/actions/auth'
import {parseJWT} from 'utils/parseJWT'
import {socket} from './utils/socket'
import {EventsSocket} from './models/common/socket'

const Auth = lazy(() => import('./pages/Auth'))
const Chat = lazy(() => import('./pages/Chat'))

const App = () => {
  const dispatch = useDispatch()
  const {accessToken: tokenFromStore, account} = useSelector(
    (state: RootState) => state.auth,
  )
  const accessTokenFromCookie = CookieHandler.getCookie('accessToken')
  const accessToken = accessTokenFromCookie || tokenFromStore

  useEffect(() => {
    api.defaults.headers.authorization = `Bearer ${accessToken}`

    if (accessTokenFromCookie && !tokenFromStore) {
      const userData = parseJWT<IAuthToken>(accessTokenFromCookie)?.data

      if (userData) {
        dispatch(setUserData(userData))
      }
    }
  }, [accessToken])

  useEffect(() => {
    if (account?.id) {
      socket.emit(EventsSocket.JOIN, account.id)
    }
  }, [account?.id])

  return (
    <Switch>
      <Route exact path="/">
        {accessToken ? <Redirect to="dialogs" /> : <Auth />}
      </Route>
      <Route exact path="/dialogs">
        {accessToken ? <Chat /> : <Redirect to="/" />}
      </Route>
    </Switch>
  )
}

export default App
