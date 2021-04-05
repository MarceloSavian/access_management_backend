import { DbAddApplication } from '@/data/usecases/application/add-application/db-add-application'
import { AddApplication } from '@/domain/usecases/application/add-application'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { ApplicationRepository } from '@/infra/db/postgres/application/application-postgres-repository'

export const makeDbAddApplication = (): AddApplication => {
  const applicationRepository = new ApplicationRepository()
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  return new DbAddApplication(applicationRepository, hasher, applicationRepository)
}
