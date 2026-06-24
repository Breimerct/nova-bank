import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios"

const baseConfig: AxiosRequestConfig = {
  baseURL: "/default",
  headers: {
    "Content-Type": "application/json",
  },
}

export const httpClient = axios.create({ ...baseConfig })

httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = localStorage.token

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
      }
    } catch (error) {
      console.error("http-client interceptor failed to load auth store:", error)
    }

    return config
  },
  (error: AxiosError) => Promise.reject(error)
)
