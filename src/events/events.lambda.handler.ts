import { APIGatewayProxyHandler } from 'aws-lambda';
import { EventsRepository } from "./events.repository"

export const getEvent: APIGatewayProxyHandler = async (event, context) => {
  try {
    if (event.pathParameters) {
      let id = event.pathParameters.id;
      let response = await new EventsRepository().getEvent(parseInt(id));
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    } else {
      return {
        statusCode: 400,
        body: "Inavlid id"
      };
    }
  } catch {
    return {
      statusCode: 404,
      body: "Element Not Found"
    };
  }
}

export const createEvent: APIGatewayProxyHandler = async (event, context) => {
  if (event.body) {
    let data: Event = {

    };
    JSON.parse(event.body, data)
    let response = await new EventsRepository().createEvent(data);
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } else {
    return {
      statusCode: 400,
      body: "body is not specified"
    };
  }
}