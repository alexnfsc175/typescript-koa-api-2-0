import cors from '@koa/cors';
import { Context } from 'koa';
import koaBody from 'koa-body';
import compression from 'koa-compress';
import mount from 'koa-mount';
import serve from 'koa-static';

// import Log from '../../helpers/Log';
import { Server } from '@shared/Server';

import { HttpError } from '../../config/error';
import { sendHttpErrorModule } from '../../config/error/sendHttpError';

/**
 * @export
 * @class Middleware
 */
export default class Middleware {
    /**
     * @static
     * @param {IServer} server
     * @memberof Middleware
     */
    static init(server: Server): void {
        // Teste
        server.app.use(mount('/static', serve(__dirname + '../controllers')));

        // express middleware
        server.app.use(
            koaBody({
                multipart: true, // Não Usar junto com o busboy
                formLimit: '5mb',
                formidable: { maxFileSize: 200 * 1024 * 1024 },
            }),
        );
        // server.app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        // server.app.use(cookieParser());
        // returns the compression middleware
        server.app.use(
            compression({
                filter: function(contentType) {
                    return /text/i.test(contentType);
                },
                threshold: 2048,
                flush: require('zlib').Z_SYNC_FLUSH,
            }),
        );
        // helps you secure your Express apps by setting various HTTP headers
        // server.app.use(helmet());
        // providing a Connect/Express middleware that can be used to enable CORS with various options
        server.app.use(cors());
        // To serve static files such as images, CSS files, and JavaScript files
        // server.app.use(express.static(path.join(__dirname, '../../../client')));
        // render
        // server.app.set('views', path.join(__dirname, '../../../client'));
        // server.app.engine('html', renderFile);
        // server.app.set('view engine', 'ejs');

        // custom errors
        server.app.use(sendHttpErrorModule);

        // OAuth2
        // server.app.use(OauthModule);

        // my middlewares
        // server.app.use(TimeMiddleware.use);
        // server.app.use(IsAuthendicatedMiddleware.use);
        // server.app.use(FaviconMiddleware.config());

        // cors
        server.app.use(async (ctx, next) => {
            ctx.set({
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            });
            ctx.set({
                'Access-Control-Allow-Headers':
                    'Origin, X-Requested-With,' +
                    ' Content-Type, Accept,' +
                    ' Authorization,' +
                    ' Access-Control-Allow-Credentials,' +
                    ' X-Accepted-OAuth-Scopes',
            });
            ctx.set({ 'Access-Control-Allow-Credentials': 'true' });
            await next();
        });
    }

    /**
     * @static
     * @param {IServer} server
     * @memberof Middleware
     */
    static initErrorHandler(server: Server): void {
        server.app.use(async (ctx: Context, next: Function) => {
            await next().catch((error: any) => {
                const originalError = error;
                if (typeof error === 'number') {
                    // eslint-disable-next-line no-param-reassign
                    error = new HttpError(error); // next(404)
                }

                if (error instanceof HttpError) {
                    ctx.sendHttpError(error);
                } else {
                    if (server.app.env === 'development') {
                        // eslint-disable-next-line no-param-reassign
                        error = new HttpError(error.status, error.message);
                        ctx.sendHttpError(error);
                    } else {
                        // eslint-disable-next-line no-param-reassign
                        error = new HttpError(error.status);
                        ctx.sendHttpError(error);
                    }
                }
                if (originalError && originalError.stack) {
                    // Log.error(originalError.stack);
                    console.error(error);
                }
            });
        });
    }
}
