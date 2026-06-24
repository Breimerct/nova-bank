import { BaseService } from "@/services/common/base.service.ts"
import type {
  CreateTransferType,
  TransferResponseType,
} from "@/types/transfer.type.ts"

export class TransferService extends BaseService {
  private static instance: TransferService

  private constructor() {
    super()
  }

  static getInstance(): TransferService {
    if (!TransferService.instance) {
      TransferService.instance = new TransferService()
    }

    return TransferService.instance
  }

  async fetchTransfers() {
    return await this.get<TransferResponseType>("/transferList")
  }

  async createTransfer(createTransfer: CreateTransferType) {
    return await this.post<{ status: string }>("/transfer", createTransfer)
  }
}
