import { BaseService } from "@/services/common/base.service.ts"
import type { AuthResponseType, AuthType } from "@/types/authType.ts"

export class AuthService extends BaseService {
  private static instance: AuthService

  private constructor() {
    super()
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }

    return AuthService.instance
  }

  async login(loginPayload: AuthType) {
    return await this.post<AuthResponseType>("/login", loginPayload)
  }
}
