import { Event } from "./events.interface"
import { query as q } from 'faunadb';
import { client } from "../common/FaunaDB"
import { factory } from "../common/config";
import { v1 } from "uuid"

const log = factory.getLogger("EventsRepository");

export class EventsRepository {

    public getEvent(id: number): Promise<Event> {
        log.debug("Loading event by id: " + id);
        return client.query(q.Select("data", q.Get(q.Match(q.Index("events_by_id"), id))));
    }

    public createEvent(event: Event): Promise<Event> {
        log.debug("Storing event by id: " + event);
        event.id = v1();
        return client.query(q.Create(q.Collection("events"), {
            data: event
        })).then(() => event)
        .catch((error) => Promise.reject("ccc"))
    }    

}