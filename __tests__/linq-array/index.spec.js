require('../../src/linq-array/index.ts');
const assert = require('assert');

describe('LinqArray', function () {
    it('distinct', function () {
        assert.deepEqual([1, 1, 2, 3, 2, 3, 3, 2, 3, 1, 3, 4, 2, 5, 3, 4, 3, 1, 4, 5, 1, 2, 3, 4, 5, 1, 4, 3, 1, 3, 2, 4, 1, 5, 3].distinct(), [1, 2, 3, 4, 5])
        assert.deepEqual([1, '2', true, null, undefined, {}, [1, 2, 3], 1, '2', true, null, undefined, {}, [1, 2, 3]].distinct(),
            [1, '2', true, null, undefined, {}, [1, 2, 3], {}, [1, 2, 3]]
        )
    })

    it('max', function () {
        assert.equal([4, 9, 5, 1, 3].max(), 9);
        assert.equal([4, 9, 5, 1, 3].max(v => v * 2), 18);
        assert.equal([999999, 1, 2, 3, 6].max((v, i) => v * i), 24);
        assert.equal([4, 9, 5, 1, 3].max((v, i, arr) => arr[i] + 1), 10);
    })

    it('min', function () {
        assert.equal([4, 9, 5, 1, 3].min(), 1);
        assert.equal([4, 9, 5, 1, 3].min(v => v * 2), 2);
        assert.equal([999999, 1, 2, 3, 6].min((v, i) => v * i), 0);
        assert.equal([4, 9, 5, 1, 3].min((v, i, arr) => arr[i] + 1), 2);
    })

    it('filterIndex', function () {
        assert.deepEqual([10, 20, 30, 40, 50].filterIndex(v => v > 30), [3, 4])
        assert.deepEqual([13, 14, 16, 18, 20].filterIndex((v, i, arr) => (v + i * arr.length) % 2 == 1), [0, 1, 3]);
    })

    it('count', function () {
        assert.equal([1, 3, 5, 7, 9, 2, 4, 6, 8, 0].count(v => v % 2 > 0), 5);
        assert.equal([0, 1, 2, 3, 4, 555, 555, 555, 555].count((v, i) => v === i), 5);
    })

    it('sum', function () {
        assert.equal([1, 2, 3, 4].sum(), 10);
        assert.equal([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }].sum(v => v.v), 10);
    })

    it('average', function () {
        assert.equal([1, 2, 3, 4].average(), 2.5);
        assert.equal([{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }].average(v => v.v), 2.5);
    })

    it('orderBy', function () {
        let a = [
            { a: 6, b: 5 },
            { a: 4, b: 3 },
            { a: 6, b: 1 },
            { a: 2, b: 9 },
            { a: 4, b: 7 }
        ];
        assert.deepEqual(a.orderBy(v => v.a), [
            { a: 2, b: 9 },
            { a: 4, b: 3 },
            { a: 4, b: 7 },
            { a: 6, b: 5 },
            { a: 6, b: 1 }
        ]);
        assert.deepEqual(a.orderBy(v => v.a, v => v.b), [
            { a: 2, b: 9 },
            { a: 4, b: 3 },
            { a: 4, b: 7 },
            { a: 6, b: 1 },
            { a: 6, b: 5 }
        ]);
        assert.deepEqual(a.orderByDesc(v => v.b), [
            { a: 2, b: 9 },
            { a: 4, b: 7 },
            { a: 6, b: 5 },
            { a: 4, b: 3 },
            { a: 6, b: 1 }
        ]);
        assert.deepEqual(a.orderByDesc(v => v.a, v => v.b), [
            { a: 6, b: 5 },
            { a: 6, b: 1 },
            { a: 4, b: 7 },
            { a: 4, b: 3 },
            { a: 2, b: 9 }
        ]);
    })

    describe('binarySearch', function () {
        it('normal', function () {
            let arr = [1, 1, 20, 20, 20, 21, 30, 30, 40, 50, 50, 50];
            assert.equal(arr.binarySearch(30), 6)
            assert.equal(arr.binarySearch(31), -1)
            assert.equal(arr.binarySearch(1), 0)
            assert.equal(arr.binarySearch(50), 10)
            assert.equal(arr.binarySearch(20), 2)
        })

        it('keyMapper', function () {
            let arr = [1, 1, 20, 20, 20, 21, 30, 30, 40, 50, 50, 50].map(v => ({ a: v }));
            assert.equal(arr.binarySearch(30, v => v.a), 6)
            assert.equal(arr.binarySearch(31, v => v.a), -1)
            assert.equal(arr.binarySearch(1, v => v.a), 0)
            assert.equal(arr.binarySearch(50, v => v.a), 10)
            assert.equal(arr.binarySearch(20, v => v.a), 2)
        })
    })

    describe('binaryInsert', function () {
        describe('unique', function () {
            it('normal', function () {
                let arr = [10, 20, 30, 40, 50];

                assert.equal(arr.binaryInsert(20, true), 1);
                assert.deepEqual(arr, [10, 20, 30, 40, 50])

                assert.equal(arr.binaryInsert(21, true), 2);
                assert.deepEqual(arr, [10, 20, 21, 30, 40, 50])

                assert.equal(arr.binaryInsert(22, true), 3);
                assert.deepEqual(arr, [10, 20, 21, 22, 30, 40, 50]);

                assert.equal(arr.binaryInsert(2, true), 0);
                assert.deepEqual(arr, [2, 10, 20, 21, 22, 30, 40, 50])

                assert.equal(arr.binaryInsert(52, true), 8);
                assert.deepEqual(arr, [2, 10, 20, 21, 22, 30, 40, 50, 52])
            })

            it('keyMapper', function () {
                let arr = [10, 20, 30, 40, 50].map(v => ({ value: v }));

                assert.equal(arr.binaryInsert({ value: 20 }, v => v.value, true), 1);
                assert.deepEqual(arr, [10, 20, 30, 40, 50].map(v => ({ value: v })))

                assert.equal(arr.binaryInsert({ value: 21 }, v => v.value, true), 2);
                assert.deepEqual(arr, [10, 20, 21, 30, 40, 50].map(v => ({ value: v })))

                assert.equal(arr.binaryInsert({ value: 22 }, v => v.value, true), 3);
                assert.deepEqual(arr, [10, 20, 21, 22, 30, 40, 50].map(v => ({ value: v })));

                assert.equal(arr.binaryInsert({ value: 2 }, v => v.value, true), 0);
                assert.deepEqual(arr, [2, 10, 20, 21, 22, 30, 40, 50].map(v => ({ value: v })))

                assert.equal(arr.binaryInsert({ value: 52 }, v => v.value, true), 8);
                assert.deepEqual(arr, [2, 10, 20, 21, 22, 30, 40, 50, 52].map(v => ({ value: v })))
            })
        })

        describe('not unique', function () {
            it('normal', function () {
                let arr = [10, 20, 30, 40, 50];

                assert.equal(arr.binaryInsert(20), 1);
                assert.deepEqual(arr, [10, 20, 20, 30, 40, 50])

                assert.equal(arr.binaryInsert(21), 3);
                assert.deepEqual(arr, [10, 20, 20, 21, 30, 40, 50])

                assert.equal(arr.binaryInsert(22), 4);
                assert.deepEqual(arr, [10, 20, 20, 21, 22, 30, 40, 50]);

                assert.equal(arr.binaryInsert(2), 0);
                assert.deepEqual(arr, [2, 10, 20, 20, 21, 22, 30, 40, 50])

                assert.equal(arr.binaryInsert(52), 9);
                assert.deepEqual(arr, [2, 10, 20, 20, 21, 22, 30, 40, 50, 52])
            })

            it('keyMapper', function () {
                let arr = [10, 20, 30, 40, 50].map(v => ({ value: v }));

                assert.equal(arr.binaryInsert({ value: 20 }, v => v.value), 1);
                assert.deepEqual(arr, [10, 20, 20, 30, 40, 50].map(v => ({ value: v })))

                assert.equal(arr.binaryInsert({ value: 21 }, v => v.value), 3);
                assert.deepEqual(arr, [10, 20, 20, 21, 30, 40, 50].map(v => ({ value: v })))

                assert.equal(arr.binaryInsert({ value: 22 }, v => v.value), 4);
                assert.deepEqual(arr, [10, 20, 20, 21, 22, 30, 40, 50].map(v => ({ value: v })));

                assert.equal(arr.binaryInsert({ value: 2 }, v => v.value), 0);
                assert.deepEqual(arr, [2, 10, 20, 20, 21, 22, 30, 40, 50].map(v => ({ value: v })))

                assert.equal(arr.binaryInsert({ value: 52 }, v => v.value), 9);
                assert.deepEqual(arr, [2, 10, 20, 20, 21, 22, 30, 40, 50, 52].map(v => ({ value: v })))
            })
        })
    })

    it('binaryDistinct', function () {
        let arr = [3, 2, 3, 2, 1]
        assert.notDeepEqual(arr.binaryDistinct(), [1, 2, 3])
        assert.deepEqual(arr.orderBy(v => v).binaryDistinct(), [1, 2, 3])
    })

    it('findLast', function () {
        assert.deepEqual([0, 0, 0, 0, 1, 2, 3, 4, 5].findLast(v => v % 2 == 0), 4);
        assert.deepEqual([0, 0, 0, 0, 1, 2, 3, 4, 5].map(v => ({ value: v })).findLast(v => v.value % 2 == 0), { value: 4 });
    })

    it('findLastIndex', function () {
        assert.deepEqual([0, 0, 0, 0, 1, 2, 3, 4, 5].findLastIndex(v => v % 2 == 0), 7);
        assert.deepEqual([0, 0, 0, 0, 1, 2, 3, 4, 5].map(v => ({ value: v })).findLastIndex(v => v.value % 2 == 0), 7);
    })

    it('groupBy', function () {
        assert.deepEqual(
            ['a1', 'a3', 'a2', 'a3', 'a2', 'a3'].groupBy(v => v).map(v => [v.key, v.length]),
            [['a1', 1], ['a3', 3], ['a2', 2]]
        )

        assert.deepEqual(
            ['a1', 'a3', 'a2', 'a3', 'a2', 'a3'].map(v => ({ value: v })).groupBy(v => v.value).map(v => [v.key, v.length]),
            [['a1', 1], ['a3', 3], ['a2', 2]]
        )

        //数字Key顺序按数字
        assert.deepEqual(
            ['1', '3', '2', '3', '2', '3'].groupBy(v => v).map(v => [v.key, v.length]),
            [['1', 1], ['2', 2], ['3', 3]]
        )
    })
});
