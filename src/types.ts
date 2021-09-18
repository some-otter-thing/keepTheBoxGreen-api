export type partitionKey = {
  kind: string;
  paths: Array<string>;
};

export interface configProps {
  endpoint: string | undefined;
  key: string | undefined;
  databaseId: string;
  containerId: string;
  partitionKey: partitionKey;
}
