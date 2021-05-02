import type {RootState} from 'store/reducers'
import {initialState as auth} from 'store/reducers/auth'
import {initialState as dialogs} from 'store/reducers/dialogs'
import {selectors} from 'store/saga/selectors'

describe('selectors', () => {
  const reducer: RootState = {
    auth,
    dialogs,
  }

  it('Should return auth state', () => {
    expect(selectors.getAuth(reducer)).toStrictEqual(auth)
  })
})
