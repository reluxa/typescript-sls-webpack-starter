import { APIGatewayProxyHandler } from 'aws-lambda';
import { IEventRepository, baseEventFromJson } from "./events.interface"
import { DIContainer, Types } from "../common/container"
import { factory } from "../common/logger";
import middy from 'middy'
import { httpErrorHandler } from 'middy/middlewares'
import { BadRequest, NotFound } from 'http-errors';

const logger = factory.getLogger("EventsRepository")

function getEventRepository():IEventRepository {
  return DIContainer.get<IEventRepository>(Types.IEventRepository);
}

export const getEvent: APIGatewayProxyHandler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.id) {
    throw new BadRequest("Invalid request, id is missing");
  } else {
    let id = event.pathParameters.id;
    try {
      let response = await getEventRepository().getEvent(parseInt(id));
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    } catch (error) {
      if (error instanceof NotFound) 
      throw new NotFound("Entry not found");
    }
  }
}

export const middyGetEvent = middy(getEvent);
middyGetEvent.use(httpErrorHandler({logger: e => {logger.warn(e.message)}}));

export const createEvent: APIGatewayProxyHandler = async (event) => {
  if (event.body) {
    let data = baseEventFromJson(event.body);
    let response = await getEventRepository().createEvent(data);
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    };
  } else {
    throw new BadRequest("Request body is missing");
  }
}