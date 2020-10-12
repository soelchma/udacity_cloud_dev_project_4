
import 'source-map-support/register'
//
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS  from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const todoTable = process.env.TODOS_TABLE
//
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

      console.log(event);

      let userId = 'Manuel'

      const toDoItem = await docClient.scan({
                                    TableName: todoTable,
                                    FilterExpression: 'contains(userId, :userId)',
                                    ExpressionAttributeValues: {
                                            ":userId": userId
                                    }
                              }).promise();

      return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            toDoItem
          })
        }

}
