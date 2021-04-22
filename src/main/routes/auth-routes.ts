import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddUserController } from '../factories/controllers/auth/add-user/add-user-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeAddUserController()))
}
