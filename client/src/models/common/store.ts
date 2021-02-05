export interface IAction<T, U> {
  type: string;
  payload?: T;
  meta?: U;
}
