import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeApplicationController } from '../factories/controllers/application/add-application/add-application-factory'

export default (router: Router): void => {
  router.post('/applications', adaptRoute(makeApplicationController()))
}
