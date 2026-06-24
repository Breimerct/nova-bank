export type ServiceResponse<T> = {
  data: T | null
  errorMessage?: string | null
  statusCode?: number
}
