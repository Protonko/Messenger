import {IAction} from 'models/common/store';

export interface IBuildReducer<T, U> {
  (state: T, action: IAction<T, U>): T;
}

export type TReducers<T, U> = {
  [key: string]: IBuildReducer<T, U>,
};

export const buildReducer = <T, U>(
  reducers: TReducers<T, U>,
  defaultState: T,
): IBuildReducer<T, U> => (
  state: T = defaultState, action: IAction<T, U>) =>
    reducers[action.type] ? reducers[action.type](state, action) : state;
