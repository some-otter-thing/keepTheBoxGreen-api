// @ts-nocheck
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { CosmosClient } from '@azure/cosmos';
import logger from 'morgan';
import TelemetryList from './routes/telemetryList.route';
import TelemetryModel from './models/telemetry.model';

const debug = require('debug')('app:run');
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

const { endpoint, key, databaseId, containerId } = config;

const cosmosClient = new CosmosClient({ endpoint, key });
const telemetryItem = new TelemetryModel(cosmosClient, databaseId, containerId);
const telemetryList = new TelemetryList(telemetryItem);

telemetryItem
  .init((err) => {
    console.error(err);
  })
  .catch((err) => {
    console.error(err);
    console.error(
      'Shutting down because there was an error settinig up the database.'
    );
    process.exit(1);
  });

app.listen(PORT, () => {
  debug(`Listening on port  http://localhost:${PORT}`);
});

app.get('/', (req, res, next) =>
  telemetryList.showTelemetryData(req, res).catch(next)
);
