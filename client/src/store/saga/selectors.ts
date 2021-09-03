import type {RootState} from 'store/reducers'

export const selectors = {
  getAuth: (state: RootState) => state.auth,
  getUsers: (state: RootState) => state.users,
  getDialogs: (state: RootState) => state.dialogs,
}
