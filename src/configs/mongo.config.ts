import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoString = (configService: ConfigService) => {
  const login = configService.get('MONGO_LOGIN');
  const password = configService.get('MONGO_PASSWORD');
  const host = configService.get('MONGO_HOST');
  const port = configService.get('MONGO_PORT');
  const authDataBase = configService.get('MONGO_AUTHDATABASE');
  // TODO: host - 127.0.0.1
  // TODO - для DOCKER
  // return `mongodb://${login}:${password}@${host}:${port}/${authDataBase}`

  return `mongodb://${login}:${password}@localhost:${port}/${authDataBase}`;
};

const getMongoOptions = () => ({});

export enum COLLECTIONS {
  LOCALITY = 'Locality',
  AGENCY = 'Agency',
  ORDER = 'Order',
  AUTH = 'Auth',
}
