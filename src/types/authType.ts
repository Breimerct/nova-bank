import type { UserType } from "@/types/user.type.ts"

export type AuthType = {
  email: string
  password: string
}

export type AuthResponseType = {
  token: string
  user: UserType
}