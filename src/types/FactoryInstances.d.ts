export type FactoryIntances<T> = {
  [key: string]: () => T
}
