/* eslint-disable no-undef */

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  DB_URL: process.env.MONGO_URI_CLOUD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE
};

module.exports = config;
