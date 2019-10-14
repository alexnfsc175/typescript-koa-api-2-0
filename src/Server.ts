import * as http from 'http';

import { AppServer } from './app';
import { environment } from './environments';
import * as serverHandlers from './lib/serverHandlers';

const app = new AppServer().app;

const port: string | number | boolean = serverHandlers.normalizePort(environment.PORT || 3000);

const server: http.Server = http.createServer(app.callback());

// server listen
server.listen(port);

// server handlers
server.on('error', (error: Error) => serverHandlers.onError(error, port));
server.on('listening', serverHandlers.onListening.bind(server));
