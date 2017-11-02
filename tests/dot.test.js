import test from 'ava';
const {
  dot
} = require('../src/matrix-factorization')

test('dot should return an array', t => {
  const targetMatrix = [
    [5, 3],
    [4, 0]
  ]
  
  t.true(Array.isArray(dot(targetMatrix, targetMatrix)))
});