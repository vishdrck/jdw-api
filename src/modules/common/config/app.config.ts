import { CONFIG_KEYS } from 'src/modules/common/constants/enums';

function getMongooseConnection() {
  const DB_NAME = process.env.DB_NAME;
  const DB_USERNAME = process.env.DB_USERNAME;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const DB_PORT = process.env.DB_PORT;

  if (DB_NAME && DB_USERNAME && DB_PASSWORD) {
    return `mongodb://${DB_USERNAME}:${encodeURIComponent(DB_PASSWORD)}@localhost:${DB_PORT ?? '27017'}/${DB_NAME}`;
  } else {
    return `mongodb://localhost:${DB_PORT ?? '27017'}/${DB_NAME}`;
  }
}

export default () => ({
  [CONFIG_KEYS.NODE_ENV]: process.env.NODE_ENV,
  [CONFIG_KEYS.PORT]: parseInt(process.env.PORT, 10) || 3000,
  [CONFIG_KEYS.DB_URL]: getMongooseConnection(),
  [CONFIG_KEYS.VERSION]: process.env.VERSION || '0.0.1',
  [CONFIG_KEYS.SYSTEM_NAME]: process.env.SYSTEM_NAME,
  [CONFIG_KEYS.SYSTEM_DESCRIPTION]: process.env.SYSTEM_DESCRIPTION,
  [CONFIG_KEYS.WEB_URL]: process.env.WEB_URL,
});
