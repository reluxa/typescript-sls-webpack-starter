import { User } from "../users/users.interface"
import { aString, ParseFn, fromMap, parse, ParserInput } from "spicery";
import { aDate } from "spicery/build/parsers/date";
import { userParser } from "../users/users.interface";

export interface BaseEvent {
    name: string;
    venue: string;
    owner: User;
}

export interface Event extends BaseEvent {
    id: string;
    creation: Date;
}

function optional<T>(parserFn: ParseFn<T>): (x: ParserInput) => T | undefined {
    return function (x: ParserInput) {
        if (x == undefined) {
            return undefined
        } else {
            return parserFn(x);
        }
    }
}

const baseEventParser: ParseFn<BaseEvent> = x => ({
    name: fromMap(x, 'name', aString),
    venue: fromMap(x, 'venue', aString),
    owner: fromMap(x, 'owner', userParser),
});

export function baseEventFromJson(json: string): BaseEvent {
    return parse(baseEventParser)(JSON.parse(json));
}

export interface IEventRepository {
    getEvent(id: number): Promise<Event>;
    createEvent(event: BaseEvent): Promise<Event>;
}