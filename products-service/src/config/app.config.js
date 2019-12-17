export const appConfig = {
  port: process.env.PORT || 4000,
  dbHost: process.env.MONGO_DB_URI_PRODUCTS,
  AUTH_API_URL: process.env.AUTH_API_URL
};
