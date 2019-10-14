// import { User } from '../../src/app/models/User';
import request from 'supertest';
import { AppServer } from '../../src/app';
const app = new AppServer().app;

describe('Authentication', () => {
    it('should authenticate witht valid credentials', async () => {

        const response = await request(app.callback())
            .post('/users')
            .send({
                name: 'Alex',
                email: 'alex@gmail.com',
                password: '12345678',
            });

        expect(response.status).toBe(200);
    });

});
