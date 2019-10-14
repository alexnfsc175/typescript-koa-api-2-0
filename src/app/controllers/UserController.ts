import { Context } from 'koa';

import { Controller, Get } from '../../shared/decorators';

// import { User } from '../../../models/User';
// import { Controller, Get } from '../../../shared/decorators';
/**
 * @export
 * @class UserController
 */
@Controller('users')
export class UserController {
    @Get()
    async getUser(ctx: Context) {
        // console.log(User);
        // const user = await User.create({ name: 'Alex', email: 'alex@gmail.com', password_hash: '232323' });
        // const users = await User.findAll({ where: { name: 'Alex' } });
        // console.log(users);
        ctx.body = [{ name: 'Caio' }];
        ctx.status = 200;
    }
}

// export default new UserRouter();
