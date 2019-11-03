import { Client as FaunaClient, RequestResult } from 'faunadb';
import { factory } from "./Config";

const log = factory.getLogger("FaunaClientPerformanceObserver");

export const client = new FaunaClient({
    secret: 'fnADcNDvdcACAlenNg2x_F_bf3qtKmLyFI-otyWN',
    observer: function (res: any) {
        log.info(`Request: ${res.requestRaw}, timeTaken: ${res.timeTaken}ms, x-read-ops: ${res.responseHeaders['x-read-ops']}, x-write-ops: ${res.responseHeaders['x-write-ops']}`);
    }
});
