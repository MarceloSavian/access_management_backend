import { UserModel } from '@/domain/models/user'

export interface LoadUserByEmailAndApplicationRepository {
  loadUserByEmailAndApplication: (email: string, application: number) => Promise<UserModel | null>
}
