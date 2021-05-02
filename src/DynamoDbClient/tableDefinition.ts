export interface TableDefinition<T,K extends DynamoKey> {
  tableName: string;
  keyName: string;
}

export type DynamoKey = string | number | Blob;