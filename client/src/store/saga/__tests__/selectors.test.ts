import type {RootState} from 'store/reducers'
import {initialState as auth} from 'store/reducers/auth'
import {initialState as dialogs} from 'store/reducers/dialogs'
import {initialState as users} from 'store/reducers/users'
import {initialState as message} from 'store/reducers/message'
import {initialState as error} from 'store/reducers/error'
import {initialState as files} from 'store/reducers/files'
import {selectors} from 'store/saga/selectors'

describe('selectors', () => {
  const reducer: RootState = {
    auth,
    dialogs,
    users,
    message,
    error,
    files,
  }

  it('Should return auth state', () => {
    expect(selectors.getAuth(reducer)).toStrictEqual(auth)
  })

  it('Should return users state', () => {
    expect(selectors.getUsers(reducer)).toStrictEqual(users)
  })
})
