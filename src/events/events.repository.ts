import { Event } from "./events.interface"
import { query as q } from 'faunadb';
import { client } from "../FaunaDB"
import { factory } from "../Config";

const log = factory.getLogger("EventsRepository");

export class EventsRepository {

    public getEvent(id: number): Promise<Event> {
        log.debug("Loading event by id: " + id);
        return client.query(q.Select("data", q.Get(q.Match(q.Index("events_by_id"), id))));
    }

}