import type {RootState} from 'store/reducers'
import {initialState as auth} from 'store/reducers/auth'
import {initialState as dialogs} from 'store/reducers/dialogs'
import {initialState as users} from 'store/reducers/users'
import {selectors} from 'store/saga/selectors'

describe('selectors', () => {
  const reducer: RootState = {
    auth,
    dialogs,
    users,
  }

  it('Should return auth state', () => {
    expect(selectors.getAuth(reducer)).toStrictEqual(auth)
  })
})
