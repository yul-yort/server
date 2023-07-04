export const isDev: boolean = process.env.NODE_ENV === 'development';

export const jwtConstants = {
  // TODO secretKey
  access_secret_jwt: 'accessSecretKey',
  refresh_secret_jwt: 'refreshSecretKey',
  accessExpiresTime: 500,
  refreshExpiresTime: 1.555e7,
  tokenCookieKey: 'yy-admin-access-token',
  secret: process.env.SECRET_KEY,
  expiresTime: 8.64e7,
  tokenCookieKey: 'yy-access-token',
};
