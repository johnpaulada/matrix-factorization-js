# Matrix Factorization JS
A matrix factorization implementation in Javascript.
*This is a Work in Progress. Use at your own risk.*

[![Build Status](https://travis-ci.org/johnpaulada/matrix-factorization-js.svg?branch=master)](https://travis-ci.org/johnpaulada/matrix-factorization-js)
[![codebeat badge](https://codebeat.co/badges/af1fbd1b-cbbf-4875-80be-4f4a9b9993dc)](https://codebeat.co/projects/github-com-johnpaulada-matrix-factorization-js-master)
[![Maintainability](https://api.codeclimate.com/v1/badges/559d5ffb94f93481494e/maintainability)](https://codeclimate.com/github/johnpaulada/matrix-factorization-js/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/johnpaulada/matrix-factorization-js/badge.svg?branch=master)](https://coveralls.io/github/johnpaulada/matrix-factorization-js?branch=master)
[![](https://data.jsdelivr.com/v1/package/npm/matrix-factorization/badge)](https://www.jsdelivr.com/package/npm/matrix-factorization)

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/fuck-it-ship-it.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)

*To try an interactive example, clone and edit this [Runkit Notebook](https://runkit.com/johnpaulada/matrix-factorization-js-usage-example).*

## Installing / Getting started

### Install using `npm`:
```bash
npm install matrix-factorization
```

#### Import in code
```javascript
// Node, ES5
var matrixFactorization = require('matrix-factorization')

// Node, ES6
const matrixFactorization = require('matrix-factorization')
```

### Install using `yarn`:
```bash
yarn add matrix-factorization
```

#### Import in code
```javascript
// Node, ES5
var matrixFactorization = require('matrix-factorization')

// Node, ES6
const matrixFactorization = require('matrix-factorization')
```

### Install with minified library
Copy `matrix-factorization.min.js` from `dist/matrix-factorization.min.js` to a `lib` folder.

#### Import in code
```html
<script src="lib/matrix-factorization.min.js"></script>
```
This will expose a `matrixFactorization` variable which you can access the functions from.

### Include using CDN
```html
<script src="https://cdn.jsdelivr.net/npm/matrix-factorization@1.1.2/index.min.js"></script>
```
This will expose a `matrixFactorization` variable which you can access the functions from.

### Using a function in the library:

Just reference a function using the dot notation. For example, to use the sum function, you can do:

```javascript
matrixFactorization.factorizeMatrix(targetMatrix, numberOfLatentFactors)
```

### Example
```javascript
var factors = factorizeMatrix(targetMatrix, numberOfLatentFactors)
var completeMatrix = matrixFactorization.dot(factors[0], matrixFactorization.transpose(factors[1]))
```

## Roadmap
1. Create demo app.
2. Improve docs.

## Notes
Implementation based on this [article](http://www.quuxlabs.com/blog/2010/09/matrix-factorization-a-simple-tutorial-and-implementation-in-python/) by [@albertauyeung](https://github.com/albertauyeung).

## License
MIT