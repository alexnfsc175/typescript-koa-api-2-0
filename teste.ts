import { pessoa, trabalho } from './index';

const _reduzir = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((p, c) => p + c, 0);

import * as path from 'path';
const url = path.join('app', 'src');

_reduzir + 11;

const bar = param => new Promise<number>(param);
async function foo(things) {
    const resu_lts = [];
    for (const thing of things) {
        // Bad: each loop iteration is delayed until the entire asynchronous operation completes
        resu_lts.push(await bar(thing));
    }
    return resu_lts;
}

const res = foo(pessoa);
const res1 = foo(trabalho);
