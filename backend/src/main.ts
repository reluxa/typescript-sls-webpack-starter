import express = require('express');
import { Server } from "typescript-rest";
import { factory } from "./common/logger";
import { EventsController } from "./events/events.express.controller";

const log = factory.getLogger("main");

const app: express.Application = express();
Server.buildServices(app, EventsController);
app.disable('view cache');
app.set('etag', false)

app.listen(3000, function () {
    log.info('Rest Server listening on port 3000!');
});