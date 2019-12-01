import "reflect-metadata";
import { Container } from "inversify"
import { IEventRepository } from "../events/events.interface"
import { FaunaEventRepository } from "../events/events.repository"

const Types = {
    IEventRepository: Symbol.for("IEventRepository"),
}

var DIContainer = new Container();
DIContainer.bind<IEventRepository>(Types.IEventRepository).to(FaunaEventRepository);

export { DIContainer, Types}