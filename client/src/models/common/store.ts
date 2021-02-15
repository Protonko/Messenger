export interface IAction<T extends string, U = undefined, V = undefined> {
  type: T
  payload: U
  meta: V
}

export interface IBuildReducer<T, U, V extends string> {
  (state: T, action: IAction<V, U, T>): T
}

export type TReducers<T, U, V extends string> = {
  [key: string]: IBuildReducer<T, U, V>,
}
