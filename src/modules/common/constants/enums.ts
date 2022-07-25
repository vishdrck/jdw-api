export enum CONFIG_KEYS {
  NODE_ENV = 'NODE_ENV',
  DB_URL = 'DB_URL',
  PORT = 'PORT',
  DB_NAME = 'DB_NAME',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_HOSTNAME = 'DB_HOSTNAME',
  DB_PORT = 'DB_PORT',
  SYSTEM_NAME = 'SYSTEM_NAME',
  SYSTEM_DESCRIPTION = 'SYSTEM_DESCRIPTION',
  VERSION = 'VERSION',
  WEB_URL = 'WEB_URL',
  JWT_SECRET = 'JWT_SECRET',
  ACCESS_TOKEN_EXPIRY_DURATION = 'ACCESS_TOKEN_EXPIRY_DURATION',
}

export enum DB_COLLECTIONS {
  USERS = 'users',
  ACCESS_CREDENTIALS = 'access_credentials',
  REFRESH_TOKENS = 'refresh_tokens',
  INSTITUTES = 'institutes',
  COURSES = 'courses',
  INTAKES = 'intakes',
  COURSE_INTAKES = 'course_intakes',
  MATERIALS = 'materials',
}

export enum RESPONSE_MESSAGES {
  BLOCKED_USER = 'ERR_BLOCKED_USER',
  DATA_NOT_FOUND = 'ERR_DATA_NOT_FOUND',
  DUPLICATE_DATA = 'ERR_DUPLICATE_DATA',
  DEVOPS_FAILURE = 'ERR_DEVOPS_FAILURE',
  FILE_ACCESS_ISSUE = 'ERR_FILE_ACCESS_ISSUE',
  INVALID_API_KEY = 'ERR_INVALID_API_KEY',
  INVALID_CREDENTIALS = 'ERR_INVALID_CREDENTIALS',
  INVALID_CONFIGURATION = 'ERR_INVALID_CONFIGURATION',
  INVALID_TOKEN = 'ERR_INVALID_TOKEN',
  INVALID_DOCUMENT = 'ERR_INVALID_DOCUMENT',
  INVALID_ID = 'ERR_INVALID_ID',
  INVALID_PALLET_INFO = 'ERR_INVALID_PALLET_INFO',
  INVALID_FILE_PATH_CONFIG = 'ERR_INVALID_FILE_PATH_CONFIG',
  NOT_FOUND = 'ERR_NOT_FOUND',
  USER_NOT_FOUND = 'ERR_USER_NOT_FOUND',
  FILE_NOT_FOUND = 'ERR_FILE_NOT_FOUND',
  TOKEN_ALREADY_USED = 'ERR_TOKEN_ALREADY_USED',
  TOKEN_EXPIRED = 'ERR_TOKEN_EXPIRED',
  CREDENTIALS_NOT_FOUND = 'ERR_CREDENTIALS_NOT_FOUND',
  DECRYPTION_FAILED = 'ERR_DECRYPTION_FAILED',
  SYSTEM_PERMISSION = 'ERR_CANNOT_DELETE_SYSTEM_PERMISSIONS',
  PERMISSIONS_NOT_UNIQUE = 'ERR_PERMISSIONS_NOT_UNIQUE',
  USER_INFORMATION_INSUFFICIENT = 'ERR_USER_INFORMATION_INSUFFICIENT',
  IDENTITY_NOT_ACTIVATED = 'ERR_IDENTITY_NOT_ACTIVATED',
}
