// @ts-nocheck
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import dbContext from './data/databaseContext';
import { CosmosClient } from '@azure/cosmos';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const newItem = {
  id: '2',
  connectionDeviceId: 'keep-the-box-green-device',
  connectionDeviceGenerationId: '637669621042053570',
  enqueuedTimeUTC: '2021-09-11T17:57:36.4340000Z',
  temperature: 28.202403706127036,
  humidity: 64.96773367978993
};

async function main() {
  // <CreateClientObjectDatabaseContainer>
  const { endpoint, key, databaseId, containerId } = config;

  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  const container = database.container(containerId);

  await dbContext.create(client, databaseId, containerId);
  // </CreateClientObjectDatabaseContainer>

  try {
    // <QueryItems>
    console.log(`Querying container: Items inside telemetry-data`);

    // query to return all items
    const querySpec = {
      query: 'SELECT * from c'
    };

    // read all items in telemetry-data -> Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();

    items.forEach((item) => {
      console.log(
        `${item.id} - ${item.connectionDeviceId} has temperature ${item.temperature} and humidity ${item.humidity} at ${item.enqueuedTimeUTC}`
      );
    });
    // </QueryItems>

    // <CreateItem> just for testing
    const { resource: createdItem } = await container.items.create(newItem);

    console.log(
      `\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`
    );
    // </CreateItem>
  } catch (err) {
    console.log(err.message);
  }
}

main();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
