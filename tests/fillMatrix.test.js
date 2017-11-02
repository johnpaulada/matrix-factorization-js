import test from 'ava';
const {
  fillMatrix
} = require('../src/matrix-factorization')

test('fillMatrix should return an array', t => {
  t.true(Array.isArray(fillMatrix(2, 2)))
});

test('fillMatrix should work with 1x1', t => {
  t.true(Array.isArray(fillMatrix(1, 1)))
});

test('fillMatrix fill function should work', t => {
  t.deepEqual(fillMatrix(2, 2, () => 1), [[1, 1], [1, 1]])
});

test('fillMatrix should work with unequal row and column count', t => {
  t.deepEqual(fillMatrix(3, 1, () => 1), [[1], [1], [1]])
});

test('fillMatrix should return empty array on 0x0', t => {
  t.deepEqual(fillMatrix(0, 0), [])
});