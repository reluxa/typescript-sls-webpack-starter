import { User } from "../users/users.interface"

export interface Event {
    name: string;
    id: number;
    venue: string;
    owner: User;
    creation: Date;
}