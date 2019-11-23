import { aString, ParseFn, fromMap, } from "spicery";
import { aDate } from "spicery/build/parsers/date";

export interface User {
    username: string;
    email: string;
}

export const userParser: ParseFn<User> = x => ({
    username: fromMap(x, 'username', aString),
    email: fromMap(x, 'email', aString),
});
