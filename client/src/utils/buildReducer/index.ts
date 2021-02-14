import {IAction, IBuildReducer, TReducers} from 'models/common/store';

export const buildReducer = <T, U, V extends string>(
  reducers: TReducers<T, U, V>,
  defaultState: T,
): IBuildReducer<T, U, V> => (
  state: T = defaultState, action: IAction<V, U, T>) =>
    reducers[action.type] ? reducers[action.type](state, action) : state;
