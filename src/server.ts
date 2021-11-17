import { Request, Response, NextFunction } from 'express';
import { config } from './config';
import { CosmosClient } from '@azure/cosmos';
import TelemetryList from './routes/telemetryList.route';
import TelemetryModel from './models/telemetry.model';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

const { endpoint, key, databaseId, containerId } = config;

const cosmosClient = new CosmosClient({ endpoint, key });
const telemetryItem = new TelemetryModel(cosmosClient, databaseId, containerId);

// @ts-ignore
export const telemetryList = new TelemetryList(telemetryItem);

telemetryItem
  // @ts-ignore
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

export const createServer = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(logger('dev'));

  app.get('/', (req: Request, res: Response, next: NextFunction) => 
    telemetryList.showTelemetryData(req, res).catch(next)
  );

  app.get('/date', (req: Request, res: Response, next: NextFunction) =>
    telemetryList.showTelemetryDataByDay(req, res).catch(next)
  );

  app.get('/showValue', (req: Request, res: Response, next: NextFunction) =>
    telemetryList.showValueByParam(req, res).catch(next)
  );
  return app;
};
