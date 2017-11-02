import test from 'ava';
const {
  factorizeMatrix
} = require('../src/matrix-factorization')

test('factorizeMatrix should return an array', t => {
  var targetMatrix = [
    [5,3,0,1],
    [4,0,0,1],
    [1,1,0,5],
    [1,0,0,4],
    [0,1,5,4],
  ]
  
  t.true(Array.isArray(factorizeMatrix(targetMatrix)))
});

test('factorizeMatrix should return an array with two values', t => {
  const targetMatrix = [
    [5,3,0,1],
    [4,0,0,1],
    [1,1,0,5],
    [1,0,0,4],
    [0,1,5,4],
  ]
  
  t.is(factorizeMatrix(targetMatrix).length, 2)
});