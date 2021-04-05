export default {
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://postgres@localhost:5432/postgres',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRECT ?? 'tk670==5H'
}
