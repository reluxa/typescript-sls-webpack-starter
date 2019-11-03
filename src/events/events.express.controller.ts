import { Path, GET, PathParam } from "typescript-rest";
import { EventsRepository } from "./events.repository"
import { Event } from "./events.interface"

@Path("/api/events")
export class EventsController {

  @Path(":id")
  @GET
  public sayHello(@PathParam('id') id: number): Promise<Event> {
    return new EventsRepository().getEvent(id);
  }

}