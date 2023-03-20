export const isDev: boolean = process.env.NODE_ENV === 'development';

export const jwtConstants = {
  // TODO secretKey
  secret_jwt: 'secretKey',
  expiresTime: 10,
  tokenCookieKey: 'yy-access-token',
};
