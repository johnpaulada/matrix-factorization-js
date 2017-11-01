/**
 * Gets the factors of a matrix
 * 
 * @param {Array} R target matrix
 * @param {Number} K Number of latent features
 * @param {Number} iters Number of times to move towards the real factors
 * @param {Number} learning_rate Learning rate
 * @param {Number} regularization_rate Regularization amount, i.e. amount of bias reduction
 * @returns {Array} An array containing the two factor matrices
 */
function factorizeMatrix(R, K, iters=5000, learning_rate=0.0002, regularization_rate=0.02) {
  const N = R.length
  const M = R[0].length
  const P = fillMatrix(N, K, () => Math.random())
  const Q = fillMatrix(M, K, () => Math.random())
  const QT = transpose(Q)
  const ROW_COUNT = R.length
  const COLUMN_COUNT = R[0].length
  let error = 0

  doFor(iters, () => {

    // Iteratively figure out correct factors
    for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < COLUMN_COUNT; j++) {
        const trueValue = R[i][j]

        // Process non-empty values
        if (trueValue > 0) {
          const currentValue = dot(P[i], columnVector(QT, j))
          const error = trueValue - currentValue
          for (let k = 0; k < K; k++) {
            P[i][k] = P[i][k] + learning_rate * (2 * error * QT[k][j] - regularization_rate * P[i][k])
            QT[k][j] = QT[k][j] + learning_rate * (2 * error * P[i][k] - regularization_rate * QT[k][j])
          }
        }
      }
    }
  
    // Measure error
    let threshold = 0
    for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < COLUMN_COUNT; j++) {
        const trueValue = R[i][j]

        // Process non-empty values
        if (trueValue > 0) {
          const currentValue = dot(P[i], columnVector(QT, j))
          const error = trueValue - currentValue
          threshold = threshold + square(error)
          for (let k = 0; k < K; k++) {
            threshold = threshold + (regularization_rate / 2) * (square(P[i][k]) + square(P[k][j]))
          }
        }
      }
    }

    if (threshold < 0.001) return
  })

  return [P, transpose(QT)]
}

/***************************
 * Helper Functions        *
 ***************************/

/**
 * Transposes a matrix
 * 
 * @param {Array} matrix Target matrix
 * @returns {Array} The transposed matrix
 */
function transpose(matrix) {
  if (isMatrix(matrix)) {
    const TRANSPOSED_ROW_COUNT = matrix[0].length
    const TRANSPOSED_COLUMN_COUNT = matrix.length
    const transposed = fillMatrix(TRANSPOSED_ROW_COUNT, TRANSPOSED_COLUMN_COUNT, () => 0)
  
    return transposed.map((t, i) => t.map((u, j) => matrix[j][i]))
  } else {
    return matrix
  }
}

/**
 * Checks if value passed is a matrix.
 * @param {*} m Value to check
 * @returns {boolean} True if matrix, false if not
 */
function isMatrix(m) {
  return Array.isArray(m[0])
}

/**
 * Gets the dot product of two matrices.
 * 
 * @param {Array} m First matrix
 * @param {Array} n Second matrix
 * @returns {Array} Dot product of the two matrices
 */
function dot(m, n) {
  const transposedN = transpose(n)

  if (!isMatrix(m) && !isMatrix(n)) {
    return dotVectors(m, n)
  }

  return m.map(row => transposedN.map(column => dotVectors(row, column)))
}

/**
 * Gets the column vector at given index.
 * 
 * @param {Array} matrix 
 * @param {Number} index
 * @returns {Array}
 */
function columnVector(matrix, index) {
  return matrix.map(m => m[index])
}

/**
 * Multiplies vectors together and sums the resulting vector up.
 * 
 * @param {*} v 
 * @param {*} w 
 * @returns {Number}
 */
function dotVectors(v, w) {
  return bimap(v, w, (x, y) => x * y).reduce((sum, x) => sum + x)
}

/**
 * Reduces two lists into one using the given function.
 * 
 * @param {*} a1 
 * @param {*} a2 
 * @param {*} fn A function that accepts two values and returns a single value 
 * @returns A list which is a combination of the two lists
 */
function bimap(a1, a2, fn) {
  return a1.map((item, i) => fn(item, a2[i]))
}

/**
 * Squares a number
 * 
 * @param {Number} x 
 * @returns {Number}
 */
function square(x) {
  return Math.pow(x, 2)
}

/**
 * Creates an n x m matrix filled with the result of given fill function
 * 
 * @param {Array} n Number of rows
 * @param {Array} m Number of columns
 * @param {Function} fill Function used to fill the matrix with
 * @returns {Array} The filled matrix
 */
function fillMatrix(n, m, fill = () => 0) {
  let matrix = []
  for (let i = 0; i < n; i++) {
    matrix.push([])
    for (let j = 0; j < m; j++) {
      matrix[i][j] = fill()
    }
  }

  return matrix
}

/**
 * Execute given function n times.
 * 
 * @param {Number} n Number of times to execute function
 * @param {*} fn Function to execute
 */
function doFor(n, fn) {
  let i = 0
  while(i++ < n) fn()
}

// Functions to export
const toExport = {
  factorizeMatrix,
  fillMatrix,
  transpose,
  dot
}

// If in Node, export as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = toExport
} else {
  // If in browser, export to a `matrixFactorization` global variable
  window.matrixFactorization = toExport
}