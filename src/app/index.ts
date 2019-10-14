import Koa from 'koa';

import { Server } from '../shared/Server'; // TODO: resolver path do tsconfig
import { UserController } from './controllers/UserController';
// github.com/seanpmaxwell/overnight
export class AppServer extends Server {
    constructor() {
        super(process.env.NODE_ENV === 'development'); // setting showLogs to true
        this.setupControllers();
    }

    private setupControllers(): void {
        const userController = new UserController();
        // super.addControllers() must be called, and can be passed a single controller or an array of
        // controllers. Optional router object can also be passed as second argument.
        super.addControllers([userController] /* , optional router here*/);
    }

    public get app(): Koa {
        return super.app;
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log('Server listening on port: ', port);
        });
    }
}
