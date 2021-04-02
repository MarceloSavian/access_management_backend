import { Connection, createConnection, EntitySchema, EntityTarget, getConnection, SelectQueryBuilder } from 'typeorm'
import 'reflect-metadata'

export const postgresHelper = {
  client: null as unknown as Connection,
  url: null as unknown as string,
  async connect (url: string): Promise<void> {
    this.url = url
    this.client = (await createConnection({
      type: 'postgres',
      url,
      // eslint-disable-next-line node/no-path-concat
      entities: [__dirname + '/../**/**.entity{.ts,.js}'],
      synchronize: true
    }))
  },
  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },
  async getQueryBuilder (entity: EntityTarget<EntitySchema>, alias: string): Promise<SelectQueryBuilder<EntitySchema>> {
    let connection = getConnection()
    if (!connection?.isConnected) {
      await this.connect(String(process.env.DATABASE_URL))
      connection = getConnection()
    }
    return connection.createQueryBuilder(entity, alias)
  }
}
