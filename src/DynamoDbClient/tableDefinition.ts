export interface TableDefinition<T,K extends string | number | Blob> {
  tableName: string;
  keyName: string;
}