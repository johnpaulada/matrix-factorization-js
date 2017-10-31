/**
 * Gets the factors of a matrix
 * 
 * @param {*} R 
 * @param {*} P 
 * @param {*} Q 
 * @param {*} K 
 * @param {*} iters 
 * @param {*} learning_rate 
 * @param {*} regularization 
 */
function factorizeMatrix(R, P, Q, K, iters=5000, learning_rate=0.0002, regularization=0.02) {
  const QT = transpose(Q)
  const ROW_COUNT = R.length
  const COLUMN_COUNT = R[0].length
  let error = 0

  doFor(iters, () => {

    // Iteratively figure out correct factors
    for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < COLUMN_COUNT; j++) {
        const trueValue = R[i][j]
        if (trueValue > 0) {
          const currentValue = dot(P[i], columnVector(QT, j))
          const error = trueValue - currentValue
          for (let k = 0; k < K; k++) {
            P[i][k] = P[i][k] + learning_rate * (2 * error * QT[k][j] - regularization * P[i][k])
            QT[k][j] = QT[k][j] + learning_rate * (2 * error * P[i][k] - regularization * QT[k][j])
          }
        }
      }
    }
  
    // Measure error
    let threshold = 0
    for (let i = 0; i < ROW_COUNT; i++) {
      for (let j = 0; j < COLUMN_COUNT; j++) {
        const trueValue = R[i][j]
        if (trueValue > 0) {
          const currentValue = dot(P[i], columnVector(QT, j))
          const error = trueValue - currentValue
          threshold = threshold + square(error)
          for (let k = 0; k < K; k++) {
            threshold = threshold + (regularization / 2) * (square(P[i][k]) + square(P[k][j]))
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
 * @param {Array} matrix
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

function isMatrix(m) {
  return Array.isArray(m[0])
}

/**
 * Gets the dot product of two matrices.
 * 
 * @param {Array} m 
 * @param {Array} n 
 * @returns {Array}
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
 * @param {Array} n 
 * @param {Array} m 
 * @returns {Array}
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
 * @param {*} n 
 * @param {*} fn
 */
function doFor(n, fn) {
  let i = 0
  while(i++ < n) fn()
}

module.exports = {
  factorizeMatrix,
  fillMatrix,
  transpose,
  dot
}