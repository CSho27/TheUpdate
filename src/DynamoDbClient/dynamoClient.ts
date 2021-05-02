import AWS from 'aws-sdk';
import { DynamoKey, TableDefinition } from './tableDefinition'

// This needs moved somewhere more permanent at some point
const AWS_CONFIG = {
  region: "us-east-2",
  accessKeyId: "AKIAT53C767ZYIFP64BQ",
  secretAccessKey: "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"
}

type SuccessResponse = { success: true, output: AWS.DynamoDB.DocumentClient.PutItemOutput }
type FailureResponse = { success: false; errorMessage: string }

export type InsertResponse = SuccessResponse | FailureResponse;

export class DynamoDbClient {
  private readonly dynamoClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    AWS.config.update(AWS_CONFIG);
    this.dynamoClient = new AWS.DynamoDB.DocumentClient();
  }

  getItem<T,K extends DynamoKey>(tableDefinition: TableDefinition<T,K>, key: K): Promise<T | null> {
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

  insertItem<T,K extends DynamoKey>(tableDefinition: TableDefinition<T,K>, item: T): Promise<InsertResponse> {
    return new Promise((resolve, reject) => {
      const keyValue: K = (item as any)[tableDefinition.keyName];
      if(!keyValue)
        return resolve({
          success: false,
          errorMessage: `item is missing ${tableDefinition.tableName}'s key property: ${tableDefinition.keyName}`
        });

      this.getItem<T,K>(tableDefinition, keyValue).then(retrievedItem => {
        if(!!retrievedItem)
          return resolve({
            success: false,
            errorMessage: `an item with the key "${tableDefinition.keyName}=${keyValue}" already exists in table "${tableDefinition.tableName}"`
          })

        const insertParams: AWS.DynamoDB.DocumentClient.PutItemInput = {
          TableName: tableDefinition.tableName,
          Item: item
        };

        var callback = (error: AWS.AWSError, data: AWS.DynamoDB.PutItemOutput) => {
          if(!!error){
            resolve({
              ...data,
              success: false,
              errorMessage: error.message
            })
          } else {
            resolve({
              success: true,
              output: data
            })
          }
        }

        this.dynamoClient.put(insertParams, callback);
      })
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
