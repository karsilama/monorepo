import { BaseConfiguration } from '@configuration/infrastructure';

export const environment = {
  production: false,
  mongodbUri: 'mongodb+srv://jesus:12345@cluster.mongodb.net/profile',
  baseConfig: {
    api: {
      url: 'http://localhost:3000/api',
    },
  } as BaseConfiguration,
};
