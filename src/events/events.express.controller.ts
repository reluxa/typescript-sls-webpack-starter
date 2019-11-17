import { Path, GET, PathParam } from "typescript-rest";
import { Event, IEventRepository } from "./events.interface"
import { DIContainer, Types} from "../common/container"

@Path("/api/events")
export class EventsController {

  @Path(":id")
  @GET
  public sayHello(@PathParam('id') id: number): Promise<Event> {
    let eventRepostory = DIContainer.get<IEventRepository>(Types.IEventRepository);
    return eventRepostory.getEvent(id);
  }

}