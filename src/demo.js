const {
  factorizeMatrix,
  fillMatrix,
  dot,
  transpose
} = require('./matrix-factorization')

// Original matrix
const R = [
  [5,3,0,1],
  [4,0,0,1],
  [1,1,0,5],
  [1,0,0,4],
  [0,1,5,4],
]

// Number of latent features
const K = 5

const [P, Q] = factorizeMatrix(R, K)
const newR = dot(P, transpose(Q))

// New table using the generated factors
console.log(newR)