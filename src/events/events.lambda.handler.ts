import { APIGatewayProxyHandler } from 'aws-lambda';
import { Event, IEventRepository } from "./events.interface"
import { DIContainer, Types} from "../common/container"

export const getEvent: APIGatewayProxyHandler = async (event, context) => {
  try {
    if (event.pathParameters) {
      let id = event.pathParameters.id;
      let eventRepostory = DIContainer.get<IEventRepository>(Types.IEventRepository);
      let response = await eventRepostory.getEvent(parseInt(id));
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    } else {
      return {
        statusCode: 400,
        body: "Invalid id"
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
    let eventRepostory = DIContainer.get<IEventRepository>(Types.IEventRepository);
    let data: Event = JSON.parse(event.body);
    let response = await eventRepostory.createEvent(data);
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