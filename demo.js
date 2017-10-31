const {
  factorizeMatrix,
  fillMatrix,
  dot,
  transpose
} = require('./factorizeMatrix')

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
const N = R.length
const M = R[0].length

// Random matrix factors
const randomP = fillMatrix(N, K, () => Math.random())
const randomQ = fillMatrix(M, K, () => Math.random())
const [P, Q] = factorizeMatrix(R, randomP, randomQ, K)
const newR = dot(P, transpose(Q))

// New table using the generated factors
console.log(newR)