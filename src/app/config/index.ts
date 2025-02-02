import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  sp: {
    SP_ENDPOINT: process.env.SP_ENDPOINT,
    SP_USERNAME: process.env.SP_USERNAME,
    SP_PASSWORD: process.env.SP_PASSWORD,
    SP_PREFIX: process.env.SP_PREFIX,
    SP_RETURN_URL: process.env.SP_RETURN_URL,
  },
};
