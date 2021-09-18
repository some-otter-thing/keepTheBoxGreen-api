import * as dotenv from 'dotenv';

dotenv.config();

type partitionKey = {
  kind: string;
  paths: Array<string>;
};

interface configProps {
  endpoint: string | undefined;
  key: string | undefined;
  databaseId: string;
  containerId: string;
  partitionKey: partitionKey;
};

const config: configProps = {
  endpoint: process.env.COSMOS_DB_ACCOUNT_URI,
  key: process.env.COSMOS_DB_ACCOUNT_KEY,
  databaseId: 'KeepTheBoxGreenSql',
  containerId: 'telemetry-data',
  partitionKey: { kind: 'Hash', paths: ['/id'] }
};

export { config };
