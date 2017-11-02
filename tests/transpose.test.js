import test from 'ava';
const {
  transpose
} = require('../src/matrix-factorization')

test('transpose should return an array', t => {
  const targetMatrix = [
    [5, 3],
    [4, 0]
  ]
  
  t.true(Array.isArray(transpose(targetMatrix)))
});

test('transpose should properly transpose matrix', t => {
  const targetMatrix = [
    [5, 3],
    [4, 0]
  ]
  
  t.deepEqual(transpose(targetMatrix), [[5, 4], [3, 0]])
});

test('transposing a vector should return itself', t => {
  const targetVector = [5, 3]
  
  t.deepEqual(transpose(targetVector), [5, 3])
});