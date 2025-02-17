import type { Config, Client } from "./api.js";
import { LibsqlError } from "./api.js";
import type { ExpandedConfig } from "./config.js";
import { expandConfig } from "./config.js";
import { _createClient as _createWsClient } from "./ws.js";
import { _createClient as _createHttpClient } from "./http.js";
import {supportedUrlLink} from "./util";

export * from "./api.js";

/** Creates a {@link Client} object.
 *
 * You must pass at least an `url` in the {@link Config} object.
 */
export function createClient(config: Config): Client {
    return _createClient(expandConfig(config, true));
}

function _createClient(config: ExpandedConfig) {
    if (config.scheme === "wss" || config.scheme === "ws") {
        return _createWsClient(config);
    } else if (config.scheme === "https" || config.scheme === "http") {
        return _createHttpClient(config);
    } else {
        throw new LibsqlError(
            'This build does not support local libsql files',
            "URL_SCHEME_NOT_SUPPORTED",
        );
    }
}
