import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import { IEventRepository, baseEventFromJson } from "./events.interface"
import { DIContainer, Types } from "../common/container"
import { factory } from "../common/logger";
import middy from 'middy'
import { httpErrorHandler } from 'middy/middlewares'
import { autoProxyResponse } from 'middy-autoproxyresponse'
import { BadRequest, NotFound } from 'http-errors';

const logger = factory.getLogger("EventsRepository")

function getEventRepository():IEventRepository {
  return DIContainer.get<IEventRepository>(Types.IEventRepository);
}

export async function getEvent(event: APIGatewayProxyEvent) {
  if (!event.pathParameters || !event.pathParameters.id) {
    throw new BadRequest("Invalid request, id is missing");
  } else {
    try {
      return await getEventRepository().getEvent(parseInt(event.pathParameters.id));
    } catch (error) {
      throw new NotFound("Entry not found");
    }
  }
}

export const middyGetEvent = middy(getEvent);
middyGetEvent.use(autoProxyResponse());
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