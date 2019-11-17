import "reflect-metadata";
import { Container } from "inversify"
import { IEventRepository } from "../events/events.interface"
import { EventRepository } from "../events/events.repository"

const Types = {
    IEventRepository: Symbol.for("IEventRepository"),
}

var DIContainer = new Container();
DIContainer.bind<IEventRepository>(Types.IEventRepository).to(EventRepository);

export { DIContainer, Types}