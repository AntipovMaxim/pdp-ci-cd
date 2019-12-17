export const appConfig = {
  port: process.env.PORT || 5000,
  dbHost: process.env.MONGO_DB_URI_AUTH,
  secret: process.env.SECRET,
};
