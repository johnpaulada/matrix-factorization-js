/**
 * Gets the factors of a matrix
 * 
 * @param {Array} TARGET_MATRIX target matrix
 * @param {Number} LATENT_FEATURES_COUNT Number of latent features
 * @param {Number} ITERS Number of times to move towards the real factors
 * @param {Number} LEARNING_RATE Learning rate
 * @param {Number} REGULARIZATION_RATE Regularization amount, i.e. amount of bias reduction
 * @returns {Array} An array containing the two factor matrices
 */
function factorizeMatrix(TARGET_MATRIX, LATENT_FEATURES_COUNT=5, ITERS=5000, LEARNING_RATE=0.0002, REGULARIZATION_RATE=0.02, THRESHOLD=0.001) {
  const FACTOR1_ROW_COUNT = TARGET_MATRIX.length
  const FACTOR2_ROW_COUNT = TARGET_MATRIX[0].length
  const factorMatrix1 = fillMatrix(FACTOR1_ROW_COUNT, LATENT_FEATURES_COUNT, () => Math.random())
  const factorMatrix2 = fillMatrix(FACTOR2_ROW_COUNT, LATENT_FEATURES_COUNT, () => Math.random())
  const transposedFactorMatrix2 = transpose(factorMatrix2)
  const ROW_COUNT = TARGET_MATRIX.length
  const COLUMN_COUNT = TARGET_MATRIX[0].length
  const updateLatentFeature = (latentFeatureA, latentFeatureB, error) => latentFeatureA + LEARNING_RATE * (2 * error * latentFeatureB - REGULARIZATION_RATE * latentFeatureA)

  doFor(ITERS, () => {

    // Iteratively figure out correct factors
    doFor(ROW_COUNT, i => {
      doFor(COLUMN_COUNT, j => {

        // Get actual value on target matrix
        const TRUE_VALUE = TARGET_MATRIX[i][j]
        
          // Process non-empty values
          if (TRUE_VALUE > 0) {
  
            // Get difference of actual value and the current approximate value as error
            const CURRENT_VALUE = dot(factorMatrix1[i], columnVector(transposedFactorMatrix2, j))
            const ERROR = TRUE_VALUE - CURRENT_VALUE
  
            // Update factor matrices
            doFor(LATENT_FEATURES_COUNT, k => {
  
              const latentFeatureA = factorMatrix1[i][k]
              const latentFeatureB = transposedFactorMatrix2[k][j]

              // Update latent feature k of factor matrix 1
              factorMatrix1[i][k] = updateLatentFeature(latentFeatureA, latentFeatureB, ERROR)
              
              // Update latent feature k of factor matrix 2
              transposedFactorMatrix2[k][j] = updateLatentFeature(latentFeatureB, latentFeatureA, ERROR)
            })
          }
      })
    })
  
    // Start calculating totalError
    let totalError = 0

    doFor(ROW_COUNT, i => {
      doFor(COLUMN_COUNT, j => {

        // Get actual value on target matrix
        const TRUE_VALUE = TARGET_MATRIX[i][j]
        
        // Process non-empty values
        if (TRUE_VALUE > 0) {

          // Get difference of actual value and the current approximate value as error
          const CURRENT_VALUE = dot(factorMatrix1[i], columnVector(transposedFactorMatrix2, j))
          const ERROR = TRUE_VALUE - CURRENT_VALUE

          // Increment totalError with current error
          totalError = totalError + square(ERROR)

          doFor(LATENT_FEATURES_COUNT, k => {
            totalError = totalError + (REGULARIZATION_RATE / 2) * (square(factorMatrix1[i][k]) + square(transposedFactorMatrix2[k][j]))
          })
        }
      })
    })

    // Complete factorization process if total error falls below a certain threshold
    if (totalError < THRESHOLD) return
  })

  return [factorMatrix1, transpose(transposedFactorMatrix2)]
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
 * @param {Array} m Value to check
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
 * @param {Array} v 
 * @param {Array} w 
 * @returns {Number}
 */
function dotVectors(v, w) {
  return bimap(v, w, (x, y) => x * y).reduce((sum, x) => sum + x)
}

/**
 * Reduces two lists into one using the given function.
 * 
 * @param {Array} a1 
 * @param {Array} a2 
 * @param {Function} fn A function that accepts two values and returns a single value 
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
 * @param {Function} fn Function to execute
 */
function doFor(n, fn) {
  let i = 0
  while(i < n) fn(i++)
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