// @ts-nocheck
const debug = require('debug')('app:telemetry');

class TelemetryItem {
  /**
   * Manages reading, adding, and updating Tasks in Cosmos DB
   * @param {CosmosClient} cosmosClient
   * @param {string} databaseId
   * @param {string} containerId
   */
  constructor(cosmosClient, databaseId, containerId) {
    this.client = cosmosClient;
    this.databaseId = databaseId;
    this.collectionId = containerId;

    this.database = null;
    this.container = null;
  }

  async init() {
    debug('Setting up the database...');
    const dbResponse = await this.client.databases.createIfNotExists({
      id: this.databaseId
    });
    this.database = dbResponse.database;
    debug(`Setting up the database ${dbResponse.database.id}...done!`);
    debug('Setting up the container...');
    const containerResponse = await this.database.containers.createIfNotExists({
      id: this.collectionId
    });
    this.container = containerResponse.container;
    debug(`Setting up the container ${containerResponse.container.id}...done!`);
  }

  async find(querySpec) {
    debug('Querying for items from the database');
    if (!this.container) {
      throw new Error('Collection is not initialized.');
    }
    const { resources } = await this.container.items
      .query(querySpec)
      .fetchAll();
    return resources;
  }

  //   async getItem(itemId) {
  //     debug('Getting an item from the database')
  //     const { resource } = await this.container.item(itemId, partitionKey).read()
  //     return resource
  //   }
}

export default TelemetryItem;
