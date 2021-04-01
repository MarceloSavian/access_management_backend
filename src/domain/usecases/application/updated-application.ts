import { ApplicationModel } from '@/domain/models/application'

export type UpdateApplicationParams = Omit<ApplicationModel, 'id'>
