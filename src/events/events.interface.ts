import { User } from "../users/users.interface"

export interface Event {
    name: string;
    id: string;
    venue: string;
    owner: User;
    creation: Date;
}