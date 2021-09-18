import * as dotenv from 'dotenv';
import { ConfigProps } from './types';
dotenv.config();

const config: ConfigProps = {
  endpoint: process.env.COSMOS_DB_ACCOUNT_URI,
  key: process.env.COSMOS_DB_ACCOUNT_KEY,
  databaseId: 'KeepTheBoxGreenSql',
  containerId: 'telemetry-data',
  partitionKey: { kind: 'Hash', paths: ['/id'] }
};

export { config };
