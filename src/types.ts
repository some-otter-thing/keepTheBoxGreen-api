export type PartitionKeyProps = {
  kind: string;
  paths: Array<string>;
};

export interface ConfigProps {
  endpoint: string | undefined;
  key: string | undefined;
  databaseId: string;
  containerId: string;
  partitionKey: PartitionKeyProps;
}

export interface TelemetryItemProps {
  find: any;
  id: string;
  connectionDeviceId: string;
  connectionDeviceGenerationId: string;
  enqueuedTimeUTC: string;
  temperature: number;
  humidity: number;
}

export type TelemetryItemsResponseProps = {
  telemetryData: Array<TelemetryItemProps>;
};
