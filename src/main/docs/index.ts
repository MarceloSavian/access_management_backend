import {
  apiKeyAuthSchema
} from './schemas/api-key-auth-shema'
import { badRequest, serverError, unauthorized, forbidden } from './components/'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node Api',
    description: 'API for Access Management',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [],
  paths: {},
  schemas: {},
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    forbidden
  }
}
