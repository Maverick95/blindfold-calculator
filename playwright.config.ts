import { PlaywrightTestConfig } from '@playwright/test';
import webpackConfig from './webpack.config';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: `http://localhost:${webpackConfig.devServer.port}`,
    browserName: 'firefox',
  },
  testDir: 'playwright/test',
};

export default config;