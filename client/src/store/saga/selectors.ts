import type {RootState} from 'store/reducers'

export const selectors = {
  getAuth: (state: RootState) => state.auth,
}
