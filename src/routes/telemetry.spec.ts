// @ts-nocheck
import { config } from '../config';
import { CosmosClient } from '@azure/cosmos';
import TelemetryList from './telemetryList.route';
import TelemetryModel from '../models/telemetry.model';

jest.mock('@azure/cosmos', () => {
  return { CosmosClient: jest.fn() };
});

const { endpoint, key, databaseId, containerId } = config;
const cosmosClient = new CosmosClient({ endpoint, key });
let telemetryItem = new TelemetryModel(cosmosClient, databaseId, containerId);
const telemetryListTest = new TelemetryList(telemetryItem);

describe('class TelemetryList', () => {
  it('should initialise class with the right database', async () => {
    expect(telemetryListTest.telemetryDataItemOfTheList.databaseId).toEqual(
      'KeepTheBoxGreenSql'
    );
    expect(telemetryListTest.telemetryDataItemOfTheList.collectionId).toEqual(
      'telemetry-data'
    );
    expect(telemetryListTest.telemetryDataItemOfTheList.client).toBeTruthy();
  });
});
