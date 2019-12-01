import { Event, IEventRepository, BaseEvent } from "./events.interface"
import { query as q } from 'faunadb';
import { client } from "../common/FaunaDB"
import { factory } from "../common/logger";
import { v1 } from "uuid"
import { injectable } from "inversify";

const log = factory.getLogger("EventsRepository");

@injectable()
export class FaunaEventRepository implements IEventRepository {

    public getEvent(id: number): Promise<Event> {
        log.debug("Loading event by id: " + id);
        return client.query(q.Select("data", q.Get(q.Match(q.Index("events_by_id"), id))));
    }

    public createEvent(event: BaseEvent): Promise<Event> {
        log.debug("Storing event by id: " + event);
        let eventToStore: Event = Object.assign({id: v1(), creation: new Date()}, event);
        return client.query(q.Create(q.Collection("events"), {
            data: eventToStore
        })).then(() => eventToStore)
        .catch((error) => Promise.reject("ccc"))
    }    

}