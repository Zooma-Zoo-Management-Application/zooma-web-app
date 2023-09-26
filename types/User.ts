export interface User {
  id: number
  name: string
  username: string
  email: string
  phoneNumber: string
  gender: 'Male' | 'Female' | 'Other'
  status: 1 | 0,
  avatarUrl: string
  role: Role
}

export interface Role {
  id: number
  name: string
  description: string
  status: 1 | 0
}