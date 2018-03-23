import { iter } from '../src/iter';

describe('iter-basic', () => {
    const input = [5, 3, 20, 8, 16, 10, 6, 19];

    it('map', () => {
        const result = iter(input).map(x => x + 1).toArray();
        const cmp = input.map(x => x + 1);
        expect(result).toEqual(cmp);
    }),

    it('filter', () => {
        const result = iter(input).filter(x => x > 10).toArray();
        const cmp = input.filter(x => x > 10);
        expect(result).toEqual(cmp);
    }),

    it('reduce', () => {
        const sum = iter(input).reduce((acc, x) => acc + x, 0);
        const cmp = input.reduce((acc, x) => acc + x, 0);
        expect(sum).toEqual(cmp);
    }),

    it('reduce is restartable', () => {
        const cmp = input.filter(x => x > 7).reduce((acc, x) => acc + x, 0);
        const nums = iter(input).filter(x => x > 7);
        
        expect(nums.reduce((acc, x) => acc + x, 0)).toEqual(cmp);
        expect(nums.reduce((acc, x) => acc + x, 0)).toEqual(cmp);
    }),

    it('forEach', () => {
        const result: number[] = [];
        iter(input).forEach(x => result.push(x));
        expect(result).toEqual(input);
    });

    it('supports looping', () => {
        let result: number[] = [];

        function test() {
            for (const x of iter(input)) {
                result.push(x);
            }

            expect(result).toEqual(input);
        }

        test();

        // is looping restartable?
        result = [];
        test(); 
    });

    it('chain', () => {
        const result = iter(input)
            .filter(x => x > 10)
            .map(x => x + 1)
            .toArray();

        const cmp = input
            .filter(x => x > 10)
            .map(x => x + 1);
        
        expect(result).toEqual(cmp);
    });

    it('restartable', () => {
        const calc1 = iter(input).map(x => x + 1);
        const calc2 = calc1.map(x => x + 1);
        const calc3 = calc2.map(x => x + 1);
        expect(calc3.toArray()).toEqual(input.map(x => x + 3));

        const filter1 = calc3.filter(x => x > 15);
        expect(filter1.toArray()).toEqual(input.map(x => x + 3).filter(x => x > 15));

        const filter2 = filter1.filter(x => x % 2 == 0);
        expect(filter2.toArray()).toEqual(input.map(x => x + 3).filter(x => x > 15).filter(x => x % 2 == 0));
    });
});

