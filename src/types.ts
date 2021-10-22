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
  PartitionId: string;
  connectionDeviceId: string;
  connectionDeviceGenerationId: string;
  EventProcessedUtcTime: string;
  EventEnqueuedUtcTime: string;
  temperature: number;
  humidity: number;
  dustConcentration: number;
  sittingTime: number;
}

export type TelemetryItemsResponseProps = {
  telemetryData: Array<TelemetryItemProps>;
};
