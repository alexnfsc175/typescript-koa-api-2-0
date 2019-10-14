import { Context } from 'koa';

import { Controller, Get } from '../../shared/decorators';
import { User } from '../models/User';

/**
 * @export
 * @class UserController
 */
@Controller('users')
export class UserController {
    @Get()
    async getUser(ctx: Context) {
        console.log(User);
        await User.create({
            name: 'Alex',
            email: 'alex@gmail.com',
            passwordHash: '232323',
        });
        const users = await User.findAll({ where: { name: 'Alex' } });
        console.log(users);
        ctx.body = users;
        ctx.status = 200;
    }
}
