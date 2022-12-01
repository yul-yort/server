export const isDev: boolean = process.env.NODE_ENV === 'development';

export const jwtConstants = {
  // TODO secretKey
  secret: 'secretKey',
  expiresTime: 8.64e7,
  tokenCookieKey: 'yy-access-token',
};
