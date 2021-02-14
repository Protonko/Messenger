import {AuthActionTypes, ISetTypeOfSign} from 'models/store/auth'
import {FormTypes} from 'models/common/auth'
import {TReducers} from 'models/common/store'
import {buildReducer} from 'utils/buildReducer'

const initialState = {
  type: FormTypes.auth
}

export type TInitialState = typeof initialState;

const reducers = {
  [AuthActionTypes.SET_TYPE_OF_SIGN](state: TInitialState, action: ISetTypeOfSign) {
    return {
      type: FormTypes.register
    };
  },
} as TReducers<TInitialState, any, AuthActionTypes>

export const auth = buildReducer(reducers, initialState)
