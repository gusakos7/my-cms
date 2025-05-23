export enum Role {
  USER = "USER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  isEnabled: boolean
  roles: Role[]
  password?: string // Optional because we don't always need to include it
}


export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

// export interface UserResponse2
//   extends ApiResponse<{
//     users: User[]
//     total: number
//     page: number
//     limit: number
//   }> {}

export type UserResponse = ApiResponse<{
  user: User
}>
