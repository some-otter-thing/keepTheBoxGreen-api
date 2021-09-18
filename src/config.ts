import * as dotenv from 'dotenv';
import { configProps } from './types';
dotenv.config();

const config: configProps = {
  endpoint: process.env.COSMOS_DB_ACCOUNT_URI,
  key: process.env.COSMOS_DB_ACCOUNT_KEY,
  databaseId: 'KeepTheBoxGreenSql',
  containerId: 'telemetry-data',
  partitionKey: { kind: 'Hash', paths: ['/id'] }
};

export { config };
