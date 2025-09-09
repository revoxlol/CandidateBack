export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    path: process.env.DATABASE_PATH || './database.sqlite',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  },
});