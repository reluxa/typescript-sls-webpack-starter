import { getEvent, } from "../src/events/events.lambda.handler"
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, Callback, Context, APIGatewayProxyResult } from "aws-lambda";
import { DIContainer, Types } from "../src/common/container"
import { IEventRepository, Event } from "../src/events/events.interface"
import { User } from "../src/users/users.interface"
import { injectable } from "inversify";

describe('getvent', function () {

  function createEvent(partial: Partial<APIGatewayProxyEvent>): APIGatewayProxyEvent {
    let event: APIGatewayProxyEvent = {
      body: null,
      headers: {},
      multiValueHeaders: {},
      httpMethod: "GET",
      isBase64Encoded: false,
      path: "/api/events",
      pathParameters: { id: "1" },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      stageVariables: null,
      resource: "event",
      requestContext: <APIGatewayEventRequestContext>{},
    }
    Object.assign(event, partial);
    return event;
  }


  it('Should call repository when called', async function () {

    @injectable()
    class MockRepository implements IEventRepository {
      getEvent(id: number): Promise<Event> {
        let ev: Event = {
          name: "name",
          id: "1",
          venue: "Budapest",
          owner: <User>{},
          creation: new Date("2019-11-20T22:10:52.722Z"),
        }
        return Promise.resolve(ev);
      }

      createEvent(event: Event): Promise<Event> {
        throw new Error("Method not implemented.");
      }
    }

    DIContainer.unbind(Types.IEventRepository);
    DIContainer.bind<IEventRepository>(Types.IEventRepository).to(MockRepository);

    let response = await getEvent(createEvent({}), <Context>{}, <Callback<APIGatewayProxyResult>>{});
    expect((<APIGatewayProxyResult>response).statusCode).toEqual(200);
    expect((<APIGatewayProxyResult>response).body).toEqual('{"name":"name","id":"1","venue":"Budapest","owner":{},"creation":"2019-11-20T22:10:52.722Z"}');
  });
});