import type {IUser} from 'models/user'
import {
  UsersActionTypes,
  GetUsersErrorAction,
  GetUsersStartAction,
  GetUsersSuccessAction,
} from 'models/store/actions/users'

export const getUsers = (): GetUsersStartAction =>
  ({type: UsersActionTypes.GET_START})

export const getUsersSuccess = (payload: IUser[]): GetUsersSuccessAction =>
  ({type: UsersActionTypes.GET_SUCCESS, payload})

export const getUsersError = (payload: string): GetUsersErrorAction =>
  ({type: UsersActionTypes.GET_ERROR, payload})
