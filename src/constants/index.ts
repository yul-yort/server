export const isDev: boolean = process.env.NODE_ENV === 'development';

export const jwtConstants = {
  access_secret_jwt: process.env.SECRET_KEY,
  // TODO не доделано.
  refresh_secret_jwt: 'refreshSecretKey',
  accessExpiresTime: 500,
  refreshExpiresTime: 1.555e7,
  tokenCookieKey: process.env.TOKEN_COOKIE_KEY,
  expiresTime: 8.64e7,
};
