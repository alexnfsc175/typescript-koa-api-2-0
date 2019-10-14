/**
 * Server super calls, for adding all controller routes to express server.
 *
 * created by Sean Maxwell Aug 26, 2018
 */

// import { Request, Response, NextFunction } from 'express';
import Koa, { Context } from 'koa';
import mount from 'koa-mount';
import Router from 'koa-router';

import { ClassKeys } from './decorators';

type Controller = InstanceType<any>;
// type RouterLib = (options?: any) => any;
type Constructable<T> = { new (options?: any): T };
// type RouterConstructor = <Constructable<Router>>;

interface RouterAndPath {
    basePath: string | null;
    router: Router | null;
}

export class Server {
    private readonly koa: Koa;

    private showLogs = false;

    private readonly LOG_STR = 'Setting up controller ';

    constructor(showLogs?: boolean) {
        this.koa = new Koa();
        this.showLogs = showLogs || false;
    }

    protected get app(): Koa {
        return this.koa;
    }

    protected get enableLogs(): boolean {
        return this.showLogs;
    }

    protected set enableLogs(showLogs: boolean) {
        this.showLogs = showLogs;
    }

    /**
     * If controllers === undefined, search the './controllers' directory. If it is a string,
     * search that directory instead. If it is an instance-object or array instance-objects,
     * don't pull in the controllers automatically.
     * @param controllers
     * @param customRouterLib
     * @param showLog
     */
    protected addControllers(
        controllers: Controller | Controller[],
        routerLib?: Constructable<Router>,
    ): void {
        const controllersList = controllers instanceof Array ? controllers : [controllers];
        const routerLibrary = routerLib || Router;
        controllersList.forEach((controller: Controller) => {
            if (controller) {
                const { basePath, router } = this.getRouter(routerLibrary, controller);
                if (basePath && router) {
                    // this.app.use(basePath, router);
                    this.app.use(mount(basePath, router.routes())).use(router.allowedMethods());
                }
            }
        });
    }

    /**
     * Get a single router object for each controller. Router object extracts
     * metadata for each class method and each property which is an array function.
     * @param routerLib
     * @param controller
     */
    private getRouter(RouterLibrary: Constructable<Router>, controller: Controller): RouterAndPath {
        const prototype = Object.getPrototypeOf(controller);
        const options = Reflect.getOwnMetadata(ClassKeys.Options, prototype);

        // Set options
        let router: any;
        if (options) {
            router = new RouterLibrary(options);
        } else {
            router = new RouterLibrary();
        }
        // Get base path
        const basePath = Reflect.getOwnMetadata(ClassKeys.BasePath, prototype);
        if (!basePath) {
            return {
                basePath: null,
                router: null,
            };
        }
        // Show logs
        if (this.showLogs) {
            // tslint:disable-next-line
            console.log(this.LOG_STR + controller.constructor.name);
        }
        // Get middleware
        const classMiddleware = Reflect.getOwnMetadata(ClassKeys.Middleware, prototype);
        if (classMiddleware) {
            router.use(classMiddleware);
        }
        // Get class-wrapper
        const classWrapper = Reflect.getOwnMetadata(ClassKeys.Wrapper, prototype);

        // Add paths/functions to router-object
        let members = Object.getOwnPropertyNames(controller);
        members = members.concat(Object.getOwnPropertyNames(prototype));
        members.forEach(member => {
            const route = controller[member];
            const routeProperties = Reflect.getOwnMetadata(member, prototype);
            if (route && routeProperties) {
                const { routeMiddleware, httpVerb, path, routeWrapper } = routeProperties;
                let callBack = (ctx: Context, next: Function) => controller[member](ctx, next);
                if (classWrapper) {
                    callBack = classWrapper(callBack);
                }
                if (routeWrapper) {
                    callBack = routeWrapper(callBack);
                }
                if (routeMiddleware) {
                    router[httpVerb](path, routeMiddleware, callBack);
                } else {
                    router[httpVerb](path, callBack);
                }
            }
        });

        // Recursively add child controllers
        let children = Reflect.getOwnMetadata(ClassKeys.Children, prototype);
        if (children) {
            children = children instanceof Array ? children : [children];
            children.forEach((child: Controller) => {
                const childRouterAndPath = this.getRouter(RouterLibrary, child);
                if (childRouterAndPath.router) {
                    router.use(childRouterAndPath.basePath, childRouterAndPath.router);
                }
            });
        }

        return {
            basePath,
            router,
        };
    }
}
