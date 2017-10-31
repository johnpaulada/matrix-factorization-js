# factorizeMatrix
A matrix factorization implementation in Javascript.
*This is a Work in Progress. Use at your own risk.*

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/fuck-it-ship-it.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/gluten-free.svg)](http://forthebadge.com)

## Example
```javascript
const { factorizeMatrix, transpose, dot } = require('factorizeMatrix')
const [factor1, factor2] = factorizeMatrix(targetMatrix, numberOfLatentFactors)
const completeMatrix = dot(factor1, transpose(factor2))
```

## Roadmap
1. Add unit tests.
2. Make code cleaner and easier to understand.
3. Create demo app.
4. Add to npm.

## Notes
Implementation based on this [article](http://www.quuxlabs.com/blog/2010/09/matrix-factorization-a-simple-tutorial-and-implementation-in-python/) by [@albertauyeung](https://github.com/albertauyeung).

## License
MIT