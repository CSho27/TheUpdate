import { TableDefinition } from './../DynamoDbClient/tableDefinition';

export interface User {
  username: string;
}

export const DEF_USER: TableDefinition<User,string> = {
  tableName: 'User',
  keyName: 'username'
}