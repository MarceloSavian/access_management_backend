import 'module-alias/register'

import { postgresHelper } from '@/infra/db/postgres/helpers/postgres-helper'
import env from './config/env'

postgresHelper.connect(env.DATABASE_URL).then(async () => {
  const app = (await import('./config/app')).default
  app.listen(env.port, () => { console.log('Server running at http:localhost:5050') })
}).catch(console.error)
