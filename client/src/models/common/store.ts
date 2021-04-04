export interface IAction<T extends string, U = undefined, V = undefined> {
  type: T
  payload: U
  meta: V
}

export interface IBuildReducer<T, U, V extends string, M = undefined> {
  (state: T, action: IAction<V, U, M>): T
}

export type TReducers<T, U, V extends string, M = undefined> = Record<string, IBuildReducer<T, U, V, M>>
