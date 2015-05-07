'use strict';

module.exports = {
  AssetNotFound: require('./asset-not-found'),
  AssetUndefined: require('./asset-undefined'),
  CircularReference: require('./circular-reference'),
  InvalidArguments: require('./invalid-arguments'),
  MustBeAsset: require('./must-be-asset'),
  MustBeDirectory: require('./must-be-directory'),
  MustBeFunction: require('./must-be-function'),
  MustBeObject: require('./must-be-object'),
  MustBeStringOrFunction: require('./must-be-string-or-function'),
  MustBeString: require('./must-be-string')
};
