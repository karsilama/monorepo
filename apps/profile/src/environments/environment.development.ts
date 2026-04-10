import { BaseConfiguration } from '@configuration/infrastructure';

export const environment = {
  production: false,
  baseConfig: {
    api: {
      url: 'http://localhost:3000/api',
    },
  } as BaseConfiguration,
};
