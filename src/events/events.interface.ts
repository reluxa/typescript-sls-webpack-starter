import { User } from "../users/users.interface"
import { aString, ParseFn, fromMap, parse, ParserInput } from "spicery";
import { aDate } from "spicery/build/parsers/date";
import { userParser } from "../users/users.interface";

export interface Event {
    name: string;
    id?: string;
    venue: string;
    owner: User;
    creation: Date;
}


function optionalString(x: ParserInput): string | undefined {
    if (x == undefined) {
        return undefined
    } else {
        aString(x)
    }
    
}


const eventParser: ParseFn<Event> = x => ({
    name: fromMap(x, 'name', aString),
    id: fromMap(x, 'id', optionalString),
    venue: fromMap(x, 'venue', aString),
    owner: fromMap(x, 'owner', userParser),
    creation: fromMap(x, 'creation', aDate)
});

export function eventFromJson(json: string):Event {
    return parse(eventParser)(JSON.parse(json));
}

export interface IEventRepository {
    getEvent(id: number): Promise<Event>;
    createEvent(event: Event): Promise<Event>;
}