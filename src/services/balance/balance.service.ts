import { BaseService } from "@/services/common/base.service.ts"
import type { BalanceType } from "@/types/balance.type.ts"

export class BalanceService extends BaseService {
  private static instance: BalanceService

  private constructor() {
    super()
  }

  public static getInstance(): BalanceService {
    if (!this.instance) {
      this.instance = new BalanceService()
    }
    return this.instance
  }

  public fetchBalance () {
    return this.get<BalanceType>("/balance")
  }
}