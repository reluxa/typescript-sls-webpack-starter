import { getEvent, createEvent } from "../src/events/events.lambda.handler"
import { APIGatewayProxyEvent, APIGatewayEventRequestContext, Callback, Context, APIGatewayProxyResult } from "aws-lambda";
import { DIContainer, Types } from "../src/common/container"
import { IEventRepository, Event } from "../src/events/events.interface"
import { User } from "../src/users/users.interface"
import { injectable } from "inversify";

function proxyEvent(partial?: Partial<APIGatewayProxyEvent>): APIGatewayProxyEvent {
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
  if (partial) {
    Object.assign(event, partial);
  }
  return event;
}


describe('getvent', function () {

  it('Should call repository when get is called', async function () {
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

    let response = <APIGatewayProxyResult>await getEvent(proxyEvent(), <Context>{}, <Callback<APIGatewayProxyResult>>{});
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('{"name":"name","id":"1","venue":"Budapest","owner":{},"creation":"2019-11-20T22:10:52.722Z"}');
  });

});

describe('createEvent', function () {

  it('Should call the repository when create is called', async function () {
    @injectable()
    class MockRepository implements IEventRepository {
      getEvent(id: number): Promise<Event> {
        throw new Error("Method not implemented.");
      }

      createEvent(event: Event): Promise<Event> {
        return Promise.resolve(Object.assign(event, {id: "1234",  creation: new Date("2019-11-20T22:10:52.722Z")}));
      }
    }

    DIContainer.unbind(Types.IEventRepository);
    DIContainer.bind<IEventRepository>(Types.IEventRepository).to(MockRepository);

    let body = '{"name":"Marathon","id":null,"venue":"Szeged","owner":{"username":"reluxa", "email":"reluxa@gmail.com"}, "creation":"2019-11-20T22:10:52.722Z"}'

    let response = <APIGatewayProxyResult>await createEvent(proxyEvent({ body: body }), <Context>{}, <Callback>{});
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual(JSON.parse('{"name":"Marathon","id":"1234","venue":"Szeged","owner":{"username":"reluxa", "email":"reluxa@gmail.com"},"creation":"2019-11-20T22:10:52.722Z"}'));
  });

});