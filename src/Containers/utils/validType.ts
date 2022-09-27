export function validType<T>(value: T): boolean {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== 'function' &&
    value === Object(value)
  )
}
