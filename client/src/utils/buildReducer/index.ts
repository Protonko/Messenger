import {IAction, IBuildReducer, TReducers} from 'models/common/store';

export const buildReducer = <T, U, V extends string, M = undefined>(
  reducers: TReducers<T, U, V, M>,
  defaultState: T,
): IBuildReducer<T, U, V, M> => (
  state: T = defaultState, action: IAction<V, U, M>) =>
    reducers[action.type] ? reducers[action.type](state, action) : state;
