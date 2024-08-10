import { B } from './b.js';
import { A } from './a.js';

window.addEventListener('load', () => console.log('foo'));

void Promise.resolve().then(result => console.log(result));

const s = (num?: number) => `
<div>
    ${ typeof num === 'number'
        ? `<span>${ test(num) }</span>`
        : ''
    }
    <div>${ A }</div>
    <div>${ B }</div>
</div>
`;

function test (foo: number) {

    switch (foo) {
        case 1:
            return 'winner';
        case 2:
            return 'second';
        case 7:
            return 'mysterious';
        default:
            return 'boring';
    }
}

function logged (value, { kind, name }) {
    if (kind === 'method' || kind === 'getter' || kind === 'setter') {
        return function (...args) {
            console.log(`starting ${ name } with arguments ${ args.join(', ') }`);
            const ret = value.call(this, ...args);
            console.log(`ending ${ name }`);
            return ret;
        };
    }
}

class Foo {

    #bar?: string;

    @logged
    set bar (value: string | undefined) {
        this.#bar = value;
    };

    get bar () {
        return this.#bar;
    }
}
