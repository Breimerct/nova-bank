import { type AxiosRequestConfig, isAxiosError } from "axios"
import type { ServiceResponse } from "@/types/service-response.type.ts"
import { httpClient } from "@/lib/http-client.ts"
import { extractMessageError } from "@/lib/utils.ts"

export class BaseService {
  private client: typeof httpClient

  constructor() {
    this.client = httpClient
  }

  protected initializeServiceResponse<T>(): ServiceResponse<T> {
    return {
      data: null,
      errorMessage: null,
      statusCode: 500,
    }
  }

  protected async request<T>(config?: AxiosRequestConfig) {
    const serviceResponse = this.initializeServiceResponse<T>()

    try {
      const response = await this.client.request<T>({ ...config })

      serviceResponse.data = response.data
      serviceResponse.statusCode = response.status
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        serviceResponse.statusCode = error.status
      }
      serviceResponse.errorMessage = extractMessageError(error)
    }

    return serviceResponse
  }

  protected async get<T>(
    url: string,
    config?: Omit<AxiosRequestConfig, "data" | "url" | "method">
  ) {
    return this.request<T>({ method: "GET", url, ...config })
  }

  protected async post<T>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, "data" | "url" | "method">
  ) {
    return this.request<T>({ method: "POST", url, data, ...config })
  }
}
