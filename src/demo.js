const {
  buildCompletedMatrix,
  factorizeMatrix
} = require('./matrix-factorization')

// Original matrix
const TARGET_MATRIX = [
  [5,3,0,1],
  [4,0,0,1],
  [1,1,0,5],
  [1,0,0,4],
  [0,1,5,4],
]

const LATENT_FEATURE_COUNT = 2
const COMPLETED_MATRIX = buildCompletedMatrix(factorizeMatrix(TARGET_MATRIX, LATENT_FEATURE_COUNT))
console.log(COMPLETED_MATRIX)