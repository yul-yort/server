export const isDev: boolean = process.env.NODE_ENV === 'development';

export const jwtConstants = {
  // TODO secretKey
  secret_jwt: 'secretKey',
  expiresTime: 1000,
  tokenCookieKey: 'yy-access-token',
};
