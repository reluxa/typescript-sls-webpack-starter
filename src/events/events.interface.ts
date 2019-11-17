import { User } from "../users/users.interface"

export interface Event {
    name: string;
    id: string;
    venue: string;
    owner: User;
    creation: Date;
}

export interface IEventRepository {
    getEvent(id: number): Promise<Event>;
    createEvent(event: Event): Promise<Event>;
}