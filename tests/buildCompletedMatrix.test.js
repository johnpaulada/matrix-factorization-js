import test from 'ava';
const {
  factorizeMatrix,
  buildCompletedMatrix
} = require('../src/matrix-factorization')

test('buildCompletedMatrix should return an array', t => {
  var targetMatrix = [
    [5,3,0,1],
    [4,0,0,1],
    [1,1,0,5],
    [1,0,0,4],
    [0,1,5,4],
  ]
  
  t.true(Array.isArray(buildCompletedMatrix(factorizeMatrix(targetMatrix))))
});