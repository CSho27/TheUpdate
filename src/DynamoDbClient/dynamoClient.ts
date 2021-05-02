import AWS from 'aws-sdk';
import { TableDefinition } from './tableDefinition'

// This needs moved somewhere more permanent at some point
const AWS_CONFIG = {
  region: "us-east-2",
  accessKeyId: "AKIAT53C767ZYIFP64BQ",
  secretAccessKey: "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"
}

export interface Table<KeyType> {
  tableName: string;
}

export class DynamoDbClient {
  private readonly dynamoClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    AWS.config.update(AWS_CONFIG);
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

  getItem<T,K extends string|number|Blob>(tableDefinition: TableDefinition<T,K>, key: K): Promise<T | null> {
    return new Promise((resolve, reject) => {
      if(typeof key === 'string' && isNullOrWhitespace(key))
        return resolve(null);

      var queryParams: AWS.DynamoDB.DocumentClient.GetItemInput = {
        TableName: tableDefinition.tableName,
        Key: {
          [tableDefinition.keyName]: key
        }
      }

      var callback = (error: AWS.AWSError, data: AWS.DynamoDB.GetItemOutput) => {
        if(!!error){
          reject(error);
        } else {
          resolve(serializeItemOutput(data))
        }
      }

      this.dynamoClient.get(queryParams, callback);
    })
  }
}

function serializeItemOutput<T>(itemOutput: AWS.DynamoDB.GetItemOutput): T | null {
  if(!itemOutput.Item)
    return null;
  
  return itemOutput.Item as any;
}

function isNullOrWhitespace(str: string): boolean {
  if(!str || str.trim().length === 0)
    return true;
  else
    return false;
}
