import { APIGatewayProxyHandler } from 'aws-lambda';
import { EventsRepository } from "./src/events/events.repository"

export const hello: APIGatewayProxyHandler = async (event, context) => {
  let response = await new EventsRepository().getEvent(1);
  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };

}